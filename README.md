# Blog API

This project is a RESTful API for a blog application built with Node.js, Express, and MongoDB using Mongoose. The application allows users to sign up, log in, and verify their accounts. Users can create, view, and manage blogs after authentication. Tokens are used to handle user sessions, and cookies are set for the access tokens to secure routes.

## Features

### 1. User Authentication and Authorization:

- Sign up with email verification.
- Login and Logout functionality.
- Access and refresh token handling for secure session management.

### 2. Blog Management:

- Create, view, and retrieve blog posts.
- Each blog post is associated with a specific user.

### 3. Protected Routes:

- Only authenticated users can create blogs or access certain resources.

### 4. Database Integration:

- MongoDB Atlas is used as the database with Mongoose for schema definition and data handling.

## Project Structure

- **config/** - Contains environment configuration and constants.
- **controllers/** - Contains controller functions that handle HTTP requests.
- **helpers/** - Helper files for database configuration and token generation.
- **middleware/** - Middlewares for authentication.
- **models/** - Mongoose models for User and Blog collections.
- **routes/** - Express routers for user, auth, and blog routes.
- **app.js** - Initializes Express app and configures middlewares and routes.
- **server.js** - Connects to MongoDB and starts the HTTP server.

## Prerequisites

- Node.js
- MongoDB (for local development) or MongoDB Atlas URI for production.
- npm (Node Package Manager)

## Installation

### 1. Clone the repository:

```
git clone <repository-url>
cd blog-api
```

### 2. Install dependencies:

```
npm install
```

### 3. Create a .env file in the root of the project and add the following environment variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
MONGO_URI="your_mongodb_uri"
```

## Usage

### 1. Run the server:

```
npm start
```

The server will start on http://localhost:3000.

### 2. API Endpoints:

### Authentication Routes (/auth)

- POST /auth/login - Log in a user and get access and refresh tokens.
- GET /auth/logout - Log out the authenticated user.
- GET /auth/token - Generate a new access token using a valid refresh token.

### User Routes (/users)

- POST /users - Create a new user account with email verification.
- PUT /users/verify - Verify a user's account using a verification token.
- GET /users/me - Get the currently logged-in user's information.

### Blog Routes (/blogs)

- POST /blogs - Create a new blog post (requires authentication).
- GET /blogs - Get all blog posts.
- GET /blogs/:blogId - Get a specific blog post by its ID.

## Code Overview

**Environment Configuration (config/index.js)**
Loads environment variables using dotenv and exports them for use across the application.

### Models

- **User Model** (models/userModel.js): Defines the schema for user data, including fields for first name, last name, email, password, verification status, and verification token expiry.

- **Blog Model** (models/blogModel.js): Defines the schema for blog posts, including title, content, user reference, and timestamps.

### Controllers

- **Auth Controllers** (controllers/authControllers.js):

  - **loginUser:** Logs in a user, checks credentials, and generates tokens.

  - **logoutUser:** Logs out the user by clearing the access token cookie.
  - **generateAccessToken:** Generates a new access token using a refresh token.

- **User Controllers** (controllers/userControllers.js):

  - **createNewUser:** Registers a new user and generates a verification token.
  - **verifyUser:** Verifies a user’s account based on the verification token.
  - **getCurrentUser:** Fetches the logged-in user's information.

- **Blog Controllers** (controllers/blogControllers.js):

  - **createNewBlog:** Creates a new blog post for an authenticated user.
  - **getAllBlogs:** Retrieves all blog posts.
  - **getSingleBlog:** Retrieves a specific blog post by its ID.

## Helper Functions

- **generateOtp** (helpers/generateRandomToken.js): Generates a random OTP for email verification.
- **JWT Helper** (helpers/jwtHelpers.js): Provides functions to generate and verify JSON Web Tokens.

## Middleware

- requireSignin (middleware/requireSignin.js): Protects routes by verifying that a user is authenticated before granting access.

## Running Tests

To run tests, add testing scripts and configurations (e.g., using Mocha and Chai). For example:

```
npm test
```

## Error Handling

The application uses try-catch blocks to handle errors in asynchronous functions. HTTP response codes and error messages are provided to the client in case of failures.

## Postman Documentation

https://documenter.getpostman.com/view/38457070/2sAY4ydLUj

## License

This project is licensed under the MIT License.
