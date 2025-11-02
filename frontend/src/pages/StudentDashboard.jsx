import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    certified: 0,
    pending: 0,
    rejected: 0,
    skillsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities/my-activities', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setActivities(response.data.activities);

      const certified = response.data.activities.filter(a => a.status === 'certified').length;
      const pending = response.data.activities.filter(a => a.status === 'pending').length;
      const rejected = response.data.activities.filter(a => a.status === 'rejected').length;

      setStats({
        total: response.data.activities.length,
        certified,
        pending,
        rejected,
        skillsCount: new Set(
          response.data.activities.flatMap(a => [...(a.selectedTechnicalSkills || []), ...(a.selectedSoftSkills || [])])
        ).size
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Technical', count: activities.filter(a => a.category === 'Technical').length },
    { name: 'Sports', count: activities.filter(a => a.category === 'Sports').length },
    { name: 'Cultural', count: activities.filter(a => a.category === 'Cultural').length },
    { name: 'Leadership', count: activities.filter(a => a.category === 'Leadership').length },
    { name: 'Others', count: activities.filter(a => !['Technical', 'Sports', 'Cultural', 'Leadership'].includes(a.category)).length }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">⏳ Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">📊 Your Portfolio</h1>
        <p className="text-gray-600">Track and manage your achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow card-hover">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600 text-sm mt-1">Total Activities</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow card-hover">
          <div className="text-3xl font-bold text-green-600">{stats.certified}</div>
          <div className="text-gray-600 text-sm mt-1">✅ Certified</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow card-hover">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600 text-sm mt-1">⏳ Pending</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow card-hover">
          <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-gray-600 text-sm mt-1">❌ Rejected</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow card-hover">
          <div className="text-3xl font-bold text-purple-600">{stats.skillsCount}</div>
          <div className="text-gray-600 text-sm mt-1">🎯 Unique Skills</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Activities by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Certified', value: stats.certified },
                  { name: 'Pending', value: stats.pending },
                  { name: 'Rejected', value: stats.rejected }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#10B981" />
                <Cell fill="#FBBF24" />
                <Cell fill="#EF4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-2xl font-bold">📋 Your Activities</h2>
          <button
            onClick={() => navigate('/submit')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            ➕ Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Skills</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No activities yet. <button onClick={() => navigate('/submit')} className="text-blue-600 hover:underline">Submit one now!</button>
                  </td>
                </tr>
              ) : (
                activities.map(activity => (
                  <tr key={activity._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">{activity.title}</td>
                    <td className="p-4">{activity.category}</td>
                    <td className="p-4">{new Date(activity.eventDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        activity.status === 'certified' ? 'bg-green-100 text-green-800' :
                        activity.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {activity.selectedTechnicalSkills?.slice(0, 2).map(skill => (
                          <span key={skill} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {activity.selectedTechnicalSkills?.length > 2 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{activity.selectedTechnicalSkills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {activity.status === 'certified' && activity.qrCodeUrl && (
                        <a href={activity.qrCodeUrl} download className="text-blue-600 hover:underline text-sm">
                          📥 Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}