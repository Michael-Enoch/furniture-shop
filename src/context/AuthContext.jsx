import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../Firebase/firebase";

const AuthContext = createContext();

// context Provider

export const AuthProvider = ({ children }) => {
  // initialize states

  const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
  const storedRole = localStorage.getItem("userRole");
  const [role, setRole] = useState(storedRole || null);
  const [loading, setLoading] = useState(true);

  // Register user using Firebase database

 const register = async (email, password, role = "customer", name) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Set displayName to Firebase Auth
    await updateProfile(userCred.user, { displayName: name });

    // Save to Firestore Database
    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      role,
      createdAt: serverTimestamp(),
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

    if (snap.exists()) {
      const data = snap.data();
      setRole(data.role);
      setUserData({
        name: data.name,
        email: data.email,
        role: data.role,
      });

      localStorage.setItem("userRole", data.role);
    } else {
      console.warn("User document not found in Firestore.");
    }

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            name: data.name,
            email: data.email,
            role: data.role,
          });
          setRole(data.role);
          localStorage.setItem("userRole", data.role);
        }
      } else {
        setUserData(null);
        setRole(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userData, role, register, login, logOut, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);