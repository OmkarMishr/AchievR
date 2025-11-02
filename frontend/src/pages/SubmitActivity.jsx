import { useState } from 'react';
import axios from 'axios';
import SkillSelector from '../components/SkillSelector';

export default function SubmitActivity() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    eventDate: '',
    organizingBody: '',
    achievementLevel: 'College'
  });

  const [selectedSkills, setSelectedSkills] = useState({
    technicalSkills: [],
    softSkills: [],
    tools: []
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedSkills.technicalSkills.length === 0 && 
        selectedSkills.softSkills.length === 0 && 
        selectedSkills.tools.length === 0) {
      setError('❌ Please select at least one skill');
      return;
    }

    setLoading(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });

    // Convert arrays to JSON strings for form data
    formDataObj.append('selectedTechnicalSkills', JSON.stringify(selectedSkills.technicalSkills));
    formDataObj.append('selectedSoftSkills', JSON.stringify(selectedSkills.softSkills));
    formDataObj.append('selectedTools', JSON.stringify(selectedSkills.tools));

    if (file) {
      formDataObj.append('document', file);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/activities/submit',
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || '❌ Error submitting activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-2">📝 Submit Activity</h1>
      <p className="text-gray-600 mb-8">Share your achievement and select relevant skills</p>

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          ✅ Activity submitted successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Activity Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Won State Level Hackathon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your achievement in detail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>Technical</option>
                  <option>Sports</option>
                  <option>Cultural</option>
                  <option>Volunteering</option>
                  <option>Internship</option>
                  <option>Leadership</option>
                  <option>Academic</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Organizing Body</label>
                <input
                  type="text"
                  name="organizingBody"
                  value={formData.organizingBody}
                  onChange={handleChange}
                  placeholder="e.g., Government of India"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Achievement Level</label>
                <select
                  name="achievementLevel"
                  value={formData.achievementLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>College</option>
                  <option>University</option>
                  <option>State</option>
                  <option>National</option>
                  <option>International</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Upload Proof Document (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                  accept=".pdf,.jpg,.png,.jpeg"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  {file ? (
                    <div>
                      <p className="text-green-600 font-semibold">✅ {file.name}</p>
                      <p className="text-sm text-gray-600">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600">📎 Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Selection Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">🎯 Select Your Skills</h2>
          <p className="text-gray-600 mb-6">Choose all skills that apply to this achievement *</p>
          <SkillSelector selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold text-lg transition"
        >
          {loading ? '⏳ Submitting...' : '📤 Submit Activity with Skills'}
        </button>
      </form>
    </div>
  );
}