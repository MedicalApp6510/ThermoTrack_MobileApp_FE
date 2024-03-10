import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success!</Text>
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
