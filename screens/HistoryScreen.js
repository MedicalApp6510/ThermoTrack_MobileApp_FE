import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Title, Button, Divider, Paragraph, useTheme } from 'react-native-paper';
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseUtils/firebaseSetup";
import { getCurrentUserEmail } from "../firebaseUtils/firestore";

function HistoryScreen({ navigation }) {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    const docRef = doc(db, "users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setUser(snapshot.data());
    });

    return () => unSubscribe();
  }, []);
  const { colors } = useTheme();

  const handleLogout = () => {
    Alert.alert("Confirm to Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () =>{
          // Navigate to login screen
          navigation.navigate('Login');
          auth
            .signOut()
            .catch((error) =>{
              Alert.alert(
                "Error",
                "Log out failed. Please check your internet connection."
              )
            })
      },}
    ]);
  };

  const historyData = user ? Object.keys(user).map((key) => ({
    id: key,
    timestamp: user[key].timestamp,
    temperature: user[key].temperature,
  })) : [];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.primary }]}>
      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Title style={styles.userInfoTitle}>Hello, {getCurrentUserEmail()}!</Title>
      </View>

      {/* Contents */}
      <View style={[styles.contentsContainer, { backgroundColor: colors.background }]}>
        {/* History */}
        <View style={styles.historyContainer}>
          <Title style={[styles.historyTitle, { color: colors.primary }]}>History Data</Title>
          <View style={[styles.historyListContainer, { backgroundColor: colors.surfaceVariant }]}>
            {historyData.map((item, index) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyItemLeft}>
                  <Paragraph style={{color: colors.onSurfaceVariant}}>{item.timestamp}</Paragraph>
                </View>
                <View style={styles.historyItemRight}>
                  <Paragraph style={styles.temperatureText}>{item.temperature}°C</Paragraph>
                </View>
                {/* Render gray divider line if not the last item */}
                {index !== historyData.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            Log Out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoTitle: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'left',
    paddingTop: 48,
    paddingLeft: 24,
    width: '100%',
  },
  contentsContainer: {
    height: '200%',
    padding: 10,
    borderRadius: 48,
    backgroundColor: '#ffffff',
  },
  historyContainer: {
    padding: 16,
  },
  historyTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  historyListContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyItemLeft: {
    flex: 1,
  },
  historyItemRight: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  temperatureText: {
    color: 'gray',
  },
  logoutContainer: {
    padding: 16,
  },
  logoutButton: {
    height: 48,
    justifyContent: 'center',
  },
});

export default HistoryScreen;
