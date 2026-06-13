# 📌 Define Problem Statements

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. Customer Problem Statements

### Problem 1 — Poor Mobile Shopping Experience
**Context:** Most consumers browse products on mobile devices.
**Problem:** Generic e-commerce UIs use cluttered desktop-first layouts that break on smaller screens, leading to high cart abandonment rates.
**Impact:** Potential customers leave before completing a purchase.
**ShopEEZ Solution:** Fully responsive Vanilla CSS Flexbox/Grid layout that adapts cleanly from 320px mobile to 1440px+ desktop viewports.

---

### Problem 2 — Lost Shopping Cart on Browser Refresh
**Context:** Users add items to their cart, leave, or refresh the page.
**Problem:** Cart state is lost on session expiry or page reload when stored only in memory.
**Impact:** Customers have to re-find and re-add items — frustrating experience.
**ShopEEZ Solution:** Redux Toolkit `cartSlice` persists the entire cart to `localStorage` automatically. When a user logs in, their cart is also synced to their MongoDB cart document.

---

### Problem 3 — Lack of Product Discoverability
**Context:** Stores with 50+ products need powerful browsing tools.
**Problem:** No filtering or search means users scroll endlessly.
**Impact:** Low product discovery → low conversion.
**ShopEEZ Solution:** Full-text search across product names and descriptions, plus live-filtering by category, price range, rating, and sorting (price asc/desc, newest).

---

## 2. Administrator Problem Statements

### Problem 4 — Complex or Decoupled Inventory Management
**Context:** Store admins need to update prices, stock levels, and product images regularly.
**Problem:** Most admin panels are either overly complex or disconnected from the live storefront.
**Impact:** Delays in product updates, mismatched stock counts, and missed sales.
**ShopEEZ Solution:** An integrated, dedicated Admin Dashboard at `/admin/dashboard` with direct CRUD over the MongoDB `products` collection and real-time order status controls.

### Problem 5 — No Visibility into Order Fulfillment
**Context:** Admins need to track which orders are being processed, shipped, or delivered.
**Problem:** Without a centralized order management view, fulfillment is manual and error-prone.
**Impact:** Delayed shipments and frustrated customers.
**ShopEEZ Solution:** `/admin/orders` page displays all orders with customer details and a status toggle (`processing → shipped → delivered → cancelled`), updating the `orderStatus` field in MongoDB directly.
