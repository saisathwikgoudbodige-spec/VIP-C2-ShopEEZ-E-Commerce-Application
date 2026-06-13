# Solution Requirements — ShopEEZ

This document catalogs the technical constraints and features needed to build and run the **ShopEEZ** platform.

---

## ⚙️ Functional Requirements

### 1. Account & Security Module
- Enforce unique email registrations.
- Encrypt passwords using Salt factors (Bcrypt) before saving to databases.
- Restrict admin endpoints to profiles holding the `admin` role using routing middleware.

### 2. Search & Catalog Module
- Render products cards containing Name, Brand, Category, Image, Price, and Ratings.
- Support live search queries filtering product collections based on name or description text matches.
- Sort catalog lists by Price (low to high, high to low) and New Arrivals (timestamp descending).

### 3. Cart & Ordering Module
- Allow customers to edit quantities directly in the cart, recalculating totals instantly.
- Lock checkout buttons if cart items exceed current product inventory stock levels.
- Track order items, status (`processing`, `shipped`, `delivered`, `cancelled`), shipping details, and total amounts paid.

### 4. Admin Management Dashboard
- Provide quick summaries displaying counts of Registered Customers, Available Products, Total Revenue, and Total Orders.
- Permit direct product additions, modifications, and removals.
- Allow toggle updates to order shipping states.

---

## ⚡ Non-Functional Requirements

### 1. Performance
- Page routing transitions must execute client-side instantly via React Router (avoiding full page reloads).
- Database query responses (catalog searches, cart updates) must execute in under 300ms.

### 2. Security & Session Retention
- Active customer and admin authentication states must be persisted using JSON Web Tokens (JWT) in local storage, surviving app updates and browser tabs refreshes.

### 3. Responsiveness & UI Aesthetics
- The website must implement a responsive dark theme optimized using fluid layout structures (Vanilla CSS Flexbox/Grid) for mobile, tablet, and desktop viewports.
