
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './components/Profile'
import Errpage from './pages/Errpage'


function App() {

  
  return (
    <Routes>
    
    <Route path="/" index element={<Homepage/>} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path='/*' element={<Errpage />} />

   </Routes>
  )
}

export default App
