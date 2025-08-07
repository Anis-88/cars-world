import React, { useState, useEffect, useContext } from "react";
import { View,Text,TextInput,Image,Button,Alert,StyleSheet,ScrollView,TouchableOpacity,StatusBar,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme, colors } = useTheme();
  const { user, logout } = useContext(AuthContext);

  const fixedDp = "https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg";

  const [profile, setProfile] = useState({
    name: "Anish",
    email: "",
    address: "Feathers Software, Veepamoodu, Nagercoil-4.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setProfile((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            logout();
            navigation.replace("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSupport = () => {
    Alert.alert(
      "Support",
      "Email: carsworld@gmail.com\nMobile: +91 6532498752",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} hidden={sidebarVisible} />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
       
        {isEditing ? (
          <TouchableOpacity
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
            onPress={() => setIsEditing(false)}
          >
            <Ionicons name="arrow-back" size={28} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setSidebarVisible(true)}
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}>
              ☰
            </Text>
          </TouchableOpacity>
        )}

        <Image source={{ uri: fixedDp }} style={styles.dp} />

     
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Name</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              value={profile.name}
              onChangeText={(text) => setProfile((prev) => ({ ...prev, name: text }))}
              placeholder="Enter your name"
              placeholderTextColor={colors.border}
            />
          ) : (
            <Text style={[styles.textValue, { color: colors.text }]}>{profile.name}</Text>
          )}
        </View>

       
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <Text style={[styles.textValue, { color: colors.text }]}>{profile.email}</Text>
        </View>

     
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Address</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              value={profile.address}
              onChangeText={(text) => setProfile((prev) => ({ ...prev, address: text }))}
              placeholder="Enter your address"
              placeholderTextColor={colors.border}
            />
          ) : (
            <Text style={[styles.textValue, { color: colors.text }]}>{profile.address}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.editBtn, { backgroundColor: colors.button }]}
          onPress={() => setIsEditing((prev) => !prev)}
        >
          <Text style={styles.editBtnText}>{isEditing ? "Save" : "Edit Profile"}</Text>
        </TouchableOpacity>

        <View style={styles.supportBtn}>
          <Button title="Support" color={colors.text} onPress={handleSupport} />
        </View>

        <View style={styles.logoutBtn}>
          <Button title="Logout" color="#d11a2a" onPress={handleLogout} />
        </View>
      </ScrollView>

    
      {sidebarVisible && (
        <View style={styles.sidebarOverlay}>
          <View style={[styles.sidebar, { backgroundColor: colors.background }]}>
            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
              <Ionicons name="arrow-back" size={28} color={colors.text} />
            </TouchableOpacity>

            <Text style={[styles.sidebarTitle, { color: colors.text }]}>Settings</Text>

            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarVisible(false);
                navigation.navigate("OrderHistory");
              }}
            >
              <Text style={[styles.sidebarText, { color: colors.text }]}>📦 Ordered History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarVisible(false);
                navigation.navigate("Language");
              }}
            >
              <Text style={[styles.sidebarText, { color: colors.text }]}>🌐 Language</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarVisible(false);
                navigation.navigate("Theme");
              }}
            >
              <Text style={[styles.sidebarText, { color: colors.text }]}>🎨 Theme</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  dp: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor: "#ccc",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  textValue: {
    fontSize: 16,
    paddingVertical: 10,
  },
  editBtn: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  editBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  supportBtn: {
    width: "100",
    marginBottom: 20,
  },
  logoutBtn: {
    width: "%",
    marginBottom: 30,
  },
  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 10,
  },
  sidebar: {
    width: 250,
    height: "100%",
    paddingTop: 40,
    paddingHorizontal: 20,
    elevation: 5,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  sidebarItem: {
    paddingVertical: 15,
  },
  sidebarText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
