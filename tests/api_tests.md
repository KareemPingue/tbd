# API Tests

NOTE: You need two 2 Terminals Open.

- 1 For the Server

- 1 For the CURL Commands.

NB: You need to install CURL for Windows and add it to path OR be using a Linux Machine.

### Auth API Test Setup

For index.js, startup the node server in the same directory as index.js using the console command: 

```npm run dev```

![alt text](image-6.png)

To terminate the server, do Ctrl+C in the terminal.

![alt text](image-7.png)

### Campaign API Test Setup:

For server.py, startup the flask server in the *backend* directory, hence using the console command: 

```python -m src.server```

![alt text](image-9.png)

To terminate the server, do Ctrl+C in the terminal.

## Auth Tests:

#### 1. Login (JavaScript -> index.js)

![alt text](image-14.png)

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/login
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"newuser123@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/login
```

![alt text](image-10.png)

#### 2. Register (JavaScript -> index.js)

![alt text](image-13.png)

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/register
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"newuser123@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/register
```

![alt text](image-11.png)

### 3. Forgot Password (JavaScript -> index.js) (Mail Service -> SendGrid) (GitHub Pages Required for Testing)

NB: MAIL SERVER NOT YET SETUP

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\"}" http://localhost:5000/api/auth/forgot-password
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"newuser123@example.com\"}" http://localhost:5000/api/auth/forgot-password
```

![alt text](image-12.png)

### 4. Reset Password (JavaScript -> index.js) (Mail Service -> SendGrid) (GitHub Pages Required for Testing)

NB: MAIL SERVER NOT YET SETUP

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"token\": \"<token-from-email>\", \"newPassword\": \"NewSecurePass123\"}" http://localhost:5000/api/auth/reset-password

```

![alt text](image-15.png)

## Campaign Tests:

![alt text](image.png)

### 5. Campaign Creation (Python -> server.py) 

```sh
curl -X POST http://localhost:5000/api/campaigns -H "Content-Type: application/json" -d "{ \"name\": \"Summer Sale\", \"description\": \"Discounts on all items\", \"budget\": 5000, \"startDate\": \"2024-07-01\", \"endDate\": \"2024-07-31\", \"createdBy\": \"user123\" }"
```

![alt text](image-1.png)

### 6. Get All Campaigns (Python -> server.py) (NOTE: When testing in console, "campaigns/" sends a 404 while "campaigns" do not.)

```sh
curl -X GET http://localhost:5000/api/campaigns
```

![alt text](image-2.png)

### 7. Get Campaign by ID (Python -> server.py)

```sh
curl -X GET http://localhost:5000/api/campaigns/1
```

![alt text](image-3.png)

### 8. Update Campaign (Python -> server.py)
```sh
curl -X PUT http://localhost:5000/api/campaigns/1 -H "Content-Type: application/json" -d "{\"name\": \"Updated Spring Campaign\", \"created_by\": 1, \"status\": \"completed\", \"start_date\": \"2025-04-01\", \"end_date\": \"2025-04-30\"}"
```

![alt text](image-4.png)

### 9. Delete Campaign (Python -> server.py)

```sh
curl -X DELETE http://localhost:5000/api/campaigns/1
```

![alt text](image-5.png)

## Misc (Bulk Test Cases + TODO)

curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/register
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\", \"password\": \"securepassword\"}" http://localhost:5000/api/login
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"someone@example.com\"}" http://localhost:5000/api/auth/forgot-password
curl -X POST -H "Content-Type: application/json" -d "{\"token\": \"<token-from-email>\", \"newPassword\": \"NewSecurePass123\"}" http://localhost:5000/api/auth/reset-password

Create Campaign, Get Analytics, Create Segment & Create Email Template.


