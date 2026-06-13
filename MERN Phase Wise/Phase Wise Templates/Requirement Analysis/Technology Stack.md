# 🛠️ Technology Stack

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. MERN Stack Overview

ShopEEZ is built entirely on the **MERN Stack** — a JavaScript-first full-stack technology combination that enables a single language (JavaScript/Node.js) across the entire application.

```
M — MongoDB       →  Database (NoSQL, document-based)
E — Express.js    →  Backend Web Framework (REST API)
R — React.js      →  Frontend UI Library (SPA)
N — Node.js       →  JavaScript Runtime (server-side)
```

---

## 2. Complete Technology Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|:--|:--|:--|
| **React** | 19.x | Component-based UI library |
| **Vite** | Latest | Build tool with fast HMR |
| **React Router DOM** | v6 | Client-side routing (nested routes, protected routes) |
| **Redux Toolkit** | Latest | Global state management (cart, auth, products, wishlist) |
| **React Redux** | Latest | React bindings for Redux store |
| **Axios** | Latest | HTTP client with JWT interceptor for API calls |
| **Vanilla CSS** | — | Custom dark-theme design system with CSS custom properties |
| **Google Fonts** | — | Typography (Inter / Poppins) |

### ⚙️ Backend

| Technology | Version | Purpose |
|:--|:--|:--|
| **Node.js** | 18.x+ | JavaScript runtime environment |
| **Express.js** | 4.x | REST API web framework |
| **ES Modules** | — | `import/export` syntax (`"type": "module"` in `package.json`) |
| **jsonwebtoken** | Latest | JWT generation and verification |
| **bcryptjs** | Latest | Password hashing (salt rounds: 10) |
| **Multer** | Latest | Multi-file upload middleware for product images |
| **dotenv** | Latest | Environment variable management |
| **CORS** | Latest | Cross-Origin Resource Sharing policy |

### 🗄️ Database

| Technology | Version | Purpose |
|:--|:--|:--|
| **MongoDB Atlas** | Latest | Cloud-hosted NoSQL database cluster |
| **Mongoose** | 7.x | ODM — schema definition, validation, relationships |

---

## 3. API Architecture

All backend API endpoints follow the `/api/<resource>` RESTful pattern:

| Base Path | Description | Auth Required |
|:--|:--|:--|
| `GET/POST /api/auth/*` | Registration, login, profile management | Partially |
| `GET /api/products/*` | Product catalog, search, categories, featured | Public |
| `GET/POST /api/cart/*` | Cart management | 🔒 JWT Required |
| `GET/POST /api/orders/*` | Order placement and history | 🔒 JWT Required |
| `ALL /api/admin/*` | Admin CRUD for products, orders, users | 🛡️ Admin JWT Required |

---

## 4. Development Tools

| Tool | Purpose |
|:--|:--|
| **VS Code** | Primary code editor |
| **Git + GitHub** | Version control and remote repository |
| **Postman** | API testing and debugging |
| **MongoDB Compass** | Local MongoDB database GUI |
| **npm** | Package manager for both client and server |

---

## 5. Project Scripts

```bash
# Run both client and server together (from root)
npm run dev

# Run only the backend server
npm run dev:server

# Run only the frontend client
npm run dev:client

# Seed the database with sample products and admin user
node server/seed.js
```

---

## 6. Environment Configuration (`.env`)

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopez
JWT_SECRET=shopez_super_secret_key_12345
PORT=5000
NODE_ENV=development
```

> ⚠️ The `.env` file is excluded from Git via `.gitignore` and must be created manually after cloning.
