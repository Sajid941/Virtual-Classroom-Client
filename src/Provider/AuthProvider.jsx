/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //create a new user with firebase authentication
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Log in an existing user
  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //signIn with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  //reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  //logout with
  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }
  //pass the information through context api
  const AuthInfo = {
    user,
    loading,
    setUser,
    setLoading,
    updateUserProfile,
    createUser,
    logInUser,
    signInWithGoogle,
    updateProfile,
    resetPassword,
    logOut
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
