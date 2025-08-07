import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); 

  const handleResetPassword = () => {
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Only Gmail addresses are allowed');
      return;
    }

    console.log(`Forgot password for email: "${email}"`);
    Alert.alert('Reset Link Sent', `Check your inbox for: ${email}`);
  };

  const handleGoBack = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.linkText}>
          Remember your password? <Text style={styles.bold}>Go back</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#123',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#69B89C',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#fff',
    marginBottom: 15,
  },
  resetButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#123F35',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#123',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
