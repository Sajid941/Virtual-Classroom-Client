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
import axios from "axios";
import useAxiosPublic from "../CustomHooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const axiosPublic =useAxiosPublic()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // const getToken = async (email) => {
  //   try {
  //     const { data } = await axiosPublic.post(`/jwt`,
  //       { email },
  //       { withCredentials: true }
  //     );
  //     console.log("JWT Token:", data); // Debugging: log the token
  //     localStorage.setItem("token", data.token); // Store the token in localStorage
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching token:", error);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("Current User:", currentUser); // Debugging: log the user
        // getToken(currentUser?.email); // Fetch and store the token
      } else {
        // localStorage.removeItem("token"); // Remove token if user logs out
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    // await axios.get(`https://class-net-server.vercel.app/logout`, {
    //   withCredentials: true,
    // });
    // localStorage.removeItem("token"); // Clear token on logout
    return signOut(auth);
  };

  // Pass the information through context API
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
