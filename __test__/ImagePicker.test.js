import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import HomeImagePicker from '../screens/imagePicker';
import * as ImagePicker from 'expo-image-picker';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('@rneui/themed', () => ({
  BottomSheet: jest.fn(),
}));


describe('HomeImagePicker', () => {
  beforeEach(() => {
    ImagePicker.launchImageLibraryAsync.mockReset();
    ImagePicker.launchCameraAsync.mockReset();
  });

  it('renders upload button correctly', () => {
    const { getByText } = render(<HomeImagePicker tempUnit="C" />);
    expect(getByText('Upload new data')).toBeTruthy();
  });
});
