import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { data } from '../mockHistoryData';
import HomeImagePicker from './imagePicker.js';
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseUtils/firebaseSetup";
import { getCurrentUserEmail } from "../firebaseUtils/firestore";

function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const docRef = doc(db, "users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setUser(snapshot.data());
    });

    return () => unSubscribe();
  }, []);

  // Get latest history data value
  const historyData = user ? Object.keys(user).map((key) => ({
    id: key,
    timestamp: user[key].timestamp,
    temperature: user[key].temperature,
  })) : [];
  const latestTemperature = historyData.length > 0 ? historyData.at(-1).temperature : null;
  const latestTimestamp = historyData.length > 0 ? historyData.at(-1).timestamp : null;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {/* Top: Text */}
      <View style={styles.topContainer}>
        <Text style={styles.topTitle}>How are you today?</Text>
      </View>

      {/* Middle: Latest history data value */}
      <View style={styles.temperatureContainer}>
        <View style={[styles.temperatureCircle, { borderColor: colors.primaryContainer }]}>
          <Text style={[styles.temperatureText, { color: colors.background }]}>{latestTemperature || 'Null'} °C</Text>
        </View>
        <Text style={[styles.lastUpdatedText, { color: colors.primaryContainer }]}>Last updated: {latestTimestamp || 'Unknown'}</Text>
      </View>

      {/* Bottom: Upload new data */}
      <View style={styles.buttonContainer}>
        {/* Image picker */}
        <HomeImagePicker></HomeImagePicker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: '30%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  topTitle: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'left',
  },
  temperatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 74
  },
  temperatureCircle: {
    width: 250,
    height: 250,
    borderRadius: 300,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureText: {
    fontSize: 48,
  },
  lastUpdatedText: {
    marginTop: 24,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 24,
  }
});

export default HomeScreen;
