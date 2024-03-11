import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { auth, db, storage } from "./firebaseSetup";

export async function writeImageToDB(image) {
  try {
    const img = await fetch(image);
    console.log("img", img);
    const blob = await img.blob();
    console.log("blob", blob);

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + new Date().getTime() + ".jpg");
    console.log("storageRef", storageRef);

    // 'file' comes from the Blob or File API
    return await uploadBytes(storageRef, blob).then((result) =>
      getDownloadURL(result.ref)
    );

  } catch (err) {
    console.log(err);
  }
}


export async function writeToDB(data, collectionName, key = "") {
  try {
    if (key !== "") {
      return await setDoc(doc(db, collectionName, key), data);
    } else {
      console.log("data", data);
      return await addDoc(collection(db, collectionName), data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getFromDB(key, collectionName) {
  try {
    const docRef = doc(db, collectionName, key);
    return await getDoc(docRef);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllFromDB(collectionName) {
  try {
    const querySnapshot = collection(db, collectionName);
    return await getDocs(querySnapshot);
  } catch (err) {
    console.log(err);
  }
}

export async function getMultipleFromDB(keys, collectionName) {
  try {
    return await getDocs(
      query(collection(db, collectionName), where(documentId(), "in", keys))
    );
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key, collectionName) {
  try {
    return await deleteDoc(doc(db, collectionName, key));
  } catch (err) {
    console.log(err);
  }
}

export async function updateToDB(key, collectionName, changingDict) {
  try {
    return await updateDoc(doc(db, collectionName, key), changingDict);
  } catch (err) {
    console.log(err);
  }
}


export function getCurrentUserEmail() {
  try {
    const user = auth.currentUser;

    return user ? user.email : "";
  } catch (err) {
    console.log(err);
  }
}
