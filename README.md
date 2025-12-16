# Course Management System (LearnHub)

A full-stack, role-based course management platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **MongoDB + Mongoose**, and **JWT cookie-based authentication**.  

This project was implemented as an assignment to demonstrate **full-stack development skills, secure authentication, role-based access control, and modern frontend/backend integration**.

---

## 🌐 Live Demo

> [learnhub-inky.vercel.app](https://learnhub-inky.vercel.app)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript  
- **Styling:** Tailwind CSS 4, PostCSS, Lucide React Icons  
- **Backend:** Next.js API Routes, MongoDB + Mongoose  
- **Authentication:** JWT cookie-based auth, bcrypt password hashing  
- **Validation:** Zod schemas (client & server)  
- **Notifications:** react-hot-toast  
- **Linting:** ESLint, `eslint-config-next`

---

## 👥 User Roles

The platform supports **three roles** with role-based dashboards and access:

1. **Admin**
	- Create instructor accounts
	- Admin dashboard UI (analytics & course management UI placeholders)
	- API: `POST /api/admin/instructors`

2. **Instructor**
	- Create and manage their own courses
	- View course statistics (total, public/draft, free/paid)
	- Edit course details
	- API: `/api/instructor/courses`, `/api/instructor/courses/[courseId]`, `/api/instructor/courses/stats`
	- Profile management (change password)

3. **Learner**
	- View enrolled courses (“My Learning”)
	- Track basic learning stats (total/active/completed courses)
	- Profile management (name/email)
	- API: `/api/enrollments`, `/api/learner/stats`

> Note: Course content (lessons/modules/quizzes) and AI integrations are **planned for future expansion**.

---

## ⚡ Features Implemented

### Authentication & Authorization
- Register, login, logout, and fetch current user (`me`)  
- JWT cookie-based authentication with role-based access checks  
- Passwords securely hashed with bcrypt  

### Course Management
- Instructor CRUD operations for courses  
- Instructor course statistics via MongoDB aggregation  
- Public course listing and course detail pages  
- Enrollment system for learners to enroll in public courses  

### Frontend
- Responsive dashboards for Admin, Instructor, and Learner  
- Role-based navigation (Navbar + Sidebar)  
- Public landing page with CTAs for courses and registration  
- Interactive forms with client-side validation (Zod) and toast notifications  

### Backend
- MongoDB models for **User**, **Course**, and **Enrollment**  
- Secure, type-safe API routes  
- Placeholder endpoint for future AI integration (`/api/ai`)  

---

## 🚧 Partially Implemented / Placeholder Features

- Admin analytics and all-courses page (currently UI-only)  
- AI endpoint and features (currently placeholder only)  
- Course progress tracking and recommendations for learners (static/demo data)  
- Payments, email verification, password reset, and account activation flows  

> These areas are intentionally scoped out for MVP clarity and can be extended later.

---

## 📂 Project Structure

```bash
src/
├─ app/
│  ├─ (auth)/        # Login & Register pages
│  ├─ api/           # Backend API routes
│  │  ├─ auth/       # login, register, logout, me
│  │  ├─ admin/      # Admin APIs
│  │  ├─ instructor/ # Instructor APIs
│  │  ├─ courses/    # Public courses API
│  │  ├─ enrollments/# Enrollment APIs
│  │  └─ ai/         # Placeholder AI endpoint
│  ├─ dashboard/     # Admin / Instructor / Learner dashboards
│  ├─ courses/       # Public course pages
│  └─ components/    # Reusable UI components
├─ hooks/            # useAuth, useCourse
├─ lib/              # auth.ts, mongodb.ts
├─ models/           # Mongoose models
├─ schemas/          # Zod validation schemas
└─ types/            # TypeScript types
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/karanhimadri/learnhub.git
cd learnhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Usage

- **Register as Learner** → Explore courses and track enrollments
- **Register as Instructor** → Create and manage your own courses  
- **Login as Admin** → Create instructors and view the dashboard (UI placeholders for analytics)

> Role-based dashboards redirect users automatically based on their authenticated role.

---

## 🎯 Key Learning Outcomes / Skills Demonstrated

✅ Full-stack Next.js 16 architecture with App Router  
✅ Type-safe API routes and frontend integration using TypeScript  
✅ Secure JWT authentication and role-based access control  
✅ MongoDB schema design and aggregation queries  
✅ Tailwind CSS responsive UI and reusable React components  
✅ Proper separation of concerns: hooks, lib, models, API routes  

---

## 📌 Future Improvements

- Complete AI-powered features (course recommendations, content generation)
- Implement course lessons/modules with progress tracking
- Full admin analytics & moderation APIs
- Payment integration for paid courses
- Email verification and password reset flows
- Automated testing for frontend and backend

---

## 👤 Author

**Himadri Karan**

- GitHub: [@karanhimadri](https://github.com/karanhimadri)
- LinkedIn: [linkedin.com/in/himadrikaran](https://linkedin.com/in/himadrikaran)

---

## 📄 License

This project is for educational purposes and submitted as an assignment. Not licensed for commercial use.
