import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import CVUpload from './pages/CVUpload'
import Applications from './pages/Applications'
import Admin from './pages/Admin'
import FirmaPanel from './pages/FirmaPanel'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cv-upload" element={<CVUpload />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/firma" element={<FirmaPanel />} />
    </Routes>
  )
}

export default App