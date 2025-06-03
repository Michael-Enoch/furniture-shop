import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react"
import app from "../../Firebase/firebase";


const Navbar = () => {
    const [visitorCount, setVisitorCount] = useState(null);

   useEffect(() => {
  let hasRun = false;

  if (!hasRun) {
    hasRun = true;

    const db = getDatabase(app);
    const countRef = ref(db, 'visitorCount');

    runTransaction(countRef, (current) => (current || 0) + 1)
      .then(() => console.log("Visitor count incremented"))
      .catch((err) => console.error("Transaction failed:", err));

    const unsubscribe = onValue(countRef, (snapshot) => {
      setVisitorCount(snapshot.val());
    });

    return () => unsubscribe();
  }
}, []);

useEffect(() => {
  console.log("Navbar mounted"); // should log only once
}, []);


  return (
    <div className="w-full bg-white p-4 shadow-md flex flex-row items-center justify-between">
      <div>
        <h1>Hudson Furniture</h1>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        Visitors: {visitorCount != null ? visitorCount : "Loading...."}
      </div>
    </div>
  )
}

export default Navbar
