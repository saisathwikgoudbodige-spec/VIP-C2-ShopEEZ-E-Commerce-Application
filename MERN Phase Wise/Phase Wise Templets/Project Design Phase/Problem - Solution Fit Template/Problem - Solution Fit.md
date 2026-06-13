# Problem - Solution Fit — ShopEEZ

This document traces how specific user problems identified during brainstorming are successfully resolved by the software capabilities implemented in **ShopEEZ**.

---

## ⚖️ Problem - Feature Mapping Matrix

| User Persona | Problem Identified | Software Feature (Solution) | How It Resolves the Problem |
| :--- | :--- | :--- | :--- |
| **Customer** | Mobile shopping layouts are cluttered, causing users to abandon carts. | **Responsive Vanilla CSS Grid System** | The layout shifts seamlessly to single-column list views on mobile viewports. Fonts and padding resize automatically, keeping product focus clear. |
| **Customer** | Browsing through hundreds of items is exhausting. | **Client-side Filter and Sorting Panel** | Customers filter by Category, Price Range, and Ratings instantly, with sorting controls (Price, New Arrivals) handled dynamically by Redux. |
| **Customer** | Shopping carts get lost on session reloads or page refreshes. | **LocalStorage and Mongoose Cart Synchronization** | Redux Toolkit automatically stores the cart state inside LocalStorage, and matches it to the user's account inside MongoDB when logged in, preventing data loss. |
| **Customer** | Security concerns about credentials and checkout. | **HTTP JWT Auth + Bcrypt Encrypted Passwords** | Hashed credentials store securely inside MongoDB, while private endpoints check for authenticated JSON Web Tokens in request headers. |
| **Administrator** | Admin panels are too complex or decoupled. | **Dedicated Admin Dashboard View** | A simplified, integrated admin panel displays high-level analytics cards and allows direct CRUD controls on products and orders in real-time. |
| **Administrator** | Difficulty updating shipping timelines. | **Fulfillment Status Toggle Action** | Admins can transition order states (`processing` → `shipped` → `delivered`) with a single click, updating the customer's order history instantly. |

---

## 📈 Key Outcomes & Business Gains
- **High Retention**: Retaining cart choices results in higher conversion ratios.
- **Data Integrity**: Enforcing Mongo validations protects pricing schemas from manipulation.
- **Operational Speed**: Direct dashboard inventory management avoids backend scripting delays.
