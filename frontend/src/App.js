import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LandingPage from './LandingPage';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   // Validating form fields
  //   if (!name || !email || !address || !paymentMethod || !selectedProduct) {
  //     setError('All fields are required');
  //     return;
  //   }

  //   // Making API call to the Express.js endpoint with the help of axios
  //   try {
  //     const response = await axios.post('/api/order', {
        
  //       name,
  //       email,
  //       address,
  //       paymentMethod,
  //       selectedProduct
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validating form fields
    if (!name || !email || !address || !paymentMethod || !selectedProduct) {
      setError('All fields are required');
      return;
    }
  
    // Making API call to the Express.js endpoint using fetch
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address,
          paymentMethod,
          selectedProduct,
        }),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="container">
      {selectedProduct ? (
        <div>
          <h2>Product: {selectedProduct.name}</h2>
          <p>Description: {selectedProduct.description}</p>
        </div>
      ) : (
        <LandingPage setSelectedProduct={setSelectedProduct} />
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Shipping Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-submit">
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default App;
