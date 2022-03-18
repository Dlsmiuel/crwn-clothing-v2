// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE7oOk8C3xwNX_9DUp_vAwrizz4I3rnN4",
  authDomain: "crwn-db-v2-c4d0d.firebaseapp.com",
  projectId: "crwn-db-v2-c4d0d",
  storageBucket: "crwn-db-v2-c4d0d.appspot.com",
  messagingSenderId: "340738285054",
  appId: "1:340738285054:web:e86ea8c98af9abbf43b4af",
  measurementId: "G-FTZY0L5JJ4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// El provider se utiliza para poder iniciar la autenticacion, es una clase de firebase authentication. Se pueden tener multiples providers
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists);

  //iff user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //if user data exists
  return userDocRef;
  //return userDocRef
};
