import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import { useCart } from '../context/CartContext';

const CarDetailScreen = ({ route, navigation }) => {
  const { car, fromBooking } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(car);
    Alert.alert('Added to Cart', `${car.name} has been added to your cart.`);
  };

  const handleBooking = () => {
    navigation.navigate('Booking', { car });
  };

  useEffect(() => {
    if (fromBooking) {
      const timer = setTimeout(() => {
        if (car.type === 'Sedan') {
          navigation.replace('AllSedans');
        } else if (car.type === 'SUV') {
          navigation.replace('AllSUVs');
        } else {
          navigation.replace('Home');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [fromBooking, car, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Icon name="arrow-back" size={24} color="#123F35" />
      </TouchableOpacity>

      <Image source={{ uri: car.image }} style={styles.image} />

      <Text style={styles.title}>{car.name} ({car.year})</Text>
      <Text style={styles.price}>{car.price}</Text>
      <Text style={styles.detail}>{car.detail}</Text>

      <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
        <Text style={styles.btnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E7F7F0', padding: 15 },
  backBtn: { position: 'absolute', top: 10, left: 10, zIndex: 1 },
  image: { width: '100%', height: 200, borderRadius: 10, marginTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: '#444', marginBottom: 8 },
  detail: { fontSize: 15, color: '#555' },
  cartBtn: { backgroundColor: '#2E7D32', marginTop: 20, padding: 12, borderRadius: 8 },
  bookBtn: { backgroundColor: '#1976D2', marginTop: 10, padding: 12, borderRadius: 8 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
