# Node.js + MongoDB Module Final Project

## 📌 About the Project

This project is a **REST API** built using `Node.js` and `MongoDB`. It allows users to manage an online business card system where users can create, edit, and delete cards. The project also supports authentication, authorization, and role-based access control.

## 🛠 Key Features

✅ User registration & login with encrypted passwords.

✅ Role-based access control (admin, business user, non-business user, guest).

✅ Full CRUD operations for users & business cards.

✅ Joi validation for input data.

✅ Secure authentication with JWT.

✅ File logging for errors.

## 🚀 Technologies Used

- **Node.js** – Backend framework
- **Express.js** – API routing
- **MongoDB + Mongoose** – Database
- **Joi** – Input validation
- **bcryptjs** – Password hashing
- **jsonwebtoken (JWT)** – Authentication
- **dotenv** – Environment variables
- **morgan** – Logger
- **CORS** – Cross-Origin requests handling

## 🔧 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GaashDaniel/nodejs-mongodb-module-final-project
   cd nodejs-mongodb-module-final-project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - You need to obtain the `.env.dev` and `.env.prod` files from the project owner.
   - Place them in the root directory of the project.

4. **Run the project (Windows users):**

   ```bash
   $env:NODE_ENV="development"; nodemon app.js   # Development Mode
   $env:NODE_ENV="production"; nodemon app.js    # Production Mode
   ```

   **Run the project (Mac/Linux users):**

   ```bash
   NODE_ENV=development nodemon app.js   # Development Mode
   NODE_ENV=production nodemon app.js    # Production Mode
   ```

## 🔄 API Endpoints

### 🟢 Users Routes

| Method | Endpoint       | Access     | Description                   |
| ------ | -------------- | ---------- | ----------------------------- |
| POST   | `/users`       | Public     | Register new user             |
| POST   | `/users/login` | Public     | Authenticate user & get token |
| GET    | `/users`       | Admin      | Get all users                 |
| GET    | `/users/:id`   | Admin/User | Get user by ID                |
| PUT    | `/users/:id`   | User       | Edit user profile             |
| PATCH  | `/users/:id`   | User       | Change `isBusiness` status    |
| DELETE | `/users/:id`   | Admin/User | Delete user                   |

### 🟢 Cards Routes

| Method | Endpoint          | Access        | Description       |
| ------ | ----------------- | ------------- | ----------------- |
| GET    | `/cards`          | Public        | Get all cards     |
| GET    | `/cards/my-cards` | User          | Get user's cards  |
| GET    | `/cards/:id`      | Public        | Get card by ID    |
| POST   | `/cards`          | Business User | Create a new card |
| PUT    | `/cards/:id`      | Owner         | Edit a card       |
| PATCH  | `/cards/:id`      | User          | Like a card       |
| DELETE | `/cards/:id`      | Owner/Admin   | Delete a card     |

## 🔐 Authentication & Authorization

- Users must register and login to get a JWT token.
- Certain routes are restricted based on roles (`admin`, `business`, `user`).
- `isBusiness` flag determines if a user can create business cards.

## 📜 Error Handling & Logging

- **Error Handling:**
  - Uses a global error handler (`utils/handle-errors.js`).
  - Invalid requests return proper HTTP status codes.
- **Logging:**
  - `morgan` logs API requests in the console.
  - A file logger saves `400+` errors in `logs/errors.log`.

## 📂 Project Structure
```
nodejs-mongodb-module-final-project/
│── config/          # Configuration files
│── controllers/     # Route controllers
│── middleware/      # Express middleware
│── models/         # Mongoose models
│── routes/         # Express routes
│── utils/          # Utility functions
│── logs/           # Log files
│── .env.dev        # Development environment variables
│── .env.prod       # Production environment variables
│── app.js          # Main application file
│── package.json    # Project dependencies
│── README.md       # Project documentation
```

## Credits
- Developed by [**Gaash Web Solutions**](https://gaashdaniel.github.io/Gaash-Web-Solutions/), as part of an advanced Node.js project for a full-stack development course.
- Built with Node.js, Express.js, and MongoDB.