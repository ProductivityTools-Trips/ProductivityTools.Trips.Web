import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [user, loading, from, navigate]);

  if (loading) return null;

  return (
    <div className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
