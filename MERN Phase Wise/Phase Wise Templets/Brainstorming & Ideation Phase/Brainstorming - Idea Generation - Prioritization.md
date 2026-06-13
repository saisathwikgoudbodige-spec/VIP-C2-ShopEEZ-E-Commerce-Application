# Brainstorming, Idea Generation & Prioritization — ShopEEZ

## 1. Project Conception & Ideation
The core concept of **ShopEEZ** is to develop a premium, lightweight, responsive MERN-stack e-commerce application. The system is designed to provide consumers with an intuitive product browsing and checkout interface, while empowering administrators with inventory (CRUD) controls and transaction insights through a clean, modern dashboard.

### Brainstorming Focus Areas:
- **UI/UX Experience**: Implementing a curated, high-end dark theme using vanilla CSS with smooth micro-interactions rather than heavy, generic CSS frameworks.
- **State Management**: Utilizing Redux Toolkit (RTK) for predictable state containment of user auth, cart management, and product listings.
- **Security**: Safeguarding customer and admin records using JWT authentication stored securely, combined with Bcrypt password hashing.
- **Fulfillment & Metrics**: A simplified order tracking loop allowing admins to step orders from "processing" to "shipped" to "delivered".

---

## 2. MoSCoW Prioritization Matrix

To establish a clear path for development, we categorized features into the MoSCoW framework:

### 🔴 Must Have (Critical for MVP)
- **User Authentication**: Register, Login, and secure session state using JSON Web Tokens (JWT).
- **Product Catalog**: Fetching and displaying listings dynamically from MongoDB.
- **Detail Views**: Product info, images gallery, stock indicators, and pricing.
- **Shopping Cart**: Add, update quantities, remove items, and calculate totals.
- **Checkout Process**: Inputting shipping addresses, selecting payment options, and placing orders.
- **Admin Products CRUD**: Ability for administrators to add, modify, and delete inventory items.

### 🟡 Should Have (Important but not critical for launch)
- **Wishlist**: Allow users to save products for later (persisted via LocalStorage).
- **Admin Dashboard Visuals**: High-level counts of total orders, revenue metrics, and user sign-ups.
- **Search & Filters**: Full-text search and category filtering for the product catalog.

### 🟢 Could Have (Nice-to-have enhancements)
- **User Profile Management**: Letting customers update their contact numbers, avatar images, and saved addresses.
- **Product Reviews**: Customer feedback rating (1-5 stars) and review comments.
- **Image Upload Integration**: Connecting controllers to Cloudinary for instant catalog media storage (with local disk fallbacks).

### ⚪ Won't Have (Postponed for future release cycles)
- **Live Payment Gateway Integrations**: Simulated/mock checkout flows are used for sandbox execution; actual Stripe/Razorpay credit card processing will be deferred.
- **SMS Notifications**: Order confirmation notifications via carrier texts.
