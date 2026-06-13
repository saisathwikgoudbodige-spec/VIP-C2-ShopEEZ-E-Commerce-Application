# 📋 Full Stack Documentation (FSD) Format

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026
**Version:** 1.0.0

---

## 1. Project Overview

**ShopEEZ** is a full-stack MERN e-commerce web application providing customers with a premium shopping experience and administrators with a comprehensive store management dashboard.

| Field | Details |
|:--|:--|
| **Project Name** | ShopEEZ |
| **Tech Stack** | MongoDB, Express.js, React 19, Node.js |
| **Authentication** | JWT Bearer Token + Bcrypt password hashing |
| **State Management** | Redux Toolkit (cartSlice, authSlice, productSlice, wishlistSlice) |
| **Database** | MongoDB Atlas (Cloud) |
| **Frontend Port** | 5173 (Vite Dev Server) |
| **Backend Port** | 5000 (Express.js) |
| **Currency** | Indian Rupee (₹) |

---

## 2. Application Features

### 2.1 Customer Features
- ✅ User Registration & JWT-secured Login
- ✅ Product Catalog with Search, Category, Price & Rating Filters
- ✅ Product Detail Page (images, specs, reviews, stock indicator)
- ✅ Shopping Cart with LocalStorage persistence
- ✅ Cart Totals: Subtotal + 18% GST Tax + Shipping
- ✅ Wishlist (Redux + LocalStorage)
- ✅ Checkout with Shipping Address Form
- ✅ Order History with Status Tracking
- ✅ Profile Management (name, address, phone, password change)
- ✅ Product Reviews & Star Ratings

### 2.2 Admin Features
- ✅ Admin Dashboard (Revenue ₹, Orders, Products, Users counts)
- ✅ Low Stock Alerts (products with `stock ≤ 5`)
- ✅ Recent Orders overview
- ✅ Product CRUD (Add/Edit/Delete with multi-image upload)
- ✅ Order Status Management (processing → shipped → delivered → cancelled)
- ✅ User Management (View all + Delete non-admin users)

---

## 3. API Endpoint Reference

### 3.1 Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth |
|:--|:--|:--|:--|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/auth/me` | Get current user's profile | 🔒 JWT |
| PUT | `/api/auth/update-profile` | Update name, address, phone | 🔒 JWT |
| PUT | `/api/auth/change-password` | Change password (verify current) | 🔒 JWT |

### 3.2 Product Endpoints (`/api/products`)

| Method | Endpoint | Description | Auth |
|:--|:--|:--|:--|
| GET | `/api/products` | Paginated list with search/filter/sort | Public |
| GET | `/api/products/featured` | List of `isFeatured: true` products | Public |
| GET | `/api/products/categories` | Distinct category list | Public |
| GET | `/api/products/:id` | Single product details | Public |
| POST | `/api/products/:id/review` | Submit a product review | 🔒 JWT |

### 3.3 Order Endpoints (`/api/orders`)

| Method | Endpoint | Description | Auth |
|:--|:--|:--|:--|
| POST | `/api/orders` | Place a new order | 🔒 JWT |
| GET | `/api/orders/my-orders` | Get authenticated user's orders | 🔒 JWT |
| GET | `/api/orders/:id` | Get single order details | 🔒 JWT |

### 3.4 Admin Endpoints (`/api/admin`) — All require Admin JWT

| Method | Endpoint | Description |
|:--|:--|:--|
| GET | `/api/admin/dashboard` | Dashboard stats: products, orders, users, revenue |
| GET | `/api/admin/products` | Paginated product list (admin view) |
| POST | `/api/admin/products` | Add new product (with image upload) |
| PUT | `/api/admin/products/:id` | Update product details |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/orders` | All orders with customer info |
| PUT | `/api/admin/orders/:id/status` | Update `orderStatus` field |
| GET | `/api/admin/users` | List all users (excluding passwords) |
| DELETE | `/api/admin/users/:id` | Delete user (non-admin only) |

---

## 4. Database Schema Reference

### 4.1 User Schema
```js
{
  name: String (required),
  email: String (unique, required),
  password: String (bcrypt hashed),
  role: 'user' | 'admin'  (default: 'user'),
  address: { street, city, state, pincode, country },
  phone: String,
  avatar: String,
  timestamps: true
}
```

### 4.2 Product Schema
```js
{
  name: String (required),
  description: String,
  price: Number (required),
  discountPrice: Number,
  category: String (required),
  brand: String,
  stock: Number (default: 0),
  images: [String],
  ratings: Number (default: 0),
  numReviews: Number (default: 0),
  isFeatured: Boolean (default: false),
  tags: [String],
  seller: String,
  timestamps: true
}
```

### 4.3 Order Schema
```js
{
  user: ObjectId → User,
  orderItems: [{ name, quantity, price, image, product: ObjectId → Product }],
  shippingAddress: { street, city, state, pincode, country },
  paymentMethod: String,
  paymentStatus: 'pending' | 'paid' | 'failed',
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled',
  totalAmount: Number,
  paidAt: Date,
  deliveredAt: Date,
  timestamps: true
}
```

---

## 5. Security Implementation

```
1. Registration:     User submits password → Bcrypt.hash(password, 10) → Store hash
2. Login:            User submits password → Bcrypt.compare(password, hash) → jwt.sign(userId)
3. Protected Route:  Client sends "Authorization: Bearer <token>" → jwt.verify() → req.user
4. Admin Route:      After protect → check req.user.role === 'admin' → proceed or 403
```

---

## 6. Setup & Installation Guide

```bash
# 1. Clone the repository
git clone https://github.com/saisathwikgoudbodige/VIP-C2-ShopEEZ-E-Commerce-Application.git
cd VIP-C2-ShopEEZ-E-Commerce-Application

# 2. Install all dependencies (root + client)
npm install
cd client && npm install && cd ..

# 3. Create environment variables file
# Create a .env file in the /server directory:
# MONGO_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=shopez_super_secret_key_12345
# PORT=5000

# 4. Seed the database with sample data
node server/seed.js

# 5. Start the development servers
npm run dev
```

**Default Credentials after seeding:**
- Admin: `admin@shopez.com` / `Admin@123`
- Customer: `user@shopez.com` / `User@123`
