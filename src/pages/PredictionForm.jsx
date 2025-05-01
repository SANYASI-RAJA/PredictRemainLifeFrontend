import React, { useState } from 'react';
import axios from 'axios';

const inputFields = [
  { name: 'op_setting_1', label: 'Operational Setting 1' },
  { name: 'op_setting_2', label: 'Operational Setting 2' },
  { name: 'op_setting_3', label: 'Operational Setting 3' },
  { name: 'sensor_1', label: 'Fan Inlet (°R)' },
  { name: 'sensor_2', label: 'LPC Outlet (°R)' },
  { name: 'sensor_3', label: 'HPC Outlet (°R)' },
  { name: 'sensor_4', label: 'LPT Outlet (°R)' },
  { name: 'sensor_5', label: 'Fan Inlet Pressure (psia)' },
  { name: 'sensor_6', label: 'Bypass Duct Pressure (psia)' },
  { name: 'sensor_7', label: 'HPC Outlet Pressure (psia)' },
  { name: 'sensor_8', label: 'Fan Speed (rpm)' },
  { name: 'sensor_9', label: 'Core Speed (rpm)' },
  { name: 'sensor_10', label: 'Engine Pressure Ratio' },
  { name: 'sensor_11', label: 'HPC Static Pressure (psia)' },
  { name: 'sensor_12', label: 'Fuel/Ps30 Ratio (pps/psi)' },
  { name: 'sensor_13', label: 'Corrected Fan Speed (rpm)' },
  { name: 'sensor_14', label: 'Corrected Core Speed (rpm)' },
  { name: 'sensor_15', label: 'Bypass Ratio' },
  { name: 'sensor_16', label: 'Fuel-Air Ratio' },
  { name: 'sensor_17', label: 'Bleed Enthalpy' },
  { name: 'sensor_18', label: 'Demanded Fan Speed (rpm)' },
  { name: 'sensor_19', label: 'Demanded Corrected Fan Speed (rpm)' },
  { name: 'sensor_20', label: 'HPT Coolant Bleed (lbm/s)' },
  { name: 'sensor_21', label: 'LPT Coolant Bleed (lbm/s)' }
];



const PredictionForm = () => {
  const initialForm = inputFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const sensorDataArray = inputFields.map(f => Number(formData[f.name]));
    const token = localStorage.getItem('token');
    console.log(sensorDataArray);
    console.log(token);
    try {
      
      const res = await axios.post('https://rul-backend.onrender.com/api/predictions', 
        { data: sensorDataArray} ,
        {headers: {Authorization: `Bearer ${token}`}}
      );
      // console.log(res);
      setResult(res.data.predictedLife);
      setError('');
      setFormData(initialForm); // optional reset
    } catch (err) {
      console.error(err);
      setError('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-8 p-8 bg-blue-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Machine Life Prediction
      </h2>

      {error && !loading && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-600 mb-4 font-medium">🔄 Predicting...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inputFields.map(({ name, label }) => (
            <div className="flex flex-col" key={name}>
              <label className="mb-1 text-gray-700 font-medium">
                {label}:
              </label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="bg-white p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-semibold py-2 px-4 rounded`}
        >
          {loading ? 'Loading...' : 'Get Prediction'}
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          <h3 className="text-xl font-semibold">
            Remaining Useful Life: {result}
          </h3>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
