// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhDuT-nHIscIn691UoFd3h0Btyuu6Mbqs",
  authDomain: "time-and-birthdays.firebaseapp.com",
  databaseURL: "https://time-and-birthdays-default-rtdb.firebaseio.com",
  projectId: "time-and-birthdays",
  storageBucket: "time-and-birthdays.appspot.com",
  messagingSenderId: "103418825753",
  appId: "1:103418825753:web:b2013a09462caa880eee88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();