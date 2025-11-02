import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certifying, setCertifying] = useState(null);

  useEffect(() => {
    fetchApprovedActivities();
  }, []);

  const fetchApprovedActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities/admin/approved', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setActivities(response.data.activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (activityId) => {
    setCertifying(activityId);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/certificates/generate/${activityId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('✅ Certificate generated!');
      fetchApprovedActivities();
    } catch (error) {
      alert('❌ Error generating certificate');
    } finally {
      setCertifying(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">⏳ Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">🛡️ Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 bg-purple-50 border-b">
          <h2 className="text-2xl font-bold">🎓 Approved Activities Ready for Certification ({activities.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Student Name</th>
                <th className="p-4 text-left">Activity Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Level</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-600">
                    ✅ No pending certifications!
                  </td>
                </tr>
              ) : (
                activities.map(activity => (
                  <tr key={activity._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{activity.student.name}</td>
                    <td className="p-4 font-semibold">{activity.title}</td>
                    <td className="p-4">{activity.category}</td>
                    <td className="p-4">{activity.achievementLevel}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleGenerateCertificate(activity._id)}
                        disabled={certifying === activity._id}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition text-sm font-semibold"
                      >
                        {certifying === activity._id ? 'Certifying...' : 'Generate Certificate'}
                      </button>
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