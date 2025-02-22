import { auth } from "../../firebase.init.js";
import AuthContext from "./AuthContext.jsx";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios to make API requests
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  // Function to store user in the database
  const storeUserInDB = async (user) => {
    if (!user) return;
    try {
      await axios.post("http://localhost:5000/users", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } catch (error) {
      console.error("Error storing user in DB:", error);
    }
  };

  // Google Sign-In
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await storeUserInDB(result.user);

      console.log("Google Login Success:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // Register with Email & Password
  const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await storeUserInDB(userCredential.user);
      console.log("Registration Success:", userCredential.user);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  // Login with Email & Password
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await storeUserInDB(userCredential.user);
      console.log("Email Login Success:", userCredential.user);
    } catch (error) {
      console.error("Email Login Error:", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Logout Success");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    logout,
    taskData,
    setTaskData,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
