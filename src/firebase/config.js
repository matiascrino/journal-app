// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB2W7d7h2WYJ8rrwdzkzwTPpN0Clsm-mVg",
	authDomain: "journalapp-5fa26.firebaseapp.com",
	projectId: "journalapp-5fa26",
	storageBucket: "journalapp-5fa26.appspot.com",
	messagingSenderId: "237091888341",
	appId: "1:237091888341:web:ae12d358a855c5027e565c",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

