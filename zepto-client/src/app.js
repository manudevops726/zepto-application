import React, { useState } from 'react';
import OTPLogin from './components/OTPLogin';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e0f7fa 0%, #fff 100%)',
        padding: '32px 0',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
          padding: '36px 32px 32px 32px',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#1976d2',
            fontWeight: 800,
            fontSize: 38,
            marginBottom: 32,
            letterSpacing: 2,
            textShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
          }}
        >
          🛒 Zepto Clone – Grocery Store
        </h1>
        {loggedIn ? (
          <div>
            <ProductList />
            <AddProduct />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '320px',
            }}
          >
            <OTPLogin onLogin={() => setLoggedIn(true)} />
          </div>
        )}
      </div>
      <footer
        style={{
          textAlign: 'center',
          marginTop: 40,
          color: '#888',
          fontSize: 15,
        }}
      >
        &copy; {new Date().getFullYear()} Zepto Clone. All rights reserved.
      </footer>
    </div>
  );
}

export default App;