import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import CVUpload from './pages/CVUpload'
import Applications from './pages/Applications'

function App() {
  return (
    <div style={{ display: 'flex' }}> {/* Sayfayı yan yana bölmek için */}
      <Sidebar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cv-upload" element={<CVUpload />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}