import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState,} from 'react'
import { auth, db } from '../../Firebase/firebase';

const AuthContext = createContext();

// context Provider

export const AuthProvider = ({children}) => {

    // initialize states

    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user using Firebase database

    const register = async (email, password, userRole) => {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc (db, "users", userCred.user.uid), {
            email,
            role:userRole,
            createdAt: new Date(),
        });
        return userCred;
        
    };

    // Login user using Firebase database

    const login = async(email, password) => {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const snap = await getDoc(doc(db, "users", userCred.user.uid));
        setRole(snap.data()?.role || null)
    };

    const logOut = () => signOut(auth);

    // Track auth state and retrieve role

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async(user) => {
            setCurrentUser(user);
            if(user) {
                const snap = await getDoc(doc(db, "users", user.uid));
                setRole(snap.data()?.role || null)
            }else {
                setRole(null);
            }setLoading(false)
        });
        return unsubcribe;
    }, [])

    return (
        <AuthContext.Provider value={{currentUser, role, register, login, logOut}}>
         {!loading && children}
        </AuthContext.Provider>
    )
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
