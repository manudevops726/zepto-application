import React, { useState } from 'react';
import api from '../api';

const OTPLogin = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await api.post('/auth/request-otp', { mobile });
      setStep(2);
      alert('OTP sent to your mobile.');
    } catch (e) {
      alert('Failed to send OTP.');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post('/auth/verify-otp', { mobile, otp });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLogin();
        alert('Login successful!');
      } else {
        alert('Invalid response from server');
      }
    } catch {
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
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OTPLogin;
