import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

export const FIREBASE_AUTH_ENABLED = true;

var fireAuth = null,
  fireDb = null;
var fireProvider = null,
  fireAnalytics = null;
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
    measurementId: "G-ENF0CYY0CB",
  };
  firebase.initializeApp(firebaseConfig);
  fireAnalytics = firebase.analytics();
  fireAuth = firebase.auth();
  fireDb = firebase.firestore();
  fireProvider = new firebase.auth.GoogleAuthProvider();
}

export const auth = fireAuth;
export const firestore = fireDb;
export const provider = fireProvider;
export const analytics = fireAnalytics;

export function logEvent(category, action, label) {
  if (!analytics) return;
  var params = {};
  if (action) {
    category += action;
  }
  if (label) {
    if (typeof label === "string") {
      params["label"] = label;
    } else {
      for (var key in label) {
        params[key] = label[key];
      }
    }
  }
  analytics.logEvent(category, params);
  console.debug("ga", category, params);
}

export function logCustomEvent(category, custom) {
  if (!analytics) return;
  analytics.logEvent(category, custom);
  console.debug("ga", category, custom);
}
