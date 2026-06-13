# ✅ Solution Requirements

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. Functional Requirements

### 1.1 Authentication & Authorization
| REQ# | Requirement | API Endpoint |
|:--|:--|:--|
| FR-01 | System shall allow users to register with a unique email and password | `POST /api/auth/register` |
| FR-02 | System shall authenticate users and return a signed JWT token | `POST /api/auth/login` |
| FR-03 | System shall hash all passwords using Bcrypt before database storage | Internal — `User.js` pre-save hook |
| FR-04 | System shall expose a protected endpoint to fetch the authenticated user's profile | `GET /api/auth/me` |
| FR-05 | System shall allow users to update their profile (name, address, phone) | `PUT /api/auth/update-profile` |
| FR-06 | System shall allow users to change their password with current password verification | `PUT /api/auth/change-password` |
| FR-07 | All admin routes shall require both a valid JWT and `role === 'admin'` | `router.use(protect); router.use(admin)` |

### 1.2 Product Management
| REQ# | Requirement | API Endpoint |
|:--|:--|:--|
| FR-08 | System shall return paginated product catalog with optional search, category, price, rating, and sort filters | `GET /api/products` |
| FR-09 | System shall return a single product's full details by ID | `GET /api/products/:id` |
| FR-10 | System shall return all product categories dynamically from the database | `GET /api/products/categories` |
| FR-11 | System shall return a curated list of featured products | `GET /api/products/featured` |
| FR-12 | Admin shall be able to add a new product with up to 5 images | `POST /api/admin/products` |
| FR-13 | Admin shall be able to update any product's details and images | `PUT /api/admin/products/:id` |
| FR-14 | Admin shall be able to delete any product | `DELETE /api/admin/products/:id` |

### 1.3 Cart & Wishlist
| REQ# | Requirement | Implementation |
|:--|:--|:--|
| FR-15 | System shall persist cart state in browser LocalStorage across sessions | Redux `cartSlice` |
| FR-16 | Cart shall calculate subtotal, 18% GST tax, and shipping automatically | Redux `cartSlice` selectors |
| FR-17 | Customer shall be able to add, update quantity, and remove items from cart | Redux actions |
| FR-18 | Wishlist shall be persisted to LocalStorage | Redux `wishlistSlice` |

### 1.4 Orders
| REQ# | Requirement | API Endpoint |
|:--|:--|:--|
| FR-19 | Customer shall be able to place an order with shipping address and payment method | `POST /api/orders` |
| FR-20 | Customer shall be able to view all their past orders | `GET /api/orders/my-orders` |
| FR-21 | Admin shall see all orders in the system with customer details | `GET /api/admin/orders` |
| FR-22 | Admin shall be able to update order status (processing/shipped/delivered/cancelled) | `PUT /api/admin/orders/:id/status` |

### 1.5 Admin Dashboard
| REQ# | Requirement | API Endpoint |
|:--|:--|:--|
| FR-23 | Dashboard shall display total products, orders, users, and revenue | `GET /api/admin/dashboard` |
| FR-24 | Dashboard shall display low stock alerts (products with `stock ≤ 5`) | `GET /api/admin/dashboard` |
| FR-25 | Dashboard shall show 5 most recent orders | `GET /api/admin/dashboard` |
| FR-26 | Admin shall be able to view and delete user accounts (except other admins) | `GET /api/admin/users`, `DELETE /api/admin/users/:id` |

---

## 2. Non-Functional Requirements

| REQ# | Category | Requirement |
|:--|:--|:--|
| NFR-01 | Performance | API responses shall complete within 500ms for standard queries under normal load |
| NFR-02 | Security | JWT tokens shall be stored in `localStorage` and cleared on logout |
| NFR-03 | Security | All passwords shall be hashed with Bcrypt (salt rounds: 10) before storage |
| NFR-04 | Security | Admin endpoints shall reject non-admin requests with HTTP 403 |
| NFR-05 | Usability | UI shall be fully responsive across mobile (320px), tablet (768px), and desktop (1440px) |
| NFR-06 | Reliability | MongoDB Atlas provides automated backups and 99.9% uptime SLA |
| NFR-07 | Maintainability | Backend shall follow MVC separation: controllers, models, routes, middleware |
| NFR-08 | Scalability | Product listing shall support pagination (10 items per page) to handle large catalogs |
| NFR-09 | Accessibility | Pages shall use semantic HTML5 elements and ARIA labels for screen reader support |

---

## 3. Technology Stack Summary

| Layer | Technology | Version |
|:--|:--|:--|
| Frontend Framework | React | 19.x |
| Frontend Build Tool | Vite | Latest |
| State Management | Redux Toolkit | Latest |
| Routing | React Router DOM | v6 |
| HTTP Client | Axios | Latest |
| Styling | Vanilla CSS (Custom Properties) | — |
| Backend Runtime | Node.js | 18.x+ |
| Backend Framework | Express.js | 4.x |
| Database | MongoDB Atlas | Latest |
| ODM | Mongoose | 7.x |
| Authentication | JWT (jsonwebtoken) | Latest |
| Password Hashing | Bcryptjs | Latest |
| File Uploads | Multer | Latest |
