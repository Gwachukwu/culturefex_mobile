import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { appConfig } from "../../config";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, collection } from 'firebase/firestore'
import { database } from "./database";

const { apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId } = appConfig

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

const usersRef = collection(db, database.users)
const recipesRef = collection(db, database.recipes)
const quizRef = collection(db, database.quizzes)

export { app, auth, db, recipesRef }