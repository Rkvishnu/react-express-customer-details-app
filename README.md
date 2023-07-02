 About:

 A full stack application that take the customer details and  store the user's details in a relational database and send an email to the user confirming the placement of the order


Features:

- Users are required to enter their name, email, shipping address, and payment method during the checkout process.
- Payment processing: The application supports multiple payment methods, including credit cards, debit cards, PayPal, and UPI.
- Order confirmation: Upon successful submission of the order, users receive an email confirmation with the order details.
 

Technologies Used:

1.Frontend:

- React: JavaScript library for building user interfaces.
- Axios: Promise-based HTTP client for making API requests.
 

2.Backend:
- Node.js: JavaScript runtime for executing server-side code.
- Express.js: Web application framework for handling HTTP requests and routing.
- MySQL: Relational database management system for storing customer and product data.
- Nodemailer: Library for sending emails to customers.
- dotenv: Library for managing environment variables.

3.Database:
MySQL: Relational database management system for storing customer and product data.


4.Setup and Installation
Clone the repository from GitHub.
```
git clone 
```


Navigate to the frontend with command :

```
cd fronted
npm install
npm start
```


Navigate to the backend with command :

```
cd backted
npm install
node app.js
```
5.Set up the MySQL database by executing the necessary SQL scripts (provided in the project).


6.Update the database connection configuration in the backend code to match your MySQL database settings.

 

Access the website in your browser at http://localhost:3000.

Usage

-Browse the available products on the landing page.
-Click on a product to view its details.
-Select the desired product and fill in the required customer information.
-Choose a payment method from the available options.
-Click on the "Buy Now" button to submit the order.
-If the order is successful, an email confirmation will be sent to the provided email address.
