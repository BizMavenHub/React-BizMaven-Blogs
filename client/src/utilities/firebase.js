// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAhlplyyMMBqheiYMNy_WbR0V4Fzvlad80",
  authDomain: "insight-loop-blogs.firebaseapp.com",
  projectId: "insight-loop-blogs",
  storageBucket: "insight-loop-blogs.appspot.com",
  messagingSenderId: "789438168754",
  appId: "1:789438168754:web:7ef60d4f921c6cca28d3ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
