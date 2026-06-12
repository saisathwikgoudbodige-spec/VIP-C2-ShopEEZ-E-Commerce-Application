# 🛒 ShopEZ — Full Stack MERN E-Commerce Platform

> A feature-rich, responsive e-commerce web application built with the MERN stack — MongoDB, Express.js, React.js (Vite), and Node.js.

---

## 🌟 Features

### 👤 Customer
- Browse products by category, search, filter (price range, rating), and sort
- Detailed product pages with image gallery, specs, and reviews
- Add to Cart and Wishlist (localStorage-persisted)
- Secure Checkout with shipping address and payment method selection
- Order tracking, history, and cancellation
- User profile with saved address and password management

### 🛠️ Admin
- Dashboard with total sales, orders, users, and revenue stats
- Low stock alerts and recent orders overview
- Full product management (CRUD + image URLs)
- Order status management (processing → shipped → delivered)
- User management (view and delete)

---

## 🧰 Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | React 19, Redux Toolkit, React Router v6  |
| Backend    | Node.js, Express.js (ES Modules)          |
| Database   | MongoDB with Mongoose                     |
| Auth       | JWT + bcryptjs                            |
| Image Upload | Cloudinary (or local fallback)          |
| Styling    | Vanilla CSS (premium dark theme)          |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (running locally or a remote Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/saisathwikgoudbodige-spec/VIP-C2-ShopEEZ-E-Commerce-Application.git
cd VIP-C2-ShopEEZ-E-Commerce-Application
```

### 2. Install Dependencies
Install dependencies for both frontend and backend automatically from the root folder:
```bash
npm run install:all
```

### 3. Setup Environment Variables
Ensure you have `.env` files in both the `server` and `client` directories with correct ports and keys:
- **Server `.env`**: Make sure your `MONGO_URI` is correct (defaults to local MongoDB `mongodb://localhost:27017/shopez`).
- **Client `.env`**: Make sure `VITE_API_URL` points to `http://localhost:5000/api`.

### 4. Seed the Database (Add Products & Users)
To populate MongoDB with products and testing accounts:
```bash
npm run seed
```

### 5. Running the Application
Open two separate Command Prompt or terminal windows to run the servers concurrently:

- **Window 1 (Backend Server)**:
  ```bash
  npm run dev:server
  ```
- **Window 2 (Frontend Client)**:
  ```bash
  npm run dev:client
  ```

### 6. Open in Browser
- **Frontend URL**: http://localhost:5173
- **Backend API URL**: http://localhost:5000

---

## 🔑 Test Accounts (after seeding)

| Role  | Email               | Password   |
|-------|---------------------|------------|
| Admin | admin@shopez.com    | Admin@123  |
| User  | user@shopez.com     | User@123   |

---

## 📁 Project Structure

```
shopez/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/     # Navbar, Footer, Cards, etc.
│       ├── pages/          # All customer-facing pages
│       │   └── admin/      # Admin panel pages
│       ├── redux/          # RTK slices + store
│       ├── api/            # Axios instance
│       └── utils/          # Helper utilities
├── server/          # Express backend
│   ├── config/      # Database connection
│   ├── controllers/ # Route business logic
│   ├── middleware/  # Auth, admin, error, upload
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express route definitions
│   └── seed.js      # Database seeder
└── README.md
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

[MIT](LICENSE)
