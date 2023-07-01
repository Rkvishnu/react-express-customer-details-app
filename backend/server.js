import express from 'express'
import mysql from 'mysql'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()


// Configure AWS SES (Simple EMail Service)
const ses_data = new AWS.SES({
  region: 'us-east-1',  
  accessKeyId: process.env.ACCESS_KEY,  
  secretAccessKey: process.env.SECRET_KEY 
});

//creating express server
const app = express();

// Configure MySQL connection
const connection = mysql.createConnection({
  host: localhost,
  user: root,
  password: '',
  database: user_db
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// app.use(express.json());

app.post('/api/submitForm', (req, res) => {

  // Get the customer details  
  const { name, email, address, paymentMethod } = req.body;

  // Saving the customer details in the database
  const query = 'INSERT INTO customers (name, email, address, payment_method) VALUES (?, ?, ?, ?)';
  const values = [name, email, address, paymentMethod];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving customer details:', error);
      res.status(500).json({ error: 'Failed to save customer details' });
    } else {
      console.log('Customer details saved successfully');

      // Send the  confirmation email to the customer's email address
      const params = {
        Source: 'vishnu.eps91@gmail.com',
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: 'Order Confirmation' },
          Body: {
            Text: { Data: 'Thank you for your order!' }
          }
        }
      };

      ses_data.sendEmail(params, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          console.log('Email sent successfully');
          res.json({ message: 'Order placed successfully' });
        }
      });
    }
  });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
