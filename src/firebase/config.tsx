'use client';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBVgnGO91QQYB6mhFuB6AmyzFY6OkOmcDY",
    authDomain: "ebuddy-app.firebaseapp.com",
    projectId: "ebuddy-app",
    storageBucket: "ebuddy-app.firebasestorage.app",
    messagingSenderId: "154408355949",
    appId: "1:154408355949:web:06ea1e316ef9782718d764",
    measurementId: "G-GQBVTL1VK9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
