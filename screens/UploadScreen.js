import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {writeImageToDB, writeToDB} from "../firebaseUtils/firestore";

function UploadScreen({ route, navigation }) {
  const { imageUri } = route.params;


  useEffect( () => {
    // TODO: Upload the photo the album
    const uploadImage = async () => {
      // console.log('Upload the photo the album: ', route.params.imageUri);
      console.log("imageUri", imageUri);
      const url = await writeImageToDB(imageUri);
      console.log("url", url);

      const data = {
        imgUrl: url,
      };

      await writeToDB(data, "images");


    // Navigate to the SuccessScreen
    navigation.navigate('Success');
  };

    uploadImage();
  }, []);

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
