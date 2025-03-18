import React, { useState } from 'react';
import '../Styles/login.css';

function LoginPage() {
  const [isInfected, setIsInfected] = useState(true);
  const [symptomPasswordType, setSymptomPasswordType] = useState('password');
  const [diagnosisPasswordType, setDiagnosisPasswordType] = useState('password');

  // Function to handle infection (login) view
  const showSymptoms = () => {
    setIsInfected(true);
  };

  // Function to handle diagnosis (register) view
  const showDiagnosis = () => {
    setIsInfected(false);
  };

  // Function to toggle login password visibility
  const toggleSymptomPassword = () => {
    setSymptomPasswordType(prevType => (prevType === 'password' ? 'text' : 'password'));
  };

  // Function to toggle register password visibility
  const toggleDiagnosisPassword = () => {
    setDiagnosisPasswordType(prevType => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="virus-container">
      {/* Login/Register Form */}
      <div className="infection-box">
        <div
          className="symptoms-form"
          style={{ left: isInfected ? '27px' : '-350px' }}
        >
          {/* Login Form */}
          <h2>Infection</h2>
          <input type={symptomPasswordType} id="symptomPassword" placeholder="Password" />
          <div onClick={toggleSymptomPassword} className="virus-icon">
            {symptomPasswordType === 'password' ? (
              <span id="eye">👁️</span>
            ) : (
              <span id="eye-slash">🙈</span>
            )}
          </div>
        </div>

        <div
          className="diagnosis-form"
          style={{ right: isInfected ? '-350px' : '25px' }}
        >
          {/* Register Form */}
          <h2>Diagnosis</h2>
          <input type={diagnosisPasswordType} id="diagnosisPassword" placeholder="Password" />
          <div onClick={toggleDiagnosisPassword} className="virus-icon">
            {diagnosisPasswordType === 'password' ? (
              <span id="eye-2">👁️</span>
            ) : (
              <span id="eye-slash-2">🙈</span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons to switch between login and register */}
      <div className="immunity-switch">
        <button onClick={showSymptoms} className="infection-toggle">Infection</button>
        <button onClick={showDiagnosis}>Diagnosis</button>
      </div>
    </div>
  );
}

export default LoginPage;
