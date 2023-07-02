import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LandingPage from './LandingPage';

const App = () => {
const [values, setValues] = useState({
name: '',
email: '',
address: '',
paymentMethod: '',
selectedProduct: null
});

const [error, setError] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
const { name, email, address, paymentMethod, selectedProduct } = values;

// Validating form fields
if (!name || !email || !address || !paymentMethod || !selectedProduct) {
  setError('All fields are required');
  return;
}

try {
  const response = await axios.post('http://localhost:8081/api/order', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data);
} catch (error) {
  console.error(error);
}
};

const handleInputChange = (e) => {
const { name, value } = e.target;
setValues((prevValues) => ({
...prevValues,
[name]: value,
}));
};

const handleSelectedProduct = (product) => {
setValues((prevValues) => ({
...prevValues,
selectedProduct: product,
}));
};
const { name, email, address, paymentMethod, selectedProduct } = values;

return (
<div className="container">
{selectedProduct ? (
<div>
<h2>Product: {selectedProduct.name}</h2>
<p>Description: {selectedProduct.description}</p>
</div>
) : (
<LandingPage setSelectedProduct={handleSelectedProduct} />
)}
  <form onSubmit={handleSubmit} className="form">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="address">Shipping Address:</label>
      <textarea
        id="address"
        name="address"
        value={address}
        onChange={handleInputChange}
        required
      ></textarea>
    </div>

    <div className="form-group">
      <label htmlFor="paymentMethod">Payment Method:</label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        value={paymentMethod}
        onChange={handleInputChange}
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

