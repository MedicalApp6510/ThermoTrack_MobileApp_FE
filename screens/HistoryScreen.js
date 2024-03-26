import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Title, Button, Divider, Paragraph, useTheme } from 'react-native-paper';
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseUtils/firebaseSetup";
import { getCurrentUserEmail } from "../firebaseUtils/firestore";
import { TabView, TabBar } from 'react-native-tab-view';
import LineChartComponent from './LineChartComponent';

function HistoryScreen({ navigation }) {

  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'List' },
    { key: 'second', title: 'Chart' },
  ]);

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
  })).sort((a, b) => {
    return b.id - a.id;
  }) : [];


  const FirstRoute = () => (
    <ScrollView style={[styles.historyListContainer, { backgroundColor: colors.surfaceVariant }]}>
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
    </ScrollView>
  );


  const SecondRoute = () => {
    const isDataValid = historyData.length > 0 && historyData.every(item => item.timestamp && item.temperature);

    if (!isDataValid) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Paragraph>Loading...</Paragraph>
      </View>;
    }

    return <LineChartComponent data={historyData} />;
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Title style={styles.userInfoTitle}>Hello, {getCurrentUserEmail()}!</Title>
      </View>

      {/* Contents */}
      <View style={[styles.contentsContainer, { backgroundColor: colors.background }]}>
        {/* History */}
        <View style={styles.historyContainer}>
          <Title style={[styles.historyTitle, { color: colors.primary }]}>History Data</Title>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          // initialLayout={{ width: '100%', height: '100%'}}
          initialLayout={{ width: 10, height: 10 }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.primary }}
              labelStyle={{ color: colors.primary }}
              style={{ backgroundColor: colors.background }} />
          )}
        />
        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            Log Out
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    height: '30%',
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
    // height: '200%',
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    height: "70%",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
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
    height: 400,
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
