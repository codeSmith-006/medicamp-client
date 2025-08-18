import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import AuthContext from "./AuthContext"; // Your existing context
import { auth } from "../Auth/Firebase/firebase.config";
import { setAccessToken } from "../Hooks/AxiousSecure";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Dark mode state with localStorage init
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false;
  });

  // Effect to apply dark mode class to <html> and save preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Optional: toggle function for convenience
  const toggleDark = () => setIsDarkMode((prev) => !prev);

  const registerWithEmail = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("user: ", currentUser)
      setAccessToken(currentUser?.accessToken);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    authLoading,
    registerWithEmail,
    login,
    logout,
    loginWithGoogle,
    updateUserProfile,
    setUser,
    isDarkMode,
    setIsDarkMode,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
