import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/RegisterForm'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={false}/>
    <Navbar/>
      <Register/>
    </AuthProvider>
    </>
  )
}

export default App
