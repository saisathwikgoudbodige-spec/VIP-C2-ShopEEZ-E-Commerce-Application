# User Acceptance Testing (UAT) — ShopEEZ

This document defines the User Acceptance Testing (UAT) checklist for **ShopEEZ** to verify functional completeness and UX stability.

---

## 🔐 1. Authentication & Session Security

### Test Case 1.1: New User Registration
- **Preconditions**: User is on the Register page.
- **Action**: Input name, unique email, and password. Submit form.
- **Expected Result**: User account is successfully saved (with a hashed password inside MongoDB). The client receives a JWT and routes the user to the homepage.

### Test Case 1.2: Login and Access Tokens
- **Preconditions**: Seeded admin or customer account exists.
- **Action**: Input credentials on the Login page and click submit.
- **Expected Result**: Server verifies password matching. JWT token is sent back and stored in Redux/localStorage. User redirected to homepage or admin panel based on role.

---

## 🛒 2. Customer Catalog & Order Processing

### Test Case 2.1: Product Search & Filter Controls
- **Preconditions**: Product list has seeded products.
- **Action**: Type text in search bar and select categories/price range sliders.
- **Expected Result**: Product cards list updates instantly matching query metrics.

### Test Case 2.2: Cart and Checkout Execution
- **Preconditions**: Customer is logged in, items are in stock.
- **Action**: Add 2 items to Cart, proceed to Checkout, enter shipping details, select Mock Cash Payment, and place order.
- **Expected Result**: An Order record is created in MongoDB with status `processing`. Cart contents are cleared, and stock levels of purchased products are decremented.

---

## 🛠️ 3. Administrative Operations

### Test Case 3.1: Catalog Control (CRUD)
- **Preconditions**: Admin user is logged in.
- **Action**: Go to Manage Products, create a new product, edit its price, and click delete.
- **Expected Result**: All CRUD actions update MongoDB collections immediately and refresh the dashboard grid.

### Test Case 3.2: Order Status Management
- **Preconditions**: Admin dashboard open, orders list populated.
- **Action**: Select a pending order, toggle status from `processing` to `shipped`, then to `delivered`.
- **Expected Result**: Order status database field changes, updating timestamps and reflecting in the customer's Order History page.
