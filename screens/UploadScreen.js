import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {getCurrentUserEmail, updateToDB, writeImageToDB, writeToDB} from "../firebaseUtils/firestore";
import {REACT_APP_SERVER_URL} from "@env";

function UploadScreen({route, navigation}) {
  // console.log('Server URL:', REACT_APP_SERVER_URL);
  const {imageUri, tempUnit} = route.params;

  useEffect(() => {
    const uploadImage = async () => {
      const url = await writeImageToDB(imageUri);
      await writeToDB({imgUrl: url}, "images");
      // console.log("upload url  " + url);
      const digits = await callImageRecognitionServer(url);
      console.log('Digits: ', digits);

      if (isNaN(digits)) {
        // Navigate to the SuccessScreen with failure status if it can't be recognized.
        navigation.navigate('Success', {isSuccessful: false});
        return;
      }
      const currentTime = new Date();
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      const newTemperatureEntry = {};
      newTemperatureEntry[Math.floor(currentTime.getTime() / 1000)] = {
        temperature: tempUnit === 'C' ? digits : ((parseFloat(digits) - 32) / 1.8).toFixed(1),
        timestamp: new Intl.DateTimeFormat('en-US', options).format(currentTime)
      };
      await updateToDB(getCurrentUserEmail(), "users", newTemperatureEntry);

      // Navigate to the SuccessScreen
      navigation.navigate('Success', {digit: digits, isSuccessful: true});
    };

    uploadImage();
  }, [imageUri]);

  async function callImageRecognitionServer(imageUrl) {
    try {
      const serverResponse = await fetch(process.env.REACT_APP_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageUrl: imageUrl}),
      });

      if (!serverResponse.ok) {
        throw new Error(`Server response was not ok: ${serverResponse.status}`);
      }

      const responseData = await serverResponse.json();
      const digits = responseData.number;

      console.log('Recognized digits:', digits);

      return digits;

    } catch (error) {
      console.error('There was an error calling the image recognition server: ', error);
      throw error;
    }
  }


  return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{uri: imageUri}} style={styles.image}/>
        </View>
        <Text style={styles.text}>Sending to the server and analyzing the image...</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgContainer: {
    width: 300,
    height: 300,
    marginBottom: 48,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
  },
});

export default UploadScreen;
