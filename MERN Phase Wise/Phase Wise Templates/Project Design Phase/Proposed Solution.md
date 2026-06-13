# 💡 Proposed Solution

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. Solution Overview

**ShopEEZ** is a fully decoupled, full-stack MERN e-commerce web application that provides:
- A **premium dark-themed, responsive frontend** built with React 19 + Vite + Redux Toolkit
- A **RESTful backend API** built with Node.js + Express.js (ES Modules)
- A **MongoDB Atlas cloud database** managed via Mongoose ODM
- **JWT + Bcrypt** for authentication and authorization
- A complete **Admin Dashboard** for real-time store management

---

## 2. Architecture Diagram

```
┌───────────────────────────────────┐
│    React 19 (Vite) Frontend       │
│   Redux Toolkit | React Router v6 │
│   Axios (JWT Interceptor)         │
│   Vanilla CSS (Dark Theme)        │
│   Port: 5173                      │
└────────────┬──────────────────────┘
             │ HTTP REST (JSON)
             ▼
┌───────────────────────────────────┐
│   Node.js + Express.js Backend    │
│   Routes: /api/auth               │
│           /api/products           │
│           /api/cart               │
│           /api/orders             │
│           /api/admin              │
│   Middleware: protect, admin      │
│   Port: 5000                      │
└────────────┬──────────────────────┘
             │ Mongoose ODM
             ▼
┌───────────────────────────────────┐
│       MongoDB Atlas Cluster       │
│   Collections: users, products,   │
│   orders, carts, reviews          │
└───────────────────────────────────┘
```

---

## 3. Key Design Decisions

| Decision | Choice | Reason |
|:--|:--|:--|
| Frontend build tool | **Vite** | Fast HMR (Hot Module Replacement), lightweight production builds |
| State management | **Redux Toolkit** | Predictable, scalable state for cart, auth, and product slices |
| CSS approach | **Vanilla CSS** | Full control over dark theme design variables without framework bloat |
| Auth strategy | **JWT Bearer tokens** | Stateless authentication ideal for decoupled SPA + API architecture |
| DB hosting | **MongoDB Atlas** | Managed cloud cluster with auto-scaling and built-in backups |
| Image hosting | **Local `/uploads/` + Cloudinary** | Fallback local storage during development; CDN in production |

---

## 4. Frontend Route Map

| Route | Page | Access |
|:--|:--|:--|
| `/` | Home — Featured + Catalog | Public |
| `/products` | Product List + Filters | Public |
| `/product/:id` | Product Detail | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/wishlist` | Wishlist | Public |
| `/cart` | Shopping Cart | 🔒 Auth Required |
| `/checkout` | Checkout | 🔒 Auth Required |
| `/orders` | Order History | 🔒 Auth Required |
| `/profile` | User Profile | 🔒 Auth Required |
| `/admin/dashboard` | Admin Dashboard | 🛡️ Admin Only |
| `/admin/products` | Manage Products | 🛡️ Admin Only |
| `/admin/orders` | Manage Orders | 🛡️ Admin Only |
| `/admin/users` | Manage Users | 🛡️ Admin Only |
