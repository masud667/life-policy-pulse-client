import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import AuthSecureAxios from "../Hooks/AuthSecureAxios";



const AuthProvider = ({ children }) => {

 const [user, setUser] = useState(null);
  const [loading, setLoading]= useState(true)

   const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
 const logOut = () => {
    return signOut(auth);
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
      if(currentUser?.email){
        const userData = {email: currentUser.email};
        AuthSecureAxios.post('/jwt', userData)
        .then(res=> {
          
        })
        .catch(error => console.log(error))
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  const userInfo = {
    createUser,
    signInWithGoogle,
    user,
    setUser,
    loading,
    setLoading,
    updateUserProfile,
    logOut,
    logIn
  };
  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;