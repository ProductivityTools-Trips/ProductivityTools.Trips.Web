import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    getAuth,
    setPersistence,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Keep the session in IndexedDB/localStorage across tabs and browser restarts
// until the user explicitly signs out. (This is Firebase's default, made explicit.)
setPersistence(auth, browserLocalPersistence).catch(console.error);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => signOut(auth);

/**
 * Fresh ID token for API calls. Firebase refreshes it automatically before it
 * expires, so callers never hold on to a stale one. Resolves to null when
 * signed out.
 */
const getIdToken = async () => {
    await auth.authStateReady();
    const user = auth.currentUser;
    return user ? user.getIdToken() : null;
};

export {
    auth,
    signInWithGoogle,
    logout,
    getIdToken,
};
