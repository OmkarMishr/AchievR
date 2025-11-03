import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SubmitActivity from './pages/SubmitActivity';
import PublicVerify from './pages/PublicVerify';
import Navbar from './components/Navbar';
import LandingPage from './components/landing.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🎓</div>
          <div className="text-2xl font-bold text-gray-800">AchievR</div>
          <div className="text-gray-600 mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:hash" element={<PublicVerify />} />
        
        {user?.role === 'student' && (
          <>
           
            <Route path="/dashboard" element={<StudentDashboard user={user} />} />
            <Route path="/submit" element={<SubmitActivity user={user} />} />
          </>
        )}
        
        {user?.role === 'faculty' && <Route path="/faculty" element={<FacultyDashboard user={user} />} />}
        {user?.role === 'admin' && <Route path="/admin" element={<AdminDashboard user={user} />} />}
        
        <Route path="/" element={user ? <Navigate to={user.role === 'student' ? '/dashboard' : `/${user.role}`} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}