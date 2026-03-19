import { initializeApp } from "firebase/app";
import { isJwtExpired } from 'jwt-check-expiration';
import * as apiService from "../services/apiService";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxY4oT4SZd5r-nZiM1eFFnUCcC3UxgYr4",
    authDomain: "ptprojectsweb.firebaseapp.com",
    projectId: "ptprojectsweb",
    storageBucket: "ptprojectsweb.firebasestorage.app",
    messagingSenderId: "93484780890",
    appId: "1:93484780890:web:78d2fc686d639c789ff763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
        localStorage.setItem("token", res.user.accessToken);
        debugger;
        const user = auth.currentUser;
        const token = await user.getIdToken(true);
        //apiService.getCookie(token);

        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    localStorage.removeItem("token")
};

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const tokenExpired = () => {
    let token = localStorage.getItem('token');
    if (token) {
        let result = isJwtExpired(token)
        return result;
    }
    else {
        return true;
    }
}

export {
    auth,
    signInWithGoogle,
    logout,
    getToken,
    tokenExpired
};
