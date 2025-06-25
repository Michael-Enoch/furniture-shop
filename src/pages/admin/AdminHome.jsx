
import { useAuth } from "../../context/AuthContext";
const AdminHome = () => {
    const {userData} = useAuth()
  return (
    <div>
      <h1>
        Welcome Admin {userData?.name || "Unknown"}
      </h1>
    </div>
  )
}

export default AdminHome
