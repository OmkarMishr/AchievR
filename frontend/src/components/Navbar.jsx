import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate(user.role === 'student' ? '/dashboard' : `/${user.role}`)}
        >
          🎓 AchievR
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            <div className="font-semibold">{user?.name}</div>
            <div className="text-blue-100 capitalize">{user?.role}</div>
          </div>

          {user.role === 'student' && (
            <button
              onClick={() => navigate('/submit')}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-semibold"
            >
              ➕ Submit Activity
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}