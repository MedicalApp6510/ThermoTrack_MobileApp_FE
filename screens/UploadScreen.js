import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

function UploadScreen({ route, navigation }) {
  const { imageUri } = route.params; 

  useEffect(() => {
    // TODO: Upload the photo the album
    const uploadImage = async () => {
      console.log('Upload the photo the album: ', route.params.imageUri);
      // Mock
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to the SuccessScreen
      navigation.navigate('Success');
    };

    uploadImage();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
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
  image: {
    border: '1px solid',
    width: 300, 
    height: 300, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default UploadScreen;