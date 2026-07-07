# ERP Frontend

A modern React-based frontend for the **ERP – Inventory & Sales Management System**. This application provides authentication, role-based dashboard access, product management, sales creation, and real-time inventory management through a clean and responsive UI.

---

## Live Demo

**Frontend:** https://erp-frontend-murex-three.vercel.app/

**Backend API:** https://erp-backend-7j7q.onrender.com/api

---

## GitHub Repository

https://github.com/sharmin133/erp-frontend.git

---

## Tech Stack

* React
* TypeScript
* React Router
* Redux Toolkit
* TanStack React Query
* Axios
* Tailwind CSS
* Lucide React

---

## Features

### Authentication

* User Login
* User Registration
* JWT Authentication
* Protected Routes
* Role-based UI

### Dashboard

* Statistics Cards
* Low Stock Products

### Product Management

* Product List
* Search
* Filter
* Sorting
* Pagination
* Create Product
* Edit Product
* Delete Product
* Image Preview

### Sales

* Create Sale
* Multiple Product Selection
* Quantity Input
* Automatic Total Calculation

### Reusable Components

* Button
* Modal
* Form
* DataTable
* Search Input
* Pagination
* Protected Route

---

## Folder Structure

```text
src
├── api
├── app
├── assets
├── components
│   ├── common
│   └── layout
├── features
│   ├── auth
│   ├── dashboard
│   ├── home
│   ├── products
│   └── sales
├── hooks
├── routes
├── types
└── utils
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/sharmin133/erp-frontend.git
```

Move into the project

```bash
cd erp-frontend
```

Install dependencies

```bash
pnpm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api

VITE_API_ORIGIN=http://localhost:5000
```

Run the development server

```bash
pnpm dev
```

Build for production

```bash
pnpm build
```

---

## Scripts

```bash
pnpm dev

pnpm build

pnpm preview
```

---

## Deployment

Frontend is deployed using **Vercel**.

---

