import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log('x');
      try {
        const res = await axios.get('http://localhost:5000/api/predictions/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data.history);
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Prediction History</h2>

        {history.length ? (
          <table className="min-w-[1200px] border-collapse text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-3 py-2 text-center font-semibold">S.No.</th>
                {[...Array(24)].map((_, i) => (
                  <th key={i} className="border px-3 py-2 text-center">Sensor {i + 1}</th>
                ))}
                <th className="border px-3 py-2 text-center text-green-700 font-semibold">Predicted Life</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border px-3 py-2 text-center font-medium">{index + 1}</td>
                  {entry.prediction.sensorData.map((value, i) => (
                    <td key={i} className="border px-3 py-2 text-center">{value}</td>
                  ))}
                  <td className="border px-3 py-2 text-center font-bold text-green-600">
                    {entry.prediction.predictedLife}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No prediction history available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
