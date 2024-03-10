// import {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET
// } from "@env";
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
  apiKey: "AIzaSyDwFHujk7Fa8NJVHcwTFplL8ULEHlkhcj0",
  authDomain: "medicalapp-c48e0.firebaseapp.com",
  projectId: "medicalapp-c48e0",
  storageBucket: "medicalapp-c48e0.appspot.com",
  messagingSenderId:"1092983456628",
  // appId: REACT_APP_FIREBASE_APP_ID,
  // measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("db", db);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
console.log("storage", storage);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
