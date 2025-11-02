import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PublicVerify() {
  const { hash } = useParams();
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify/${hash}`);
        setVerificationData(response.data);
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationData({ verified: false, message: '❌ Error verifying certificate' });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [hash]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-2xl font-bold">Verifying Certificate...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className={`bg-white p-8 rounded-lg shadow-2xl max-w-md w-full border-4 ${
        verificationData?.verified ? 'border-green-500' : 'border-red-500'
      }`}>
        <div className="text-center mb-6">
          {verificationData?.verified ? (
            <>
              <h1 className="text-6xl mb-3">✅</h1>
              <h2 className="text-3xl font-bold text-green-600">Certificate Verified</h2>
            </>
          ) : (
            <>
              <h1 className="text-6xl mb-3">❌</h1>
              <h2 className="text-3xl font-bold text-red-600">Certificate Invalid</h2>
            </>
          )}
        </div>

        {verificationData?.certificate && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div>
              <p className="text-xs text-gray-600">Student</p>
              <p className="font-bold">{verificationData.certificate.student}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600">Achievement</p>
              <p className="font-bold">{verificationData.certificate.activity}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600">Level</p>
              <p className="font-bold">{verificationData.certificate.level}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600">Issued Date</p>
              <p className="font-bold">{new Date(verificationData.certificate.issuedAt).toLocaleDateString()}</p>
            </div>

            {verificationData.certificate.skills && (
              <>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-600 mb-2">Skills Demonstrated</p>
                  <div className="flex flex-wrap gap-2">
                    {verificationData.certificate.skills.technical?.map(skill => (
                      <span key={skill} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {verificationData.certificate.skills.soft?.map(skill => (
                      <span key={skill} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-center mt-6 text-gray-600 text-sm">{verificationData?.message}</p>
      </div>
    </div>
  );
}