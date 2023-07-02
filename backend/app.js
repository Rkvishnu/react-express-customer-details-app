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
  database: 'demo_db',
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
let testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  }
});

app.use(express.json());
app.use(cors());

app.post('/api/order', (req, res) => {
  // Customer details from the request body
  const { name, email, address, paymentMethod } = req.body;

  // Saving the customer details in the database
  const query = "INSERT INTO users (`name`, `email`, `address`, `payment_method`) VALUES (?,?,?,?)";
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
      let mailData = {
        from: ' "Vishnu  Rathore" <vishnubhn583@gmail.com>',
        to: email,
        subject: 'Order Confirmation',
        text: 'Thank you for your order!',
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          console.log('Error sending email:', error.message);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          console.log('Email sent successfully',info.messageId);
          return res.json({ message: 'Order placed successfully', });
        }
      });

    }
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
