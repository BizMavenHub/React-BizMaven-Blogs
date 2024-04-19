// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAc2DdoqtKhMnnFWfZ0Q5oUCj2q3y_kJVk",
  authDomain: "bizmavenblogs.firebaseapp.com",
  projectId: "bizmavenblogs",
  storageBucket: "bizmavenblogs.appspot.com",
  messagingSenderId: "963091897353",
  appId: "1:963091897353:web:49f14393d33db163ec2cd8",
  measurementId: "G-7R93QC3TNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
