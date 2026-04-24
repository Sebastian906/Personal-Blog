import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEnv('VITE_FIREBASE_API'),
    authDomain: "personal-blog-e29f4.firebaseapp.com",
    projectId: "personal-blog-e29f4",
    storageBucket: "personal-blog-e29f4.firebasestorage.app",
    messagingSenderId: "277641694212",
    appId: "1:277641694212:web:bfb65175ae1fc4633f3951"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };