# 🌿 Serenity Spa — MERN Website

A calm, luxurious, high-converting spa & wellness website built on the **MERN stack** (MongoDB · Express · React · Node.js) with cinematic animations, floating effects, and scroll-driven storytelling.

> Full product/design blueprint: [`SPA_WEBSITE_MASTER_PLAN.md`](./SPA_WEBSITE_MASTER_PLAN.md)

## ✨ Features

**Public site**
- Cinematic hero with parallax, floating petals & animated scroll cue
- Scroll-reveal animations everywhere + Lenis smooth scrolling
- Parallax "Experience Journey" storytelling section
- Animated stat counters, therapists grid, gallery mosaic with lightbox
- Auto-playing testimonials carousel
- Seasonal offer band with live countdown timer
- Services (filterable), Membership (tiered pricing + FAQ accordion)
- Interactive Gift Card designer with 3D flip preview
- Blog / Journal (list + article with reading-progress bar)
- Multi-step Booking wizard with live availability + confetti success
- Newsletter & contact forms wired to the API with toast feedback
- Animated 404 page, page transitions, responsive & reduced-motion safe

**Accounts & admin**
- JWT auth (httpOnly cookie), register / login / logout
- Member account page with booking history + cancel
- Protected admin dashboard: overview stats, booking management, testimonial approval

## 📂 Structure

```
spa-website-mern/
├── client/          # React + Vite (Tailwind, Framer Motion, Lenis, React Router)
│   └── src/
│       ├── pages/          # Home, Services, About, Booking, Membership,
│       │   │               # GiftCards, Blog, BlogPost, Contact, Login,
│       │   │               # Register, Account, NotFound, admin/AdminDashboard
│       ├── components/      # layout, ui, sections, auth
│       ├── context/         # AuthContext, ToastContext
│       ├── hooks/           # useSmoothScroll
│       └── lib/             # api client, motion variants
├── server/          # Express + Mongoose REST API
│   ├── models/      # User, Service, Booking, Testimonial, Therapist,
│   │                # BlogPost, GiftCard, Newsletter, ContactMessage
│   ├── controllers/ routes/ middleware/ config/ seed/
├── SPA_WEBSITE_MASTER_PLAN.md
└── package.json     # root scripts to run both together
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# then set MONGO_URI and JWT_SECRET
```

### 3. Seed sample data (services, therapists, blog, admin user)
```bash
npm --prefix server run seed
```

### 4. Run in development (client + server together)
```bash
npm run dev
```
- Client → http://localhost:5173
- API    → http://localhost:5000

## 🔑 Demo admin login

After seeding, sign in at `/login` with:

```
Email:    admin@serenityspa.com
Password: admin1234
```
Then visit `/admin` for the dashboard. **Change these before any real deployment.**

## 🧰 Scripts (root)

| Script | Description |
|--------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run server` | Run API only |
| `npm run client` | Run frontend only |
| `npm run install:all` | Install root, client & server deps |
| `npm --prefix server run seed` | Seed the database |

## 🛠 Tech Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Framer Motion, Lenis, canvas-confetti, Axios
**Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Helmet, express-rate-limit
**Database:** MongoDB (Atlas)

## 🌿 API overview

```
Auth        POST /api/auth/register|login|logout   GET /api/auth/me
Services    GET  /api/services  /api/services/:slug
Therapists  GET  /api/therapists
Bookings    GET  /api/bookings/availability   POST /api/bookings
            GET  /api/bookings/mine           PATCH /api/bookings/:id/cancel
Testimonials GET /api/testimonials            POST /api/testimonials
Blog        GET  /api/blog  /api/blog/:slug
Gift cards  POST /api/giftcards               GET  /api/giftcards/:code
Newsletter  POST /api/newsletter
Contact     POST /api/contact
Admin       GET  /api/admin/stats|bookings|testimonials  (admin JWT required)
            PATCH /api/admin/bookings/:id  /api/admin/testimonials/:id
```

---
*Design the calm. Engineer the ease. Deliver the wow.* 🌿
