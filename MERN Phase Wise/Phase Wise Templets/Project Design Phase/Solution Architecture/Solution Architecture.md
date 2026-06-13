# Solution Architecture — ShopEEZ

This document provides a technical walkthrough of the architectural modules, data schemas, and folder structures implemented in **ShopEEZ**.

---

## 1. Directory Structure Mappings

ShopEEZ is divided into independent frontend and backend packages:

```
shopez/
├── client/                 # React Frontend Client (Vite)
│   ├── src/
│   │   ├── api/            # Axios API configuration & intercepts
│   │   ├── components/     # Reusable layout elements (Navbar, Footer, ProductCard)
│   │   ├── pages/          # Pages (Home, Detail, Cart, Profile, Login)
│   │   │   └── admin/      # Admin Panel pages (Dashboard, Manage Products & Orders)
│   │   ├── redux/          # Redux Toolkit store and slices (auth, cart, product)
│   │   ├── App.jsx         # App router layouts and path mapping
│   │   ├── index.css       # Core design design variables and dark-theme style resetting
│   │   └── main.jsx        # App entry setup
├── server/                 # Node.js Express Backend
│   ├── config/             # DB settings (db.js)
│   ├── controllers/        # Express route business logic controllers
│   ├── middleware/         # Security, user role validations, error catchers
│   ├── models/             # Mongoose schemas (User, Product, Order, Cart, Review)
│   ├── routes/             # Express API endpoints
│   ├── server.js           # Server initializer
│   └── seed.js             # Seeding mock database collections
```

---

## 2. Entity Relationship Design

The database stores data using five Mongoose collections:

```mermaid
erDiagram
    USER ||--o{ ORDER : "places"
    USER ||--o{ REVIEW : "writes"
    USER ||--o{ CART : "has"
    
    PRODUCT ||--o{ REVIEW : "receives"
    PRODUCT ||--o{ CART_ITEM : "included_in"
    ORDER ||--|{ ORDER_ITEM : "contains"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role "user | admin"
        object address
        string phone
    }

    PRODUCT {
        ObjectId _id PK
        string name
        string description
        number price
        number discountPrice
        string category
        string brand
        number stock
        array images
        number ratings
        number numReviews
        string seller
        boolean isFeatured
        array tags
    }

    CART {
        ObjectId _id PK
        ObjectId user FK
        array items
        number totalPrice
    }

    ORDER {
        ObjectId _id PK
        ObjectId user FK
        array items
        object shippingAddress
        string paymentMethod
        string paymentStatus "pending | paid | failed"
        string orderStatus "processing | shipped | delivered | cancelled"
        number totalAmount
        date paidAt
        date deliveredAt
    }

    REVIEW {
        ObjectId _id PK
        ObjectId user FK
        ObjectId product FK
        number rating
        string comment
    }
```

---

## 3. MVC Pattern Mapping in ShopEEZ

- **Model**: Mongoose schemas inside `server/models/` enforce types, validations, and hooks (e.g. hashing passwords before saving) directly on MongoDB.
- **View**: Handled completely on the client-side via React components (`client/src/pages/` and `client/src/components/`), using Redux hooks to subscribe to state changes and re-render.
- **Controller**: Backend controllers inside `server/controllers/` extract route parameters, execute query logic, and send clean JSON payloads back to the client.
