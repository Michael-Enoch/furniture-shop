import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaMoon, FaSun } from 'react-icons/fa';
import {
  initializeApp,
} from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTHDOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGEBUCKET.appspot.com",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishlistCollection = collection(db, 'wishlist');

function ModernWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const q = query(wishlistCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishlist(items);
    });
    return unsubscribe;
  }, []);

  
  const addItem = async () => {
    if (!name.trim()) return;
    try {
      await addDoc(wishlistCollection, {
        name,
        description,
        liked: false,
        createdAt: Date.now()
      });
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

 
  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'wishlist', id));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

 
  const toggleLike = async (id, liked) => {
    try {
      const itemRef = doc(db, 'wishlist', id);
      await updateDoc(itemRef, { liked: !liked });
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

 
  let displayedList = wishlist;
  if (showOnlyLiked) {
    displayedList = wishlist.filter(i => i.liked);
  }
  displayedList = displayedList.sort((a, b) =>
    a.liked === b.liked ? 0 : b.liked ? 1 : -1
  );

 
  const themeStyles = darkTheme ? darkStyles : lightStyles;

  return (
    <div style={{ ...styles.container, ...themeStyles.container }}>
      <header style={styles.header}>
        <h1 style={{ ...styles.title, color: themeStyles.title.color }}>Wishlist</h1>
        <div>
          <button
            onClick={() => setShowOnlyLiked(!showOnlyLiked)}
            style={{ ...styles.filterButton, backgroundColor: themeStyles.filterButton.bg }}
          >
            {showOnlyLiked ? 'Show All' : 'Show Liked'}
          </button>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            style={{ ...styles.themeToggle, color: themeStyles.title.color }}
            title={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkTheme ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <div style={{ ...styles.form, backgroundColor: themeStyles.form.bg, boxShadow: themeStyles.form.shadow }}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...styles.input, backgroundColor: themeStyles.input.bg, color: themeStyles.input.color }}
        />
        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.textarea, backgroundColor: themeStyles.input.bg, color: themeStyles.input.color }}
        />
        <button onClick={addItem} style={{ ...styles.addButton, backgroundColor: themeStyles.addButton.bg }}>
          Add
        </button>
      </div>

      <div style={styles.list}>
        {displayedList.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.card,
              backgroundColor: themeStyles.card.bg,
              boxShadow: themeStyles.card.shadow,
              color: themeStyles.card.color,
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={styles.cardTitle}>
                {item.name}
                <span
                  onClick={() => toggleLike(item.id, item.liked)}
                  style={{ ...styles.star, color: item.liked ? '#f1c40f' : themeStyles.star.color }}
                >
                  {item.liked ? <FaStar /> : <FaRegStar />}
                </span>
              </h3>
              <p style={{ ...styles.cardDescription, color: themeStyles.cardDesc.color }}>{item.description}</p>
            </div>
            <button
              style={{ ...styles.removeButton, backgroundColor: themeStyles.removeButton.bg }}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  container: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: '40px',
    maxWidth: '800px',
    margin: '40px auto',
    minHeight: '100vh',
    transition: 'background-color 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  filterButton: {
    border: 'none',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    marginRight: '12px',
    transition: 'background-color 0.3s ease',
  },
  themeToggle: {
    fontSize: '1.6rem',
    cursor: 'pointer',
    verticalAlign: 'middle',
    border: 'none',
    background: 'transparent',
  },
  form: {
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '40px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '12px',
    outlineColor: '#4a90e2',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '12px',
    resize: 'vertical',
    minHeight: '60px',
    outlineColor: '#4a90e2',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  addButton: {
    color: '#fff',
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
  list: {
    display: 'grid',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardDescription: {
    margin: 0,
    fontSize: '0.95rem',
  },
  removeButton: {
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s ease',
  },
  star: {
    fontSize: '1.3rem',
    marginLeft: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
};


const lightStyles = {
  container: {
    backgroundColor: '#f5f7fa',
    color: '#2c3e50',
  },
  title: {
    color: '#2c3e50',
  },
  filterButton: {
    bg: '#4a90e2',
  },
  themeToggle: {
    color: '#2c3e50',
  },
  form: {
    bg: '#ffffff',
    shadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
  },
  input: {
    bg: '#fff',
    color: '#333',
  },
  addButton: {
    bg: '#4a90e2',
  },
  card: {
    bg: '#ffffff',
    shadow: '0 2px 8px rgba(0,0,0,0.05)',
    color: '#333',
  },
  cardDesc: {
    color: '#666',
  },
  removeButton: {
    bg: '#e74c3c',
  },
  star: {
    color: '#ccc',
  },
};


const darkStyles = {
  container: {
    backgroundColor: '#121212',
    color: '#eee',
  },
  title: {
    color: '#eee',
  },
  filterButton: {
    bg: '#3b82f6',
  },
  themeToggle: {
    color: '#eee',
  },
  form: {
    bg: '#1e1e1e',
    shadow: '0 2px 12px rgba(255, 255, 255, 0.1)',
  },
  input: {
    bg: '#2a2a2a',
    color: '#ddd',
  },
  addButton: {
    bg: '#3b82f6',
  },
  card: {
    bg: '#1e1e1e',
    shadow: '0 2px 12px rgba(255, 255, 255, 0.12)',
    color: '#eee',
  },
  cardDesc: {
    color: '#aaa',
  },
  removeButton: {
    bg: '#ef4f4f',
  },
  star: {
    color: '#555',
  },
};

export default ModernWishlist;
