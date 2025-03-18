# Node.js API with Express and Prisma  last node.js lab

##  Project Overview

This is API built using **Node.js**, **Express.js**, and **Prisma ORM**. It includes authentication, posts, and a comment system.

---

## 🔧 Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/N0URHAN01/Blog_API_nodejs_lastlab
cd Blog_API_nodejs_lastlab
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file and add:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Initialize Prisma and run database migrations

```sh
npx prisma migrate dev --name init
```

### 5️⃣ Generate Prisma Client

```sh
npx prisma generate
```

### 6️⃣ Start the server

```sh
npm run dev  
```

---

## 📦 Installed Dependencies

the main dependencies used in this project install it if don't have node_modules :

```sh
npm install express prisma @prisma/client dotenv jsonwebtoken bcrypt cors multer
```

### Development Dependencies

```sh
npm install --save-dev nodemon
```

---

##  API Endpoints

### Auth Routes

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/users/register` | Register a new user        |
| POST   | `/api/users/login`    | Log in and receive a token |

###  User Routes

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | `/api/users` | Get all users |

###  Post Routes

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/posts`     | Get all posts    |
| GET    | `/api/posts/:id` | Get a post by ID |
| POST   | `/api/posts`     | Create a post    |
| PATCH  | `/api/posts/:id` | Update a post    |
| DELETE | `/api/posts/:id` | Delete a post    |

### Comment Routes

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | `/api/posts/:postId/comments` | Get comments for a post |
| GET    | `/api/comments/:id`           | Get a specific comment  |
| POST   | `/api/posts/:postId/comments` | Add a comment to a post |
| PATCH  | `/api/comments/:id`           | Update a comment        |
| DELETE | `/api/comments/:id`           | Delete a comment        |

---

## Author

 by **Nourhan Mohammed Shaban** 

