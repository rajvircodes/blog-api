# 📝 Blog Application Backend API

A RESTful API built with Node.js, Express, MongoDB, and JSON Web Tokens (JWT).

## 🚀 Features

- **User Authentication:** Registration, Login with bcrypt hashing, JWT issuance.
- **Route Protection:** Custom Bearer token middleware.
- **Post Management:** CRUD operations with owner-only mutation security (`PUT`/`DELETE`).
- **Category Management:** CRUD endpoints with automatic slugs.
- **Data Population:** Mongoose relationship referencing for author details.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** BcryptJS, JSONWebToken, CORS

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the server folder:

```env
PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN
```
| <u>Method</u> | <u>Endpoint</u> | <u>Protected?</u> | <u>Purpose</u> |
| ----- | ----- | ----- | ----- |
| POST | `/api/v1/posts`  | Yes | Create post |
| GET | `/api/v1/posts`  | No | List all posts |
| GET | `/api/v1/posts/:id`  | No | Single post |
| PUT | `/api/v1/posts/:id`  | Yes (owner) | Edit post |
| DELETE | `/api/v1/posts/:id`  | Yes (owner) | Delete post |
| POST | `/api/v1/categories` | No | Create category |
| GET | `/api/v1/categories` | No | List categories |
| GET | `/api/v1/categories/:id` | No | Get category |
| PUT | `/api/v1/categories/:id` | No | Update category |
| DELETE | `/api/v1/categories/:id` | No | Delete category |
