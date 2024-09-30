/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useCallback } from "react";
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
import useAxiosPublic from "../CustomHooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Create a new user with Firebase authentication
  const createUser = (email, password) => {
    setLoading(true); // Set loading state before creating the user
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in an existing user
  const logInUser = (email, password) => {
    setLoading(true); // Set loading state before login
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true); // Set loading state before Google sign-in
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile with display name and photo URL
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Memoized function to get token from the server
  const getToken = useCallback(async (email) => {
    try {
      const { data } = await axiosPublic.post(
        `/jwt`,
        { email },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }, [axiosPublic]);

  // onAuthStateChanged listener to detect user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // If a user is logged in, get their token
        getToken(currentUser.email).then(() => setLoading(false));
      } else {
        setLoading(false); // Set loading to false if no user is logged in
      }

      console.log("Current User:", currentUser);
    });

    return () => {
      unsubscribe(); // Cleanup subscription on unmount
    };
  }, [getToken]);

  // Reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Log out user
  const logOut = async () => {
    setLoading(true);
    await axiosPublic.get(`/logout`, {
      withCredentials: true,
    });
    return signOut(auth);
  };

  // Auth information to be passed via context
  const AuthInfo = {
    user,
    loading,
    setUser,
    setLoading,
    updateUserProfile,
    createUser,
    logInUser,
    signInWithGoogle,
    resetPassword,
    logOut,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
