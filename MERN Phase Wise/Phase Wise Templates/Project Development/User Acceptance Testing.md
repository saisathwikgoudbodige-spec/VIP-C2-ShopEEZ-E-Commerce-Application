# 🧪 User Acceptance Testing (UAT) — Functional Specification

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. Overview

This document defines the User Acceptance Testing (UAT) checklist for ShopEEZ. Each test case validates that the implemented feature meets the defined acceptance criteria from the customer and administrator perspectives.

---

## 2. Customer Journey — Test Cases

| TC# | Feature | Test Steps | Expected Result | Status |
|:--|:--|:--|:--|:--|
| TC-01 | User Registration | Navigate to `/register`, fill name/email/password, click Register | Account created, JWT received, redirected to homepage | ✅ Pass |
| TC-02 | User Login | Navigate to `/login`, enter credentials, click Login | JWT stored in localStorage, user name visible in Navbar | ✅ Pass |
| TC-03 | Browse Products | Open `/products` page | Product cards load with name, price (₹), brand, rating | ✅ Pass |
| TC-04 | Search by Keyword | Type "laptop" in search bar | Results filtered to matching products in real time | ✅ Pass |
| TC-05 | Category Filter | Click "Electronics" filter in sidebar | Only Electronics products shown | ✅ Pass |
| TC-06 | Price Range Filter | Set min ₹500, max ₹10,000 | Products filtered within price band | ✅ Pass |
| TC-07 | Product Detail Page | Click any product card → Product Detail at `/product/:id` | Images, description, price (₹), stock count, rating displayed | ✅ Pass |
| TC-08 | Add to Cart | Click "Add to Cart" on product detail page | Toast notification shown, cart item count updated in Navbar | ✅ Pass |
| TC-09 | Cart Persistence | Add item to cart, refresh browser | Cart items still present (LocalStorage) | ✅ Pass |
| TC-10 | View Cart | Click Cart icon → `/cart` | Items list with quantity controls, subtotal, tax (18% GST), total in ₹ | ✅ Pass |
| TC-11 | Update Cart Quantity | Change quantity of item in cart | Totals recalculate automatically | ✅ Pass |
| TC-12 | Remove from Cart | Click Remove on a cart item | Item removed, totals recalculate | ✅ Pass |
| TC-13 | Checkout | Click "Proceed to Checkout" → fill shipping address → Place Order | Order success page shown at `/order-success` | ✅ Pass |
| TC-14 | Order History | Navigate to `/orders` | List of past orders with `orderStatus` and `paymentStatus` | ✅ Pass |
| TC-15 | Profile Update | Navigate to `/profile`, update address/phone, save | Profile saved and reflected on next login | ✅ Pass |
| TC-16 | Wishlist | Click heart icon on product, navigate to `/wishlist` | Product in wishlist, persists after refresh | ✅ Pass |
| TC-17 | Logout | Click Logout in user menu | JWT cleared, redirected to home, cart cleared from memory | ✅ Pass |

---

## 3. Admin Panel — Test Cases

| TC# | Feature | Test Steps | Expected Result | Status |
|:--|:--|:--|:--|:--|
| TC-18 | Admin Login | Login with admin credentials | Redirected to `/admin/dashboard` | ✅ Pass |
| TC-19 | Dashboard Stats | Open `/admin/dashboard` | Cards show Total Products, Orders, Revenue (₹), Users, Low Stock Alerts, Recent Orders | ✅ Pass |
| TC-20 | Add Product | `/admin/products` → Fill form → Upload images → Submit | New product appears in database and product catalog | ✅ Pass |
| TC-21 | Edit Product | Click edit on product → change price → save | Updated product reflected on storefront | ✅ Pass |
| TC-22 | Delete Product | Click delete on product → confirm | Product removed from database and catalog | ✅ Pass |
| TC-23 | View Orders | Navigate to `/admin/orders` | All orders listed with customer name, total, and status | ✅ Pass |
| TC-24 | Update Order Status | Change status from `processing` → `shipped` | Status updated in MongoDB, visible to customer | ✅ Pass |
| TC-25 | Manage Users | Navigate to `/admin/users` | List of registered customers with email, join date | ✅ Pass |
| TC-26 | Delete User | Click delete on a non-admin user | User removed from database | ✅ Pass |
| TC-27 | Block Admin Delete | Attempt to delete an admin account | Error: "Cannot delete an admin user" (400 response) | ✅ Pass |

---

## 4. Security — Test Cases

| TC# | Scenario | Test Steps | Expected Result | Status |
|:--|:--|:--|:--|:--|
| TC-28 | Unauthenticated Cart Access | Visit `/cart` without login | Redirected to `/login` by ProtectedRoute | ✅ Pass |
| TC-29 | Unauthenticated Admin Access | Visit `/admin/dashboard` without login | Redirected to `/login` | ✅ Pass |
| TC-30 | Non-Admin Admin Access | Login as regular user, visit `/admin/dashboard` | Access denied, redirected to homepage | ✅ Pass |
| TC-31 | API Without Token | `GET /api/admin/dashboard` without Authorization header | 401 Unauthorized JSON response | ✅ Pass |
| TC-32 | Password Storage | Register and check MongoDB `users` collection | Password stored as bcrypt hash, never plain text | ✅ Pass |
