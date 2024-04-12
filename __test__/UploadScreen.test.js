import React from 'react';
import renderer, { act } from 'react-test-renderer';
import UploadScreen from '../screens/UploadScreen';

jest.mock('../firebaseUtils/firestore', () => ({
  getCurrentUserEmail: jest.fn(() => Promise.resolve('user@example.com')),
  updateToDB: jest.fn(() => Promise.resolve(true)),
  writeImageToDB: jest.fn(() => Promise.resolve('http://dummyimageurl.com')),
  writeToDB: jest.fn(() => Promise.resolve(true))
}));

describe('UploadScreen', () => {
  it('UploadScreen renders correctly', async () => {
    const route = {
      params: {
        imageUri: 'http://dummyimageurl.com',
        tempUnit: 'C'
      }
    };
    const navigation = {
      navigate: jest.fn()
    };

    let tree;
    await act(async () => {
      tree = renderer.create(<UploadScreen route={route} navigation={navigation} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();


  });
});
