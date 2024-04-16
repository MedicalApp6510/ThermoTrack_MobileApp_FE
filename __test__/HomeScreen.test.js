import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import * as Firestore from 'firebase/firestore';
import AppContext from '../context/AppContext';

// Mocks
jest.mock('react-native-paper', () => ({
  useTheme: () => ({
    colors: {
      primary: 'blue',
      primaryContainer: 'lightblue',
      background: 'white',
    },
  }),
  SegmentedButtons: 'SegmentedButtons',
}));

jest.mock('../firebaseUtils/firebaseSetup', () => ({
  db: {},
  auth: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()), // Mock unsubscribe function
}));

jest.mock('../firebaseUtils/firestore', () => ({
  getCurrentUserEmail: jest.fn(() => 'test@example.com'),
}));

jest.mock('../screens/imagePicker', () => 'HomeImagePicker');


describe('HomeScreen', () => {
  it('renders correctly', () => {
    const mockSetTempUnit = jest.fn();
    const mockTempUnit = 'C';

    const { getByText } = render(
      <AppContext.Provider value={{ tempUnit: mockTempUnit, setTempUnit: mockSetTempUnit }}>
        <HomeScreen />
      </AppContext.Provider>
    );

    expect(getByText('How are you today?')).toBeTruthy();
  });

});
