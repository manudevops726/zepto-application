import React, { useState } from 'react';
import api from '../api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const submit = async () => {
    try {
      await api.post('/products', { name, image, price });
      alert("Product added!");
      setName('');
      setImage('');
      setPrice('');
    } catch (error) {
      alert('Failed to add product.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '48px auto', padding: 32, background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)', borderRadius: 16, boxShadow: '0 4px 24px rgba(44, 62, 80, 0.08)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: 28, color: '#1976d2', fontWeight: 700, fontSize: 26, letterSpacing: 1 }}>Add New Product</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 12px', marginBottom: 18, borderRadius: 8, border: '1px solid #90caf9', fontSize: 16 }} />
      <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%', padding: '10px 12px', marginBottom: 18, borderRadius: 8, border: '1px solid #90caf9', fontSize: 16 }} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '10px 12px', marginBottom: 24, borderRadius: 8, border: '1px solid #90caf9', fontSize: 16 }} />
      <button onClick={submit} style={{ width: '100%', padding: '12px 0', background: '#1976d2', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1565c0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1976d2')}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
