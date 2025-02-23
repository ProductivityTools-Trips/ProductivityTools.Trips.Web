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
    apiKey: "AIzaSyBekUemIjPT6O1lU7mBskQcrmfVNSvLbjE",
    authDomain: "pttripsprod.firebaseapp.com",
    projectId: "pttripsprod",
    storageBucket: "pttripsprod.firebasestorage.app",
    messagingSenderId: "635068599677",
    appId: "1:635068599677:web:b9f4216754e40804a49014"
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
        const token=await user.getIdToken(true);
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
