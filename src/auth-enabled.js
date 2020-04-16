import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const FIREBASE_AUTH_ENABLED = true;

var fireAuth = null, fireDb = null, fireProvider = null;
if (FIREBASE_AUTH_ENABLED) {
	/* NOTE: You can add your own project details here */
	const firebaseConfig = {
		apiKey: "AIzaSyCfVD3eqpe8xTm4_xGF9L_aeKEc4vvZ1qw",
		authDomain: "katana-3e8a4.firebaseapp.com",
		databaseURL: "https://katana-3e8a4.firebaseio.com",
		projectId: "katana-3e8a4",
		storageBucket: "katana-3e8a4.appspot.com",
		messagingSenderId: "257503960684",
		appId: "1:257503960684:web:4f78238819a37bbc768249",
		measurementId: "G-ENF0CYY0CB"
	};
	firebase.initializeApp(firebaseConfig);
	fireAuth = firebase.auth();
	fireDb = firebase.firestore();
	fireProvider = new firebase.auth.GoogleAuthProvider();
}

export const auth = fireAuth;
export const firestore = fireDb;
export const provider = fireProvider;
