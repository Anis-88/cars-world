import React from 'react';
import {View,Text,StyleSheet,Alert,TouchableOpacity,ScrollView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LanguageSettingsScreen = () => {
  const navigation = useNavigation();

  const changeLanguage = (lang) => {
    Alert.alert('Language Changed', `You selected: ${lang}`);
  };

  const languages = [
    'English',
    'தமிழ் (Tamil)',
    'हिन्दी (Hindi)',
    'മലയാളം (Malayalam)',
    'తెలుగు (Telugu)',
    'ಕನ್ನಡ (Kannada)',
    'বাংলা (Bengali)',
    'اردو (Urdu)',
    'ગુજરાતી (Gujarati)',
    'मराठी (Marathi)',
    'ਪੰਜਾਬੀ (Punjabi)',
    'অসমীয়া (Assamese)',
    'ଓଡ଼ିଆ (Odia)',
    'नेपाली (Nepali)',
    'संस्कृतम् (Sanskrit)',
    'Tiếng Việt (Vietnamese)',
    '中文 (Chinese)',
    'Français (French)',
    'Español (Spanish)',
    'Deutsch (German)',
    '日本語 (Japanese)',
    '한국어 (Korean)',
    'Русский (Russian)',
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {languages.map((lang, index) => (
          <TouchableOpacity
            key={index}
            style={styles.langButton}
            onPress={() => changeLanguage(lang)}
            activeOpacity={0.7}
          >
            <Text style={styles.langButtonText}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    marginRight: 12,
 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  langButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
 
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,

    elevation: 2,
  },
  langButtonText: {
    fontSize: 18,
    color: '#444',
  },
});

export default LanguageSettingsScreen;
