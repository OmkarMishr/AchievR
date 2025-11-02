import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentProfile({ studentId }) {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get all certified activities
      const res = await axios.get('/api/activities/my-activities', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const certifiedActivities = res.data.activities.filter(a => a.status === 'certified');
      setActivities(certifiedActivities);

      // Aggregate all skills
      const allTechnical = new Set();
      const allSoft = new Set();
      const allTools = new Set();

      certifiedActivities.forEach(activity => {
        activity.selectedTechnicalSkills?.forEach(s => allTechnical.add(s));
        activity.selectedSoftSkills?.forEach(s => allSoft.add(s));
        activity.selectedTools?.forEach(t => allTools.add(t));
      });

      setProfile({
        technicalSkills: Array.from(allTechnical),
        softSkills: Array.from(allSoft),
        tools: Array.from(allTools),
        totalActivities: certifiedActivities.length
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Skills Profile</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* TECHNICAL SKILLS */}
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">💻 Technical Skills ({profile.technicalSkills.length})</h2>
          <div className="flex flex-wrap gap-2">
            {profile.technicalSkills.map(skill => (
              <span key={skill} className="bg-blue-500 text-white px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">🎯 Soft Skills ({profile.softSkills.length})</h2>
          <div className="flex flex-wrap gap-2">
            {profile.softSkills.map(skill => (
              <span key={skill} className="bg-purple-500 text-white px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
          <h2 className="text-2xl font-bold mb-4 text-orange-700">🛠️ Tools ({profile.tools.length})</h2>
          <div className="flex flex-wrap gap-2">
            {profile.tools.map(tool => (
              <span key={tool} className="bg-orange-500 text-white px-3 py-1 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFIED ACTIVITIES */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Certified Activities</h2>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity._id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold">{activity.title}</h3>
              <p className="text-gray-600 mt-2">{activity.description}</p>
              <div className="mt-4 flex gap-4 text-sm">
                <span className="badge badge-info">{activity.category}</span>
                <span className="badge">{activity.achievementLevel}</span>
                <span className="badge badge-success">✅ Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}