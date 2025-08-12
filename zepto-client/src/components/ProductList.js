import React, { useEffect, useState } from 'react';
import api from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '48px auto', padding: 32, background: 'linear-gradient(135deg, #e8f5e9 0%, #fff 100%)', borderRadius: 16, boxShadow: '0 4px 24px rgba(44, 62, 80, 0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 40, color: '#1b5e20', fontWeight: 700, letterSpacing: 1, fontSize: 32 }}>
        Grocery Items
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        {products.map(p => (
          <div key={p.id} style={{ width: 210, padding: 20, borderRadius: 12, background: '#f1f8e9', boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
               onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
               onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <img src={p.image} alt={p.name} width="110" height="110" style={{ borderRadius: 8, marginBottom: 16, objectFit: 'cover', background: '#c8e6c9' }} />
            <h4 style={{ margin: '10px 0 6px 0', fontSize: 20, color: '#388e3c', fontWeight: 600 }}>{p.name}</h4>
            <div style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: 18, marginBottom: 6 }}>₹{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
