# Functional Specification Document (FSD) — ShopEEZ

This document serves as the complete functional specification for **ShopEEZ**, detailing all application modules, data models, API endpoints, and screen flows.

---

## 1. Document Overview
- **Project Name**: ShopEEZ E-Commerce Platform
- **Architecture**: Decoupled MERN Client-Server Model
- **Goal**: Provide a responsive, high-performance shopping portal and administrative panel with persistent local storage caching.

---

## 2. System Architecture & Modules

### 👤 2.1 Customer Portal Modules
1. **Catalog Interface**: Home catalogs displaying product listings, search queries, and price/rating sorting.
2. **Details Portal**: Displays product descriptions, ratings, stock counts, and brand summaries.
3. **Cart Slices**: Stores quantities, increases/decreases values, and computes GST and shipment charges.
4. **Checkout Interface**: Enforces address forms completion and processes orders.

### 🛠️ 2.2 Administrator Portal Modules
1. **Analytics Dashboard**: Renders statistics showing user registrations, transaction history, and stock alerts.
2. **Product Controls (CRUD)**: Permits adding new inventory products and deleting or editing catalog information.
3. **Orders Manager**: Details transaction steps and updates shipping tracking status.

---

## 3. Database Schema Models

### 👤 3.1 User Schema (`User.js`)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed via Bcrypt)
- `role` (String, enum: `['user', 'admin']`, default: `'user'`)
- `avatar` (String)
- `address` (Object: `street`, `city`, `state`, `pincode`, `country`)
- `phone` (String)

### 📦 3.2 Product Schema (`Product.js`)
- `name` (String, required)
- `description` (String)
- `price` (Number, required)
- `discountPrice` (Number)
- `category` (String, required)
- `brand` (String)
- `stock` (Number, default 0)
- `images` (Array of Strings)
- `ratings` (Number, default 0)
- `numReviews` (Number, default 0)
- `seller` (String)
- `isFeatured` (Boolean)
- `tags` (Array of Strings)

### 🛒 3.3 Cart Schema (`Cart.js`)
- `user` (ObjectId ref User, required)
- `items` (Array of objects: `product` ref Product, `quantity`, `price`)
- `totalPrice` (Number, required)

### 💳 3.4 Order Schema (`Order.js`)
- `user` (ObjectId ref User, required)
- `items` (Array: `product` ref Product, `name`, `image`, `quantity`, `price`)
- `shippingAddress` (Object: `street`, `city`, `state`, `pincode`, `country`)
- `paymentMethod` (String, required)
- `paymentStatus` (String, enum: `['pending', 'paid', 'failed']`, default: `'pending'`)
- `orderStatus` (String, enum: `['processing', 'shipped', 'delivered', 'cancelled']`, default: `'processing'`)
- `totalAmount` (Number, required)
- `paidAt` (Date)
- `deliveredAt` (Date)

---

## 🌐 4. API Endpoints Specification

### 🔐 4.1 Authentication API
- `POST /api/auth/register` — Register a new account.
- `POST /api/auth/login` — Authenticates credentials and returns user payload + JWT.
- `GET /api/auth/profile` — Retrieves the authenticated profile (requires JWT).
- `PUT /api/auth/profile` — Modifies address or password settings.

### 📦 4.2 Products API
- `GET /api/products` — Fetch all products (supports filtering, sorting, and search query parameters).
- `GET /api/products/:id` — Fetch specific product details.

### 🛒 4.3 Cart API
- `GET /api/cart` — Retrieves user's cart (requires JWT).
- `POST /api/cart` — Adds or updates item quantities.
- `DELETE /api/cart/:productId` — Removes a product from the cart.

### 💳 4.4 Orders API
- `POST /api/orders` — Submits a checkout order.
- `GET /api/orders/my-orders` — Returns user's order history list.
- `GET /api/orders/:id` — Details a specific order.

### 🛠️ 4.5 Admin API (Requires Admin JWT)
- `GET /api/admin/stats` — Returns Total Sales, Users Count, Orders Count, and low-stock alerts.
- `POST /api/admin/products` — Create a new product.
- `PUT /api/admin/products/:id` — Edit an existing product details.
- `DELETE /api/admin/products/:id` — Remove a product from the catalog.
- `GET /api/admin/orders` — List all user transactions.
- `PUT /api/admin/orders/:id` — Toggle order states.
