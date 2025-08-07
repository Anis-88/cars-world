import React from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Image,TextInput,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');

  const filteredCars = cartItems.filter(car =>
    car.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CarDetail', { car: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity
          onPress={() => removeFromCart(item.name)}
          style={styles.removeButton}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>

    
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#555" style={styles.searchIcon} />
        <TextInput
          placeholder="Search in cart..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

     
      <FlatList
        data={filteredCars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        }
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F7F0',
    padding: 15,
  },
  header: {
  width: '100%',
  paddingHorizontal: 5,
  marginBottom: 15,
},

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123F35',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF5EC',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  removeButton: {
    backgroundColor: '#F24E1E',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#fff',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
