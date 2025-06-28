// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCRcK2CZexVk9JDgY4xTlQJuZB7U7IgEoU",
	authDomain: "ecommerce-17354.firebaseapp.com",
	projectId: "ecommerce-17354",
	storageBucket: "ecommerce-17354.firebasestorage.app",
	messagingSenderId: "416044026866",
	appId: "1:416044026866:web:8de061ffee5ca3719f796b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
