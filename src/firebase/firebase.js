// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcQPrQnaJRKPiZhHnrnXZPRT4uHHJVSdU",
    authDomain: "iot-innovators-d423f.firebaseapp.com",
    projectId: "iot-innovators-d423f",
    storageBucket: "iot-innovators-d423f.firebasestorage.app",
    messagingSenderId: "990367677327",
    appId: "1:990367677327:web:909dd4e2bc34ea00ffa9fa",
    measurementId: "G-97FCWQKEH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { messaging };