import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import theme from "../../context/Theme";
import { toast } from "sonner";
import { db } from "../../../Firebase/firebase";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });

    return () => unsubscribe();
  }, []);

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "customer" : "admin";

    try {
      await updateDoc(doc(db, "users", user.id), { role: newRole });
      toast.success(
        `${user.name} is now ${
          newRole === "admin" ? "an Admin" : "a Customer"
        }`
      );
    } catch (error) {
        console.error(error)
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("User deleted");
    } catch (error) {
         console.error(error)
      toast.error("Error deleting user");
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: theme.colors.background.DEFAULT }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: theme.colors.primary.DEFAULT }}
      >
        User Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.ui.base,
              borderColor: theme.colors.ui.border,
            }}
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm mb-1">{user.email}</p>
            <p
              className={`text-sm mb-2 ${
                user.role === "admin" ? "text-green-600" : "text-gray-600"
              }`}
            >
              Role: {user.role}
            </p>
            <p className="text-xs text-gray-500">
              ID: {user.id.slice(0, 6)}...
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => toggleRole(user)}
                className={`${
                  user.role === "admin" ? "bg-yellow-500" : "bg-blue-500"
                } text-white px-3 py-1 rounded`}
              >
                {user.role === "admin" ? "Demote" : "Promote to Admin"}
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
