import React, { useState } from 'react';
import api from '../api';

const OTPLogin = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await api.post('/auth/request-otp', { mobile });
    setStep(2);
  };
  const verifyOtp = async () => {
    try {
      const res = await api.post('/auth/verify-otp', { mobile, otp });
      console.log('API response:', res);
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLogin();
      } else {
        console.error('Unexpected response:', res.data);
        alert('Invalid response from server');
      }
    } catch (error) {
      console.error('Verification failed:', error.response ? error.response.data : error.message);
      alert('OTP verification failed. Please try again.');
    }
  };

  return (
    <div>
      {step === 1 ? (
        <>
          <input placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
    </div>
  );
};

export default OTPLogin;