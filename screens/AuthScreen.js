import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, TextInput, Text, useTheme} from 'react-native-paper';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../firebaseUtils/firebaseSetup";
import {writeToDB} from "../firebaseUtils/firestore";
import {db} from "../firebaseUtils/firebaseSetup";

function AuthScreen({navigation}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {colors} = useTheme();

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Login with:', email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then(() =>
          navigation.navigate('Main'))
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = "";
          switch (errorCode) {
            case "auth/invalid-email":
              errorMessage =
                "The email is invalid, please correct your email address.";
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              break;
            case "auth/user-disabled":
              errorMessage =
                "The user corresponding to the given email has been disabled.";
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              break;
            case "auth/user-not-found":
              errorMessage = "No user was found using the email.";
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              break;
            case "auth/invalid-credential":
              errorMessage = "Wrong password. Please try again.";
              setPassword("");
              setConfirmPassword("");
              break;
            default:
              errorMessage =
                "Error happened while logging in, please try again later.";
          }
          Alert.alert("Login Failed", errorMessage);
        });
    } else {
      console.log('Register with:', email, password, confirmPassword);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            writeToDB({},"users", email)
              .then(navigation.navigate('Main'))
              .catch((error) => {
                  console.log(error);
                  Alert.alert(
                    "SignUp Failed",
                    "Error happened while signing up, please try again later."
                  );
                }
              )
          }
        ).catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            Alert.alert(
              "SignUp Failed",
              "The email is already registered, please use another email."
            );
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/invalid-email":
            Alert.alert(
              "SignUp Failed",
              "The email is invalid, please correct your email address."
            );
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            break;
          default:
            Alert.alert(
              "SignUp Failed",
              "Error happened while signing up, please try again later."
            );
        }
      });
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.primary}]}>
        {isLogin ? 'Log In' : 'Sign Up'}
      </Text>
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
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
      <Button
        onPress={() => setIsLogin(!isLogin)}>{isLogin ? 'New here? Sign up now!' : 'Already have an account? Login here!'}</Button>
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
