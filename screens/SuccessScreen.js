import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

function SuccessScreen({route, navigation}) {
  const digit = route.params.digit;
  const isSuccessful = false;
  // const isSuccessful = route.params.isSuccessful;

  return (
    <View style={styles.container}>
      {isSuccessful ?
        <View style={styles.title}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.title}>The digit is {digit} </Text>
        </View>
        : <Text style={styles.title}>Failed to recognize the digit</Text>}

      <Button mode="contained" onPress={() => navigation.navigate('Home')} style={styles.button}>
        Back to Home
      </Button>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default SuccessScreen;
