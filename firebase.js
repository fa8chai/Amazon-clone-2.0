import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCbj5mJhFj_fEgs9LPss-LzxJln8_9DSGg",
  authDomain: "fir-db658.firebaseapp.com",
  projectId: "fir-db658",
  storageBucket: "fir-db658.appspot.com",
  messagingSenderId: "693456171309",
  appId: "1:693456171309:web:2b0349a5362006b146a3a4",
  measurementId: "G-1H457GJDE7"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
export default db;