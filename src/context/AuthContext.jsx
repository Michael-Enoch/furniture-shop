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

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const storedRole = localStorage.getItem("userRole");
  const [role, setRole] = useState(storedRole || null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, role = "customer", name) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });

    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    });

    return userCred;
  };

  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", userCred.user.uid));

    if (snap.exists()) {
      const data = snap.data();
      setRole(data.role);
      setUserData({ name: data.name, email: data.email, role: data.role });
      localStorage.setItem("userRole", data.role);
    }

    return userCred;
  };

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("userRole");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    setRole(null);
    setCurrentUser(null);
    setUserData(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({ name: data.name, email: data.email, role: data.role });
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
