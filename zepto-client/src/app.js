import React, { useState } from 'react';
import OTPLogin from './components/OTPLogin';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProducts';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0f7fa 0%, #fff 100%)', padding: '32px 0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)', padding: '36px 32px 32px 32px' }}>
        <h1 style={{ textAlign: 'center', color: '#1976d2', fontWeight: 800, fontSize: 38, marginBottom: 8, letterSpacing: 2, textShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
          🛒 Manasa Rao - Groceries
        </h1>
        <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 500, marginBottom: 32, color: '#4caf50' }}>
          Healthy and Organic
        </p>

        <ProductList />

        {loggedIn ? (
          <AddProduct />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px' }}>
            <OTPLogin onLogin={() => setLoggedIn(true)} />
          </div>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: 40, color: '#888', fontSize: 15 }}>
        &copy; {new Date().getFullYear()} Manasa Rao - Groceries. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
