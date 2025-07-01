# Pure Backend Mini-Project

A simple and robust backend application for a user-based platform, featuring user authentication, profile management, and a message posting system. This project is built from scratch using the MERN stack's core technologies: MongoDB, Express.js, and Node.js, with EJS as the templating engine.

## ✨ Features

- **User Authentication**: Secure user registration and login using `bcrypt` for password hashing and `jsonwebtoken` for token-based authentication.
- **Session Management**: Uses `cookie-parser` to store and manage user authentication tokens in browser cookies.
- **User Profiles**: A dedicated profile page for authenticated users.
- **Message Posting**: Authenticated users can create and post messages.
- **Data Persistence**: All user and post data is stored in a MongoDB database using Mongoose.
- **Templating**: Dynamic HTML pages are rendered on the server-side using EJS.

## 🚀 Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **Express.js**: Fast, minimalist web framework for Node.js.
- **Database**:
  - **MongoDB**: NoSQL database for storing data.
  - **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Authentication & Security**:
  - **Bcrypt**: For hashing and salting passwords.
  - **JSON Web Token (JWT)**: For creating secure access tokens.
  - **Cookie-Parser**: To parse and manage cookies.
- **Templating**:
  - **EJS (Embedded JavaScript)**: For server-side rendering of HTML views.

## 📦 Project Structure
── Model/
│   ├── user.js         # Mongoose schema and model for users
│   └── post.js         # Mongoose schema and model for posts
├── views/
│   ├── index.ejs       # Create Account / Registration page
│   ├── login.ejs       # User login page
│   └── profile.ejs     # User profile and post creation page
├── app.js              # Main application file (Express server, routes, and logic)
├── package.json        # Project metadata and dependencies
└── README.md           # This file


## ⚙️ Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure it's running locally)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the MongoDB server:**
    Ensure your MongoDB instance is running. The application connects to `mongodb://127.0.0.1:27017/miniproject` by default.

4.  **Run the application:**
    Since you are using `nodemon`, you can use the following command to start the server with auto-reloading:
    ```bash
    nodemon app.js
    ```
    or, if you don't have nodemon installed globally:
    ```bash
    npm install nodemon --save-dev
    npm run dev
    ```
    (Note: You might need to add a `dev` script in your `package.json`: `"dev": "nodemon app.js"`)

The server will start on `http://localhost:3000`.

## 🖥️ API Endpoints & Usage

### Web Routes (Server-rendered pages)

- **`GET /`**:
  - **Description**: Renders the registration/create account page.
  - **View**: `index.ejs`
- **`GET /login`**:
  - **Description**: Renders the user login page.
  - **View**: `login.ejs`
- **`GET /profile`**:
  - **Description**: Renders the user's profile page, displaying their details and posts.
  - **Access**: **Requires authentication**. If not logged in, redirects to `/login`.
  - **View**: `profile.ejs`

### API Endpoints (Form submissions)

- **`POST /register`**:
  - **Description**: Handles new user registration.
  - **Request Body**: `name`, `username`, `email`, `password`, `age`
  - **Response**:
    - `200 OK` (redirect or success message) if successful. Sets a JWT token as a cookie.
    - `500 Internal Server Error` if the user already exists.
- **`POST /login`**:
  - **Description**: Authenticates a user.
  - **Request Body**: `email`, `password`
  - **Response**:
    - `200 OK` (redirects to `/profile`) if successful. Sets a JWT token as a cookie.
    - `401 Unauthorized` for invalid credentials.
- **`POST /post`**:
  - **Description**: Creates a new post for the authenticated user.
  - **Access**: **Requires authentication**.
  - **Request Body**: `content` (the message content)
  - **Response**: Redirects to the `/profile` page upon success.
- **`GET /logout`**:
  - **Description**: Clears the authentication cookie and logs the user out.
  - **Response**: Redirects to the `/login` page.

## 🔐 Authentication Middleware

The `isLoggedIn` middleware checks for the presence of a valid JWT token in the user's cookies. If a token is found and verified, it decodes the user's data and attaches it to the `req.user` object, allowing protected routes to access user information. If no valid token is found, it redirects the user to the login page.

## ⚠️ Note on Security

- **JWT Secret**: The secret `"shhh"` used for signing JWTs is hardcoded. **For production, this should be a strong, randomly generated key stored in an environment variable (`process.env.JWT_SECRET`).**
- **Error Handling**: The error handling can be improved with more specific error messages and logging.
- **Password Hashing**: Bcrypt is correctly implemented, but ensure you are using a recent version and a good salt rounds value (10 is a good default).

---
_This README was generated for a project built with Node.js, Express, MongoDB, Mongoose, and EJS._