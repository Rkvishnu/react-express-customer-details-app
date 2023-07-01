import React from 'react';
import './LandingPage.css';

const LandingPage = ({ setSelectedProduct }) => {
  const products = [
    { id: 1, name: 'Web Security', description: 'Titan HQ is an Email filtering & Email achieving SaaS business, which protects your organizational gadgets from malware, ransomware, phishing, viruses, botnets, and other cyber threats.' },
    { id: 2, name: 'Cloud Backup and Recovery', description: 'Druva delivers data protection and management for the cloud era, It is the industry’s leading SaaS platform for data resiliency cloud, Data Protection, Data governance and is the only vendor to ensure data protection across the most common data risks.' },
    { id: 3, name: 'Backup and Security', description: 'Safeguard your endpoints with SentinelOne powerful cybersecurity platform - AI-driven threat detection, autonomous response, and comprehensive endpoint protection.' }
  ];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container">
      <h2>Choose a Product</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <button onClick={() => handleProductSelect(product)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
