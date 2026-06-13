# 🔄 Data Flow Diagrams & User Stories

**Project Name:** ShopEEZ — Full Stack MERN E-Commerce Platform
**Date:** June 2026

---

## 1. User Stories

### 🛍️ Customer User Stories

| US# | As a... | I want to... | So that... | Priority |
|:--|:--|:--|:--|:--|
| US-01 | Customer | Register with email and password | I can create a personal account | 🔴 Must Have |
| US-02 | Customer | Log in securely | I can access my cart, orders, and profile | 🔴 Must Have |
| US-03 | Customer | Browse all products | I can discover items available in the store | 🔴 Must Have |
| US-04 | Customer | Search for specific products | I can quickly find what I need | 🔴 Must Have |
| US-05 | Customer | Filter by category, price, and rating | I can narrow down choices efficiently | 🔴 Must Have |
| US-06 | Customer | View product details | I can read specs, images, and reviews before buying | 🔴 Must Have |
| US-07 | Customer | Add products to my cart | I can collect items before purchasing | 🔴 Must Have |
| US-08 | Customer | Have my cart saved between sessions | I don't lose cart contents when I refresh | 🔴 Must Have |
| US-09 | Customer | Checkout with a shipping address | My order gets delivered to the right place | 🔴 Must Have |
| US-10 | Customer | View my order history | I can track past purchases and their statuses | 🟡 Should Have |
| US-11 | Customer | Add products to a wishlist | I can save favorites without buying immediately | 🟡 Should Have |
| US-12 | Customer | Submit product reviews | I can share my experience with other shoppers | 🟢 Could Have |
| US-13 | Customer | Update my profile address and phone | My shipping details stay current | 🟡 Should Have |
| US-14 | Customer | Log out securely | My session and JWT are cleared | 🔴 Must Have |

### 🛠️ Admin User Stories

| US# | As an... | I want to... | So that... | Priority |
|:--|:--|:--|:--|:--|
| US-15 | Admin | View dashboard statistics | I can monitor store performance at a glance | 🔴 Must Have |
| US-16 | Admin | Add new products | I can expand the product catalog | 🔴 Must Have |
| US-17 | Admin | Edit product details | I can update prices, stock, and images | 🔴 Must Have |
| US-18 | Admin | Delete products | I can remove discontinued items | 🔴 Must Have |
| US-19 | Admin | View all customer orders | I can manage fulfillment centrally | 🔴 Must Have |
| US-20 | Admin | Update order status | I can mark orders as shipped or delivered | 🔴 Must Have |
| US-21 | Admin | View all registered users | I can monitor the customer base | 🟡 Should Have |
| US-22 | Admin | Delete customer accounts | I can remove inactive or problematic users | 🟡 Should Have |
| US-23 | Admin | See low stock alerts | I can restock before items run out | 🟡 Should Have |

---

## 2. Level 0 DFD — Context Diagram

```
                        ┌─────────────────────────────────────────┐
                        │                                         │
     Login/Register ──► │                                         │ ──► Product Catalog
     Search Products──► │          ShopEEZ                        │ ──► Order Confirmation
     Add to Cart    ──► │      E-Commerce System                  │ ──► Order Status
     Place Order    ──► │                                         │ ──► Invoice
     Review Product ──► │                                         │
                        │                                         │
[Customer]              │                                         │         [Customer]
                        │                                         │
     Add Product    ──► │                                         │ ──► Dashboard Stats
     Update Product ──► │                                         │ ──► Product List
     Delete Product ──► │                                         │ ──► Order List
     Update Order   ──► │                                         │ ──► User List
     Delete User    ──► │                                         │ ──► Revenue Reports
                        │                                         │
[Admin]                 └─────────────────────────────────────────┘         [Admin]
```

---

## 3. Level 1 DFD — Authentication Process

```
                   ┌──────────────────────────────────────────────────┐
                   │             ShopEEZ Auth System                  │
                   │                                                   │
Customer ─[email+password]──► [1.1 Validate Input] ──► [1.2 Check DB] ──► MongoDB (users)
                   │                   │                     │
                   │           Invalid │             Found user │
                   │                   ▼                     ▼
                   │          ◄── Error Response   [1.3 Bcrypt.compare()]
                   │                                         │
                   │                              Match? ────┤
                   │                                No ──► Error Response
                   │                               Yes ──► [1.4 jwt.sign(userId)]
                   │                                         │
Customer ◄─────[JWT Bearer Token]────────────────────────────┘
                   │
                   └──────────────────────────────────────────────────┘
```

---

## 4. Level 1 DFD — Product Search & Filter

```
Customer ─[keyword, category, minPrice, maxPrice, rating, sort]──►
                │
                ▼
        [2.1 Parse Query Params]
                │
                ▼
        [2.2 Build Mongoose Filter Object]
         { name: {$regex}, category, price: {$gte, $lte}, ratings: {$gte} }
                │
                ▼
        [2.3 Query MongoDB products Collection]
                │
                ▼
        [2.4 Apply Sort + Pagination]
         (skip, limit, sort field)
                │
                ▼
Customer ◄─[JSON: {products[], page, pages, total}]
```

---

## 5. Level 1 DFD — Order Placement

```
Customer ─[cart items + shippingAddress + paymentMethod]──►
                │
                ▼
        [3.1 Protect Middleware: Verify JWT]
                │
                ▼
        [3.2 Validate Cart Items Against Product Stock]
                │ Stock insufficient?
                ├──────────────────► 400 Error: "Product out of stock"
                │ All items in stock
                ▼
        [3.3 Create Order Document in MongoDB]
         { user, items, shippingAddress, paymentMethod, totalAmount, orderStatus: 'processing' }
                │
                ▼
        [3.4 Decrement Product.stock for each ordered item]
                │
                ▼
        [3.5 Clear Customer Cart]
                │
                ▼
Customer ◄─[201 Created: { success: true, order }]
```
