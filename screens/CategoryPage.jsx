import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Image,FlatList,Dimensions,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const carCategories = [
  { name: 'SUV', icon: 'car' },
  { name: 'Sedan', icon: 'taxi' },
  { name: 'Hatchback', icon: 'car' },
  { name: 'Convertible', icon: 'automobile' },
  { name: 'Electric', icon: 'bolt' },
  { name: 'Luxury', icon: 'diamond' },
  { name: 'Pickup', icon: 'truck' },
  { name: 'Sports', icon: 'car' }, 
];


const featuredCars = [
  {
    id: '1',
    name: 'Tesla Model 3',
    year: '2023',
    price: '₹48,00,000',
    detail: 'Electric car with autopilot and long range.',
    image: 'data:image/jpeg;base64,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',
    type: 'Electric',
  },
  {
    id: '2',
    name: 'BMW 5 Series',
    year: '2022',
    price: '₹65,00,000',
    detail: 'Luxury sedan with advanced driving dynamics.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2036dMYCcc37-QkadhsWmat_ESg5FZ9Xmw&s',
    type: 'Sedan',
  },
  {
    id: '3',
    name: 'Audi Q5',
    year: '2023',
    price: '₹60,00,000',
    detail: 'Premium SUV with quattro all-wheel drive.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0axbc1JfyaTPqkg-rEXiZ0yJR-ppoWFPAwQ&s',
    type: 'SUV',
  },
  {
    id: '4',
    name: 'Hyundai Ioniq 5',
    year: '2023',
    price: '₹45,95,000',
    detail: 'Stylish electric car with fast charging.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Oqy7etouuwoTBNreJ8-_pQlsx0LqVGYBaA&s',
    type: 'Electric',
  },
  {
    id: '5',
    name: 'Kia EV6',
    year: '2024',
    price: '₹60,95,000',
    detail: 'High-performance electric crossover.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlONIkBXkxoYYh7IJg08aGCL5p4H3ydc9uqg&s',
    type: 'Electric',
  },
  {
    id: '6',
    name: 'Mercedes C-Class',
    year: '2023',
    price: '₹55,00,000',
    detail: 'Sophisticated sedan with luxury features.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFLl06pfLw__HWtA7eCxq08eW_zo3jcJHIg&s',
    type: 'Sedan',
  },
  {
    id: '7',
    name: 'Toyota Fortuner',
    year: '2022',
    price: '₹42,00,000',
    detail: 'Reliable SUV for all terrains.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KlZ_PlirX2AdHpLbcyDsAsGMK5aqJ59GNw&s',
    type: 'SUV',
  },
  {
    id: '8',
    name: 'MG ZS EV',
    year: '2023',
    price: '₹23,38,000',
    detail: 'Affordable electric SUV with smart features.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6Clr27yR0rvlHqdpWuti_FILGE8oo4gj5A&s',
    type: 'Electric',
  },
  {
    id: '9',
    name: 'XUV700',
    year: '2022',
    price: '₹24,00,000',
    detail: 'Smart SUV with ADAS and voice commands.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXeCELlYpK70GQtjPsZTLRU0mZiI2T7vfPaQ&s',
    type: 'SUV',
  },
  {
    id: '10',
    name: 'Volvo XC60',
    year: '2023',
    price: '₹68,90,000',
    detail: 'Scandinavian design with cutting-edge safety.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnVnpxeZ-eVK7wDTpHKuxbanottZrKp_wnSQ&s',
    type: 'SUV',
  },
];

const CategoryPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = featuredCars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('CategoryDetails', { categoryName });
  };

  const handleCarPress = (car) => {
    navigation.navigate('CarDetail', { car });
  };

  const renderCarCard = ({ item }) => (
    <TouchableOpacity style={styles.carCard} onPress={() => handleCarPress(item)}>
      <Image source={{ uri: item.image }} style={styles.carImage} />
      <Text style={styles.carName}>{item.name} ({item.year})</Text>
      <Text style={styles.carPrice}>{item.price}</Text>
      <Text style={styles.carDetail} numberOfLines={2}>{item.detail}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Car Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {carCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryBox}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Icon name={item.icon} size={30} color="#123F35" />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.featuredTitle}>Popular Cars</Text>

      <FlatList
        data={filteredCars}
        renderItem={renderCarCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F7F0',
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#123F35',
    marginTop: 15,
  },
  categoryScroll: {
    paddingVertical: 15,
  },
  categoryBox: {
    backgroundColor: '#DFF5EC',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#123F35',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 45,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123F35',
    marginBottom: 10,
  },
  grid: {
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    width: (width - 45) / 2,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  carName: {
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
  },
  carPrice: {
    color: '#FF6C00',
    fontWeight: '600',
    marginTop: 4,
  },
  carDetail: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
});
