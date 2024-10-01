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
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
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

<<<<<<< HEAD
 
  //  const getToken = async email => {
  //   const { data } = await axios.post(
  //     `${import.meta.env.VITE_API_URL}/jwt`,
  //     { email },
  //     { withCredentials: true }
  //   )
  //   return data
  // }

=======
  // Get token from server
  const getToken = async (email) => {
    try {
      const { data } = await axios.post(
        `https://class-net-server.vercel.app/jwt`,
        { email },
        { withCredentials: true }
      );
      console.log("JWT Token:", data); // Debugging: log the token
      return data;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  
>>>>>>> 1f969f11f3b69fe7aa47c39aca215008e1356a0f

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
<<<<<<< HEAD
      // if (currentUser) {
      //   getToken(currentUser.email)
      // }
=======
      if (currentUser) {
        console.log("Current User:", currentUser); // Debugging: log the user
        getToken(currentUser?.email);
      }
>>>>>>> 1f969f11f3b69fe7aa47c39aca215008e1356a0f
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
    await axios.get(`https://class-net-server.vercel.app/logout`, {
      withCredentials: true,
<<<<<<< HEAD
    })
    return signOut(auth)
  }

=======
    });
    return signOut(auth);
  };
  //pass the information through context api
>>>>>>> 1f969f11f3b69fe7aa47c39aca215008e1356a0f
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
    logOut,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
