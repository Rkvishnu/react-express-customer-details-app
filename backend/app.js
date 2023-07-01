import mysql from 'mysql';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_db',
});

// Error handling
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

const app = express();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vishnu.eps91@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});

app.use(express.json());
app.use(cors());

app.post('/api/order', (req, res) => {
  // Customer details from the request body
  const { name, email, address, paymentMethod } = req.body;

  // Saving the customer details in the database
  const query =
    'INSERT INTO customers (name, email, address, payment_method) VALUES (?, ?, ?, ?)';
  const values = [name, email, address, paymentMethod];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.log('Error in saving customer details:', error);
      res.status(500).json({
        message: 'Failed to save customer details',
        error,
      });
    } else {
      console.log('Customer details saved successfully');

      // Sending the email confirmation to the customer's email address
      const mailData = {
        from: 'vishnu.eps91@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        text: 'Thank you for your order!',
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          console.log('Email sent successfully');
          res.json({ message: 'Order placed successfully' });
        }
      });
    }
  });
});

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
