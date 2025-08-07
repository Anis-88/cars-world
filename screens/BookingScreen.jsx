import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,ActivityIndicator,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHistory } from '../context/HistoryContext';

const BookingScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const { addOrder } = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  const validate = () => {
    if (!firstName || !lastName || !dob || !address || !phone || !email) {
      Alert.alert('Error', 'All fields are mandatory.');
      return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      Alert.alert('Invalid DOB', 'Please use YYYY-MM-DD format.');
      return false;
    }

    const emailRegex = /^[\w.-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Email must be a valid @gmail.com address');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Invalid Phone', 'Phone must be exactly 10 digits after +91');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setAddress('');
    setPhone('');
    setEmail('');
  };

  const handleConfirm = () => {
    if (!validate()) return;

    Alert.alert('Confirm Booking', 'Are you sure you want to confirm?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          setProcessing(true);
          setTimeout(() => {
            setProcessing(false);
            addOrder({
              id: Date.now().toString(),
              name: car.name,
              price: car.price,
              date: new Date().toISOString().split('T')[0],
            });
            Alert.alert('Booking Confirmed', 'Your booking is confirmed!', [
              {
                text: 'OK',
                onPress: () => {
                  resetForm();
                  navigation.navigate('CarDetail', { car });
                },
              },
            ]);
          }, 3000);
        },
      },
    ]);
  };

  if (processing) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.processingText}>Processing your booking...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Icon name="arrow-back" size={24} color="#123F35" />
      </TouchableOpacity>

      <Text style={styles.heading}>Booking: {car.name}</Text>
      <Text style={styles.price}>Price: {car.price}</Text>

      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />

      <View style={styles.phoneContainer}>
        <Text style={styles.phonePrefix}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="1234567890"
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TextInput
        placeholder="Email (@gmail.com)"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={[styles.confirmBtn, processing && { opacity: 0.6 }]}
        onPress={handleConfirm}
        disabled={processing}
      >
        <Text style={styles.btnText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F7F0',
    padding: 20,
  },
  backBtn: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#123F35',
  },
  price: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#1976D2',
  },
});
