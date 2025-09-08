# m_moneM-money Application
===================

M-money is a web application for handling money transfers with currency conversion, built with a Node.js/Express, MySQL, Prisma backend and an optional React and TailwindCSS frontend. This README provides instructions for running the backend, testing, using Postman collections, and accessing Swagger APIs, along with optional frontend setup.

Prerequisites
-------------

*   **Node.js**: v18 or higher
    
*   **npm**: v7 or higher
    
*   **PostgreSQL**: For the database (configured via Prisma)
    
*   **Postman**: For API testing
    
*   **Git**: For cloning the repository
    

    

Backend Setup
-------------
### Clone the Repository
``` 
git clone https://github.com/tichzvidzayi/m_money.git   
```

### Navigate Directory
``` 
cd  m_money/backend  
```


### Install dependencies
``` 
npm install
```


### Rename .env.example and configure envs
``` 
  DATABASE_URL="postgresql://:@:/"  PORT=3030  JWT_SECRET=
```

### Setup Prisma
``` 
 npx prisma migrate dev --name init 
```

### Run the m-money server
``` 
 npm run dev
```



The server will run on the port specified in .env (default: 3030). You’ll see a message like:

" Mmoney Server running on port => 3030. Started at 1:31 PM SAST, Monday, September 8, 2025 " 

Testing the Backend
-------------------

### Unit Tests

Run unit tests using Jest (ensure jest is installed):
``` 
 npm test
```

Add test scripts to package.json if not already present: "scripts": {    "test": "jest"  }   `



### API Testing with Postman

1.  **Import Postman Collection**:
    
    *   Download the Postman collection file (e.g., mmoney.postman\_collection.json) from the repository (if provided).
        
    *   Import it into Postman via File > Import.
        
2.  **Test Endpoints**:
    
    *   **Register**: POST /auth/register with body { "email": "user@example.com", "password": "password123" }
        
    *   **Login**: POST /auth/login with body { "email": "user@example.com", "password": "password123" }
        
    *   **Refresh Token**: POST /auth/refresh with body { "refreshToken": "" }
        
    *   **Create Transaction**: POST /transactions with body { "amount": 100, "recipient": "recipient@example.com", "currency": "USD" } (requires Bearer token)
        
    *   **Get Transactions**: GET /transactions?page=1&limit=10 (requires Bearer token)
        
3.  **Environment Variables in Postman**:
    
    *   Set baseUrl to http://localhost:3030 and token for the Bearer token received from login.
        

Swagger API Documentation
-------------------------

Access the Swagger UI to explore and test APIs:

1.  Start the backend server.
    
2.  Open a browser and navigate to http://localhost:3030/api-docs.
    
3.  Use the Swagger interface to test endpoints like /auth/register, /auth/login, /transactions, etc.
    
4.  Ensure the swagger.json file is correctly configured in the swagger directory.
    

Optional: Frontend Setup
------------------------

### 1\. Navigate to Frontend Directory

### Navigate to Frontend
``` 
cd  m_money/frontend  
```


### Install dependencies
``` 
npm install
```

### Install dependencies
``` 
npm install
```


### 3\. Configure Axios, file

```
import axios from 'axios';  
const api = axios.create({    baseURL: 'http://localhost:3030',  });  
withCredentials: true, 
export default api;   `

```


### Run m-money frontend
``` 
npm start
```
this should start the server and direct your browser to the landing page, where you can register or login.




### 6\. Access the Application

*   Open http://localhost:3000 in your browser.
    
*   Register or log in to access the transaction page.
    
*   Use the “Send Money” form to create transactions and view them in the transaction table.
    

Project Structure
-----------------

*   **Backend**:
    
    *   app.js: Main Express app configuration
        
    *   server.js: Server startup with dynamic port allocation
        
    *   services/transaction.js: Transaction calculation logic
        
    *   routes/: Authentication and transaction routes
        
    *   prisma/: Database schema and migrations
        
*   **Frontend** (optional):
    
    *   src/components/: React components (Navbar.js, Login.js, Register.js, Transactions.js)
        
    *   src/AuthProvider.js: Authentication context
        
    *   src/axios.js: Axios instance for API calls
        

Notes
-----

*   Ensure the backend is running before starting the frontend (e.g. MySQL , backend server).
    
*   The frontend uses Tailwind CSS for styling, configured in package.json.
    
*   CORS is configured to allow requests from http://localhost:3000 to http://localhost:3005.
    
*   Use a secure JWT secret in production.
    
