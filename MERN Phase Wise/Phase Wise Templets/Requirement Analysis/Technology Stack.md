# Technology Stack — ShopEEZ

This document specifies the tools, libraries, and frameworks utilized to build **ShopEEZ**.

---

## 💻 Tech Stack Blueprint

```
 ┌─────────────────────────────────────────────────────────┐
 │                  ShopEEZ Frontend (Vite + React)        │
 │   - State Management: Redux Toolkit (RTK)               │
 │   - Routing: React Router v6                            │
 │   - API Client: Axios (with JWT interceptors)           │
 │   - Styling: Vanilla CSS (Custom dark-theme variables)  │
 └────────────────────────────┬────────────────────────────┘
                              │ HTTPS REST Requests
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                  ShopEEZ Backend API (Node + Express)    │
 │   - REST Endpoints: ES Modules routing                  │
 │   - Cryptography: Bcryptjs & JWT Security               │
 │   - Middleware: Auth & Role Validators                  │
 └────────────────────────────┬────────────────────────────┘
                              │ Mongoose ODM
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                  MongoDB database Cluster               │
 │   - Storage: Document-based NoSQL collections           │
 │   - Hosting: MongoDB Atlas (Cloud)                      │
 └─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Detailed Stack Matrix

| Layer | Tool / Library | Purpose | Key Details |
| :--- | :--- | :--- | :--- |
| **Frontend** | **React 19** | View layer library for component-based rendering. | Uses functional components and React Hooks. |
| **Frontend** | **Vite** | Build tool and dev server. | Provides Hot Module Replacement (HMR). |
| **Frontend** | **Redux Toolkit** | State management library. | Manages cart count updates, user sessions, and catalog cache. |
| **Frontend** | **React Router v6** | Client-side routing library. | Maps pages paths (e.g. `/cart`, `/admin/dashboard`) without server redirects. |
| **Frontend** | **Axios** | HTTP request client. | Appends JWT headers automatically to authenticated endpoint requests. |
| **Backend** | **Node.js** | Backend JavaScript runtime. | Executes script commands and runs Express server cycles. |
| **Backend** | **Express.js** | Server routing framework. | Scaffolds REST endpoints (`/api/auth`, `/api/products`). |
| **Backend** | **JWT (JSON Web Token)** | Session token security. | Encodes authenticated session details for client-server auth verification. |
| **Backend** | **Bcrypt.js** | Password encryption. | Hashes credentials dynamically using standard salt factors. |
| **Database** | **MongoDB** | NoSQL database. | Stores records in JSON-like structures. |
| **Database** | **Mongoose** | Object Data Modeling (ODM). | Defines database document schemas and validates field constraints. |
