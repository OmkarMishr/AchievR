import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FacultyDashboard() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities/faculty/pending', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setActivities(response.data.activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (activityId) => {
    if (!comment.trim()) {
      alert('⚠️ Please add a comment');
      return;
    }

    setActionLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/activities/${activityId}/approve`,
        { comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('✅ Activity approved!');
      setSelectedActivity(null);
      setComment('');
      fetchPendingActivities();
    } catch (error) {
      alert('❌ Error approving activity');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (activityId, reason) => {
    if (!reason.trim()) {
      alert('⚠️ Please add a rejection reason');
      return;
    }

    setActionLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/activities/${activityId}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('❌ Activity rejected!');
      setSelectedActivity(null);
      fetchPendingActivities();
    } catch (error) {
      alert('❌ Error rejecting activity');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">⏳ Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">👨‍🏫 Faculty Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activities List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 bg-blue-50 border-b">
              <h2 className="text-2xl font-bold">📋 Pending Activities ({activities.length})</h2>
            </div>

            <div className="space-y-4 p-6 max-h-[70vh] overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-gray-600 text-center py-8">✅ No pending activities!</p>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity._id}
                    onClick={() => setSelectedActivity(activity)}
                    className={`p-4 border rounded-lg cursor-pointer transition card-hover ${
                      selectedActivity?._id === activity._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{activity.title}</h3>
                        <p className="text-sm text-gray-600">
                          By: {activity.student?.name || 'Unknown'} ({activity.student?.rollNumber || 'N/A'})
                        </p>
                        <p className="text-sm text-gray-600">Category: {activity.category}</p>
                        <p className="text-sm text-gray-600">Achievement Level: {activity.achievementLevel || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                          Event Date: {activity.eventDate ? new Date(activity.eventDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      {selectedActivity?._id === activity._id && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Selected</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Review Panel */}
        {selectedActivity && (
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">📝 Review Activity</h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-gray-700">Title:</p>
                <p>{selectedActivity.title}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Student:</p>
                <p>{selectedActivity.student?.name || 'Unknown'}</p>
                <p className="text-sm text-gray-600">{selectedActivity.student?.rollNumber || 'N/A'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Description:</p>
                <p className="text-sm">{selectedActivity.description}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Organizing Body:</p>
                <p>{selectedActivity.organizingBody || <span className="text-gray-400">N/A</span>}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Event Date:</p>
                <p>
                  {selectedActivity.eventDate
                    ? new Date(selectedActivity.eventDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Proof Documents:</p>
                <ul className="list-disc list-inside break-words max-h-36 overflow-y-auto">
                  {selectedActivity.proofDocuments?.length > 0 ? (
                    selectedActivity.proofDocuments.map((doc) => (
                      <li key={doc.url}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {doc.filename}
                        </a>{' '}
                        <span className="text-xs text-gray-500">
                          ({doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString() : ''})
                        </span>
                      </li>
                    ))
                  ) : (
                    <span className="text-gray-400">No documents uploaded</span>
                  )}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Fraud Status:</p>
                <p>{selectedActivity.fraudStatus || 'not_scanned'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Achievement Level:</p>
                <p>{selectedActivity.achievementLevel || 'N/A'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Selected Technical Skills:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedActivity.selectedTechnicalSkills?.map((skill) => (
                    <span
                      key={`tech-${skill}`}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Selected Soft Skills:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedActivity.selectedSoftSkills?.map((skill) => (
                    <span
                      key={`soft-${skill}`}
                      className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Selected Tools:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedActivity.selectedTools?.map((tool) => (
                    <span
                      key={`tool-${tool}`}
                      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your review comment..."
              className="w-full px-4 py-2 border rounded-lg mb-4 h-24 resize-none"
            />

            <div className="space-y-2">
              <button
                onClick={() => handleApprove(selectedActivity._id)}
                disabled={actionLoading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold transition"
              >
                {actionLoading ? '⏳ Processing...' : '✅ Approve'}
              </button>

              <button
                onClick={() => {
                  const reason = prompt('Enter rejection reason:');
                  if (reason) handleReject(selectedActivity._id, reason);
                }}
                disabled={actionLoading}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold transition"
              >
                {actionLoading ? '⏳ Processing...' : '❌ Reject'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
