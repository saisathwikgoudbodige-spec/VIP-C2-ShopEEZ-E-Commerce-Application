# Project Planning — ShopEEZ

This document outlines the planning milestones, delivery sprints, and task allocations for the **ShopEEZ** MERN application.

---

## 📅 Project Sprints & Milestones

### 🚩 Milestone 1: Requirements & Architecture (Week 1)
- **Focus**: Scope definition, user stories, database ER design, and stack selection.
- **Deliverables**:
  - Empathy Maps, Problem Statements, and Problem-Solution Fit Matrix.
  - Finalized Mongoose schema relationships.

### 🚩 Milestone 2: Backend Development & Database Setup (Week 2)
- **Focus**: Express servers scaffolding, routing controllers, models, and MongoDB connections.
- **Deliverables**:
  - REST API routes for authentication, product management, cart updates, and orders.
  - Encryption using Bcrypt and API authentication middlewares.
  - Seed scripts to quickly populate database clusters.

### 🚩 Milestone 3: Frontend Development & State Slices (Week 3)
- **Focus**: Client application setup (Vite React), global design systems (Vanilla CSS), and layout routing.
- **Deliverables**:
  - Integrated React Router paths.
  - Redux Toolkit slices (auth, cart, products) storing and syncing frontend states with LocalStorage.
  - Form validation for signup, login, and shipping addresses.

### 🚩 Milestone 4: Integration, Admin Center & Testing (Week 4)
- **Focus**: Linking front-to-back, admin dashboards controls, and UAT validation.
- **Deliverables**:
  - Secure requests hooks utilizing JWT interceptors.
  - Dashboard analytics cards and order/product administration screens.
  - Completion of UAT test cases.
