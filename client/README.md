# 💻 ShopEZ — Frontend Client

This is the frontend React client for the **ShopEZ** e-commerce platform. It is built with **Vite** for rapid hot-module reloading and optimized production bundles.

---

## 🛠️ Technologies Used

- **React 19** — User Interface library
- **Redux Toolkit** — Global state management (Auth, Cart, Wishlist)
- **React Router v6** — Client-side routing
- **Vanilla CSS** — Custom styling with premium glassmorphism dark theme
- **Axios** — HTTP client for backend communication

---

## 🚀 How to Run Locally

### 1. Setup Env Variables
Ensure you have a `.env` file in this directory (`client/`) containing:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Client Dependencies
From the root project directory:
```bash
npm run install:all
```
*(Or manually in this directory: `npm install --legacy-peer-deps`)*

### 3. Run Development Server
From the root project directory:
```bash
npm run dev:client
```
*(Or manually in this directory: `npm run dev`)*

The app will start on: **`http://localhost:5173/`**

---

## 📁 Folder Structure

```
client/
├── public/            # Static assets
└── src/
    ├── api/           # Axios API configuration
    ├── assets/        # Local images & custom assets
    ├── components/    # Reusable UI components (Navbar, Cards, loaders, etc.)
    ├── pages/         # Screen pages (Home, ProductList, Checkout, etc.)
    │   └── admin/     # Admin dashboard pages (ManageProducts, ManageOrders)
    ├── redux/         # Redux store & slices (auth, cart, wishlist)
    ├── utils/         # Helper functions (price formatting)
    ├── App.jsx        # Main component & routing definitions
    └── main.jsx       # Client entrypoint
```
