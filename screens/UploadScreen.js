import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {writeImageToDB, writeToDB} from "../firebaseUtils/firestore";
import { REACT_APP_SERVER_URL } from "@env";

function UploadScreen({ route, navigation }) {
  const { imageUri } = route.params;
  const mockDigit= "33.3";


  useEffect( () => {
    const uploadImage = async () => {
      const url = await writeImageToDB(imageUri);
      await writeToDB({imgUrl: url}, "images");
      const digits = await callImageRecognitionServer(url);
      console.log('Digits: ', digits);

    // Navigate to the SuccessScreen
    navigation.navigate('Success', { digit: digits, isSuccessful: true});
  };

    uploadImage();
  }, []);

  async function callImageRecognitionServer(imageUrl) {
    try {
      const serverResponse = await fetch(REACT_APP_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imageUrl }),
      });

      if (!serverResponse.ok) {
        throw new Error(`Server response was not ok: ${serverResponse.status}`);
      }

      const { result, logs } = await serverResponse.json();
      const digits = result.join('');

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
        <Image source={{ uri: imageUri }} style={styles.image} />
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
    borderColor: 'gray',
    borderWidth: 3,
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
