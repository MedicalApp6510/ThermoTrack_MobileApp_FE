import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeImagePicker( ) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        navigation.navigate('Upload', { imageUri: result.assets[0].uri });
      }
    } catch (e) {
      Alert.alert("Error", "Unable to pick image");
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your camera!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        navigation.navigate('Upload', { imageUri: result.assets[0].uri });
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert("Error", "Unable to pick image");
    }
  };

  return (
    <View>
      <Button
        mode="outlined"
        textColor={colors.primary}
        buttonColor={colors.primaryContainer}
        style={[styles.button, {borderColor: colors.primaryContainer }]}
        onPress={() => setIsBottomSheetVisible(true)} 
      >
        <Text style={styles.buttonText}>Upload new data</Text>
      </Button>
      
      <BottomSheet isVisible={isBottomSheetVisible}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.primaryContainer : 'white',
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImage}
        >
          <Text>Choose From Camera Roll</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.primaryContainer : 'white',
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImageFromCamera}
        >
          <Text>Take a Photo</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.primaryContainer : 'white',
            },
            styles.bottomSheetPressable,
          ]}
          onPress={() => setIsBottomSheetVisible(false)}
        >
          <Text>Cancel</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
  },
  bottomSheetPressable: {
    alignItems: "center",
    padding: 20,
  },
});