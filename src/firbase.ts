import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIznkHvvp6AC55C-7eyB4ylThocmvPK1k",
    authDomain: "testapp-89690.firebaseapp.com",
    projectId: "testapp-89690",
    storageBucket: "testapp-89690.firebasestorage.app",
    messagingSenderId: "902926986095",
    appId: "1:902926986095:web:5388768e6e5198f174169a",
    measurementId: "G-2H8WG4S5TT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
