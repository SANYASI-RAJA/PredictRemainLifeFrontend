import React from 'react';
import machineBg from '../assets/image/machine_bg.jpg';

const Home = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${machineBg})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 p-8 max-w-5xl mx-auto text-white">
        {/* Headline */}
        <h1 className="text-5xl font-bold mb-6 text-center drop-shadow-xl">
          Predict Machine Life. Prevent Failures.
        </h1>
        <p className="text-xl mb-8 text-center drop-shadow-sm">
          Built on NASA’s C-MAPSS dataset, this system forecasts the Remaining Useful Life (RUL) of turbofan engines using multivariate time series and machine learning.
        </p>

        {/* Why it matters */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Why This Matters</h2>
          <p className="text-lg text-gray-200 drop-shadow-sm">
            Unplanned machine failure can cost millions. This system predicts failure timelines—so you can plan maintenance, avoid downtime, and optimize operations.
          </p>
        </section>

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">What You Can Do</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200 drop-shadow-sm">
            <li>Predict Remaining Useful Life (RUL) of an engine in real time</li>
            <li>Access your last 10 predictions, including inputs and results</li>
            <li>Use a simple form to simulate engine cycles</li>
            <li>Log in securely and access your personal dashboard</li>
          </ul>
        </section>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-200 drop-shadow-sm">
            <li>
              <strong>Create an Account:</strong> Sign up with your email and password. Your predictions are saved to your personal account.
            </li>
            <li>
              <strong>Log In:</strong> After logging in, you'll land on your dashboard with access to past predictions.
            </li>
            <li>
              <strong>Fill the Prediction Form:</strong> Enter 3 values for operating conditions and 21 sensor readings. Each value must be numeric.
            </li>
            <li>
              <strong>Get Your RUL:</strong> Click “Predict”. The ML model instantly returns the Remaining Useful Life in cycles.
            </li>
            <li>
              <strong>Track Your History:</strong> Your last 10 predictions are saved with inputs and results for easy reference.
            </li>
          </ol>
        </section>

        {/* Dataset info */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">About the Dataset</h2>
          <p className="text-lg text-gray-200 drop-shadow-sm">
            This project uses NASA’s C-MAPSS dataset—one of the most trusted benchmarks in predictive maintenance. Each engine’s time series simulates degradation under varied conditions. Your input mimics real engine data to forecast when it will fail.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
