import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../Firebase/firebase";

const AuthContext = createContext();

// context Provider

export const AuthProvider = ({ children }) => {
  // initialize states

  const [currentUser, setCurrentUser] = useState(null);
  const storedRole = localStorage.getItem("userRole");
  const [role, setRole] = useState(storedRole || null);
  const [loading, setLoading] = useState(true);

  // Register user using Firebase database

  const register = async (email, password, role = "customer", name) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set displayName in Firebase Auth
      await updateProfile(userCred.user, {
        displayName: name,
      });

      // Save to Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      return userCred;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  // Login user using Firebase database

  const login = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", userCred.user.uid));
      const role = snap.data()?.role || null;

      setRole(role);
      console.log("Logged in role:", role);

      localStorage.setItem("userRole", role);
      return userCred;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
  await signOut(auth);
  localStorage.removeItem("userRole");
  setRole(null);
  setCurrentUser(null);
};
  // Track auth state and retrieve role

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        setRole(snap.data()?.role || null);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, role, register, login, logOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
