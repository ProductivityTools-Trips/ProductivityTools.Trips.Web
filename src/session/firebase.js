import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Session persistence: Firebase's default (IndexedDB, shared across tabs,
// survives browser restarts) is what we want. Do NOT call setPersistence()
// here – switching persistence while a freshly opened tab is still restoring
// the user races with that restore and yields a null user for the first
// requests (-> 401 -> bounce to /Login).

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
