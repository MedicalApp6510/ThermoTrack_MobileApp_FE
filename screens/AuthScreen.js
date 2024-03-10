import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';

function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { colors } = useTheme();

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Login with:', username, password);
      // TODO: handle the login logic
      navigation.navigate('Main');
    } else {
      console.log('Register with:', username, password, confirmPassword);
      // TODO: handle the register logic
      navigation.navigate('Main');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {isLogin ? 'Log In' : 'Sign Up'}
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      {!isLogin && (
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
      )}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </Button>
      <Button onPress={() => setIsLogin(!isLogin)}>{isLogin ? 'New here? Sign up now!' : 'Already have an account? Login here!'}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 16,
    marginBottom: 10,
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default AuthScreen;
