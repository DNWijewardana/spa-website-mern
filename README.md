# 🌿 Serenity Spa — MERN Website

A calm, luxurious, high-converting spa & wellness website built on the **MERN stack** (MongoDB · Express · React · Node.js) with cinematic animations and scroll-driven storytelling.

> Full product/design blueprint: [`SPA_WEBSITE_MASTER_PLAN.md`](./SPA_WEBSITE_MASTER_PLAN.md)

## 📂 Structure

```
spa-website-mern/
├── client/          # React + Vite frontend (Tailwind, Framer Motion, React Router)
├── server/          # Express + Mongoose REST API
├── SPA_WEBSITE_MASTER_PLAN.md
└── package.json     # root scripts to run both together
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
Copy the example env and fill in your values:
```bash
cp server/.env.example server/.env
```

### 3. Run in development (client + server together)
```bash
npm run dev
```
- Client → http://localhost:5173
- API    → http://localhost:5000

## 🧰 Scripts (root)

| Script | Description |
|--------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run server` | Run API only |
| `npm run client` | Run frontend only |
| `npm run install:all` | Install root, client & server deps |

## 🛠 Tech Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Framer Motion, Axios
**Backend:** Node.js, Express, Mongoose, JWT, bcrypt
**Database:** MongoDB (Atlas)

---
*Design the calm. Engineer the ease. Deliver the wow.* 🌿
