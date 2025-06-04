import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/RegisterForm'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Homepage from './pages/Homepage'

function App() {


  return (
    <>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={false}/>
    <Navbar/>
    <Homepage/>
      {/* <Register/>
      <Login/> */}
    </AuthProvider>
    
      
    </>
  )
}

export default App
