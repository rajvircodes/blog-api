# 📝 Blog Application Backend API

A RESTful API built with Node.js, Express, MongoDB, and JSON Web Tokens (JWT).

## 🚀 Features

- **User Authentication:** Registration, Login with bcrypt hashing, JWT issuance.
- **Route Protection:** Custom Bearer token middleware.
- **Post Management:** CRUD operations with owner-only mutation security (`PUT`/`DELETE`).
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
