# Truck-Manager-Web-Application
Web application for managing truck departure time

# Project Setup

This repository contains both frontend and backend components. To ensure the proper functioning of both, you need to install the necessary npm node modules. Follow the steps below for each component:

## Frontend (React)

1. Initialize a new React app by running the following command:

    ```bash
    npx create-react-app my-app-name
    ```

    Replace `my-app-name` with the desired name for your React application.

2. Replace the frontend files in this repository with the ones generated in your React application.

3. Navigate to the frontend directory:

    ```bash
    cd my-app-name
    ```

4. Install the required npm modules:

    ```bash
    npm install
    ```

## Backend (Express)

1. Install the Express Generator globally by running the following command:

    ```bash
    npm install -g express-generator
    ```

2. Generate a new Express application:

    ```bash
    express
    ```

    This will create a new Express app in the current directory.

3. Replace the backend files in this repository with the ones generated in your Express application.

4. Navigate to the backend directory:

    ```bash
    cd your-express-app-name
    ```

5. Install the required npm modules:

    ```bash
    npm install
    ```

Ensure that you follow these steps for both the frontend and backend components. Once the npm modules are installed, your project should be set up correctly. You can then proceed to run your applications using the respective commands for React and Express.


## To Start Truck Manager App

To run the Truck Manager program, make sure the truck_backend is running:
1. Run the following command: `nodemon .\app.js`

Then, run the frontend using the following steps:
1. Navigate to the truck_frontend directory in your terminal.
2. Run the following command: `npm start`

## Dependencies

Make sure to install the following dependencies before running the programs:

```bash
Express Dependencies:
npm install -g nodemon
npm install --save-dev nodemon
npm i @hapi/joi
npm i pug
npm install axios
npm install cors

React Dependencies:
npm install react-bootstrap bootstrap
npm install axios
```
