import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/RegisterForm'

function App() {


  return (
    <>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={false}/>
      <Register/>
    </AuthProvider>
    </>
  )
}

export default App
