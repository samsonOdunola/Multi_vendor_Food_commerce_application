# Food Multi Vendor E-commerce Backend Application

This repository contains the source code for a Node.js-based backend application for a multi vendor food delivery service. This backend provides the necessary functionalities to manage restaurants, menu items, orders, and user accounts for a food delivery platform.

## Table of Contents

- [Application Features](#application-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Initial Values](#Initial-Values)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)


## Application Features

* **RBAC(Role Based Access Control)**: Dynamic Role based access to resource which can be set by vendor.

* **Unique Delivery Authentication**: This applicaton uses a unique two step delivery method. a code is sent to the customer when an order is allowed to be delivered. The delivery person then inputs this code into the system and the delivery is confirmed.

* **Third Party Payment Facilitator**: A third party payment gateway is incoportated into this application to enable seamless access to the payment for customers.

## Prerequisites

Before setting up and running this application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [mySQL Work Bench](https://dev.mysql.com/downloads/workbench/) (Ensure the mySQL server is running)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Lampnet-Technologies/Fudex-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Fudex-Backend
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

The configuration for the application is stored in the `config` directory. You should create a `.env` file in the root of the project and set the following environment variables:

```env
PORT = 3000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = admin
DB = food_commerce_db
EMAIL_USER = email address for sending notifications
EMAIL_PASSWORD = password for email
CLIENT_ID = client id for email service
CLIENT_SECRET = client secret for email service
REFRESH_TOKEN = refresh token for email service
HOST = http://localhost
JWT_KEY = secret key for jason web token
PAYSTACK_SECRET = paystack secret key for payment
PAYSTACK_CALLBACK_URL = callback url for paystack
```

## Initial Values

Roles of Customer and Owner are populated into the database on initial run.

  * Inital Permissions:
    Permissions are defined for the roles 'Customer' and 'Owner' via the function:
    ```javascript
    await initPermissions();
    ``` 
    Note: This function should be called once and then disabled after to prevent multiple permissions entry
    

## Usage

To start the application, run the following command:

```bash
npm start
```

The server will start and listen on the port specified in your `.env` file (default is 3000).

## API Endpoints

The application provides the following API endpoints:

- **api/v1/admin/role**:
  - POST: Creates a new role for the entire application.

- **/api/v1/admin/role/:roleId**:
  - GET: Retrieve a role by Id. 

- **/api/v1/admin/role/all**:
  - GET: Returns all roles in the application.  

- **/api/v1/admin/role/permission/:roleId**:
  - POST: Add Permission to roles.  
  - GET: Returns permission assigned to role
  - PUT: Updates permission for roles

- **/api/v1/admin/category**:
  - POST: Creates categories for the system.  
  - GET: Returns all categories for the system

Please refer to the [swagger documentation](http://localhost:3000/api-docs/) after running the application for full and detailed information API endpoints.

## Database Schema

The application uses mySQL as its database. The schema for the database can be found in the `models` directory.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes. 