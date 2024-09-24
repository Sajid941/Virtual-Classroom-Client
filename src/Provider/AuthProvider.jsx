/* eslint-disable react/prop-types */
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
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

  //pass the information through context api
  const AuthInfo = {
    createUser,
    logInUser,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
