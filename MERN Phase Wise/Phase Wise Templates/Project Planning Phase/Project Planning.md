# 📅 Project Planning

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026
**Team Size:** Individual Project

---

## 1. Project Goal

Deliver a fully functional, production-ready MERN stack e-commerce web application with customer-facing shopping features and a complete admin management dashboard.

---

## 2. Development Milestones

| Phase | Milestone | Target Date | Status |
|:--|:--|:--|:--|
| Phase 1 — Setup | Initialize Vite React app + Express API + MongoDB connection | Week 1 | ✅ Complete |
| Phase 2 — Auth | User register/login, JWT middleware, bcrypt password hashing | Week 1 | ✅ Complete |
| Phase 3 — Products | Product schema, CRUD APIs, catalog page with search & filters | Week 2 | ✅ Complete |
| Phase 4 — Cart | Cart schema, Redux `cartSlice`, LocalStorage persistence | Week 2 | ✅ Complete |
| Phase 5 — Orders | Checkout flow, Order schema, order placement, order history | Week 3 | ✅ Complete |
| Phase 6 — Admin | Admin dashboard, product/order/user management, stats API | Week 3 | ✅ Complete |
| Phase 7 — UI Polish | Dark theme CSS, animations, responsive design, mobile layouts | Week 4 | ✅ Complete |
| Phase 8 — Wishlist | Wishlist Redux slice, wishlist page, heart icon on product cards | Week 4 | ✅ Complete |
| Phase 9 — Reviews | Product review form, star rating, average rating calculation | Week 4 | ✅ Complete |
| Phase 10 — Docs | MERN Phase Wise documentation, README, project plan | Week 5 | ✅ Complete |

---

## 3. Sprint Breakdown

### Sprint 1 — Foundation (Week 1)
- [x] Setup monorepo structure (`client/` + `server/`)
- [x] Configure Vite + React 19 + React Router v6
- [x] Configure Express server with ES Modules
- [x] Connect MongoDB Atlas via Mongoose
- [x] Create `User` Mongoose model with bcrypt pre-save hook
- [x] Implement `POST /api/auth/register` and `POST /api/auth/login`
- [x] Create JWT `protect` middleware
- [x] Create Redux `authSlice` with localStorage token persistence
- [x] Build Login and Register pages

### Sprint 2 — Core Shopping (Week 2)
- [x] Create `Product` Mongoose model
- [x] Implement `GET /api/products` with search, category, price, and sort params
- [x] Implement `GET /api/products/:id` for product detail
- [x] Create Redux `productSlice` for catalog state
- [x] Build `Home.jsx`, `ProductList.jsx`, `ProductDetail.jsx`
- [x] Create Redux `cartSlice` with LocalStorage sync
- [x] Build `Cart.jsx` with quantity controls and total calculation (₹ + GST)
- [x] Build `ProductCard.jsx` component with hover animations

### Sprint 3 — Checkout & Admin (Week 3)
- [x] Create `Order` Mongoose model
- [x] Implement `POST /api/orders` — create order, decrement stock
- [x] Implement `GET /api/orders/my-orders` — customer order history
- [x] Build Checkout multi-step form with shipping address
- [x] Create `admin` middleware (role check)
- [x] Implement all Admin API endpoints (`/api/admin/*`)
- [x] Build Admin Dashboard with stats cards and recent orders
- [x] Build Admin Products management (form + table + CRUD)
- [x] Build Admin Orders management (status toggle)
- [x] Build Admin Users management (list + delete)

### Sprint 4 — Polish & Docs (Week 4-5)
- [x] Wishlist feature with Redux `wishlistSlice`
- [x] Product review submission and display
- [x] Featured products section on homepage
- [x] Complete dark theme CSS with CSS custom properties
- [x] Responsive mobile layouts
- [x] MERN Phase Wise documentation
- [x] Update README.md with setup instructions

---

## 4. Risk Register

| Risk | Probability | Impact | Mitigation |
|:--|:--|:--|:--|
| MongoDB Atlas connectivity issues | Low | High | Use local MongoDB as fallback during development |
| JWT token expiry breaking UX | Low | Medium | Implement Axios interceptor for 401 → redirect to login |
| Image uploads failing on deployment | Medium | Medium | Use local `/uploads/` dir with Cloudinary as production fallback |
| Redux state bloat with large catalogs | Low | Low | Paginate product API responses (10 per page) |
