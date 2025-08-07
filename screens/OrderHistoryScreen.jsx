import React from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useHistory } from '../context/HistoryContext'; 

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const { orders } = useHistory();

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ordered History</Text>
      </View>

     
      {orders.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>Ordered on: {item.date}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 14, color: '#666' },
});

export default OrderHistoryScreen;
