# Food E-commerce Backend Application

This repository contains the source code for a Node.js-based backend application for a food delivery service. This backend provides the necessary functionalities to manage restaurants, menu items, orders, and user accounts for a food delivery platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Initial Values](#Initial-Values)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)


## Prerequisites

Before setting up and running this application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [mySQL Work Bench](https://dev.mysql.com/downloads/workbench/) (Ensure the mySQL server is running)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/samsonOdunola/saas-foodxcommerce-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd saas-foodxcommerce-project
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

- **api/v1/staff**:
  - POST: Creates a new staff.

- **/api/v1/staff/?email&token**:
  - GET: Verify a staff by email and token. 

- **/api/v1/staff/login**:
  - GET: Logs in a staff and issue a token.  

- **/api/v1/staff/all**:
  - GET: Retrieve all staffs.  

- **/api/v1/staff/:userId**:
  - PUT: Modifies a staff.
  - DELETE: Delletes a staff.
  - GET: Finds a staff by ID

- **/api/v1/staff/password/:userId**:
  - PUT: Resets a staff password  

- **/api/v1.staff/roler**:
  - POST: Creates a new Role

- **/api/v1/staff/role/permission/:roleId**:
  - POST: Add permissions to a role.
  - PUT: Updates Permissions for a role

Please refer to the [swagger documentation](http://localhost:3000/api-docs/) after running the application for detailed information API endpoints.

## Database Schema

The application uses mySQL as its database. The schema for the database can be found in the `models` directory.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes. 