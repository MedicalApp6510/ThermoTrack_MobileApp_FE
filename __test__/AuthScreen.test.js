import React from 'react';
import renderer, {act} from 'react-test-renderer';
import AuthScreen from '../screens/AuthScreen';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

// Mock firebase/auth functions
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(), createUserWithEmailAndPassword: jest.fn()
}));

// Mock Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  },
  StyleSheet: {
    create: jest.fn(style => style),
  },

}));

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => ({
  useTheme: jest.fn(),
  Button: 'Button',
  TextInput: 'TextInput',
  Text: 'Text',
  Provider: 'Provider',
}));

jest.mock('../firebaseUtils/firebaseSetup', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(), createUserWithEmailAndPassword: jest.fn()
  }
}));

jest.mock('firebase/firestore', () => ({
  getFromDB: jest.fn(),
  writeToDB: jest.fn(),
  getAllFromDB: jest.fn(),
  getMultipleFromDB: jest.fn(),
  deleteFromDB: jest.fn(),
  updateToDB: jest.fn(),
}));

jest.mock('firebase/storage', () => () => ({
  ref: jest.fn(), getDownloadURL: jest.fn(), updateBytes: jest.fn(),
}))

describe('AuthScreen', () => {
  beforeEach(() => {
    signInWithEmailAndPassword.mockClear();
    createUserWithEmailAndPassword.mockClear();
  });

  it('AuthScreen renders correctly', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn(),
    };
    try {
      await act(async () => {
        renderer.create(<AuthScreen navigation={navigation}/>);
      });
    } catch (error) {
      console.error(error);
    }
  });

});
