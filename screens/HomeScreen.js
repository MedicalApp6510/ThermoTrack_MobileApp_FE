import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { data } from '../mockHistoryData';

function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  // Get latest history data value
  const latestTemperature = data.length > 0 ? data[data.length - 1].temperature : null;
  const latestTimestamp = data.length > 0 ? data[data.length - 1].timestamp : null;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Upload', { imageUri: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Upload', { imageUri: result.assets[0].uri });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {/* Top: Text */}
      <View style={styles.topContainer}>
        <Text style={styles.topTitle}>How are you today?</Text>
      </View>

      {/* Middle: Latest history data value */}
      <View style={styles.temperatureContainer}>
        <View style={[styles.temperatureCircle, { borderColor: colors.primaryContainer }]}>
          <Text style={[styles.temperatureText, { color: colors.background }]}>{latestTemperature || 'Null'}</Text>
        </View>
        <Text style={[styles.lastUpdatedText, { color: colors.primaryContainer }]}>Last updated: {latestTimestamp || 'Unknown'}</Text>
      </View>

      {/* Bottom: Upload new data */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          textColor={colors.primary}
          buttonColor={colors.primaryContainer}
          onPress={takePhoto}
          style={[styles.button, { borderColor: colors.primaryContainer }]}>
          Take a Photo
        </Button>
        <Button
          mode="outlined"
          textColor={colors.primary}
          buttonColor={colors.primaryContainer}
          onPress={pickImage}
          style={[styles.button, {borderColor: colors.primaryContainer }]}>
          Upload a Photo
        </Button>
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
    justifyContent: 'space-around',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  button: {
    width: '45%',
    height: 48,
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default HomeScreen;
