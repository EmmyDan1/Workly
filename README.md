# Workly

A full-stack project management platform for organizing projects, teams, issues, and collaboration in one place.

Workly is being built as a production-style SaaS application with a modern Next.js frontend, a dedicated Node.js/Express API, PostgreSQL persistence, and JWT-based authentication.

## Live Demo

**[Workly](https://workly-blue.vercel.app/)**

> The live deployment is currently being developed alongside the backend. Some features may be limited while the application is under active development.

## Features

### Authentication & Authorization

* User registration and login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Project ownership and authorization
* Authenticated requests using Bearer tokens

### Project Management

* Create projects
* View projects from PostgreSQL
* Edit existing projects
* Delete projects
* Project status, health, and priority
* Target dates
* Project leads
* Persistent database-backed project data

### Team Management

* Create teams
* View teams
* Edit teams
* Delete teams
* Team descriptions
* Team management interface

### Issues & Collaboration

Workly's issue and collaboration system is currently being integrated into the frontend.

Planned and in-progress functionality includes:

* Issue creation and management
* Issue status and priority
* Issue assignment
* Issue/project relationships
* Issue comments
* Comment authorship
* Comment deletion

## Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**
* **Phosphor Icons**

### Backend

* **Node.js**
* **Express**
* **TypeScript**
* **REST API**

### Database

* **PostgreSQL**
* **Supabase**

### Authentication

* **JWT**
* **bcrypt**

## Architecture

Workly uses a separated frontend/backend architecture.

```text
workly/
│
├── app/                    # Next.js application routes
├── components/             # Reusable React components
├── data/                   # Frontend data/configuration
├── types/                  # TypeScript types
├── utils/                  # Frontend utilities
│
└── server/
    └── src/
        ├── config/         # Database configuration
        ├── controllers/    # HTTP request/response handling
        ├── middleware/     # Authentication middleware
        ├── routes/         # API routes
        └── services/       # Business logic & database queries
```

The application follows a layered backend structure:

```text
Client
  ↓
Express Routes
  ↓
Controllers
  ↓
Services
  ↓
PostgreSQL
```

This separation keeps HTTP handling, business logic, authentication, and database operations independent and easier to maintain.

## API

Current API resources include:

```text
/api/auth
/api/projects
/api/teams
/api/issues
/api/comments
```

Protected resources use JWT authentication through the `Authorization` header:

```text
Authorization: Bearer <token>
```

### Example

```http
PATCH /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json
```

Project modification endpoints also enforce ownership so authenticated users cannot modify projects they do not own.

## Database

Workly uses PostgreSQL for persistent application data.

Current core entities include:

```text
users
teams
projects
issues
comments
```

Relationships connect users with projects, teams, issues, and comments to support collaborative project management.

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL or a Supabase PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/EmmyDan1/Workly.git
cd Workly
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create the required environment files for the frontend and backend.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the frontend

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

### 5. Start the backend

From the server directory:

```bash
cd server
npm install
npm run dev
```

The API runs locally on:

```text
http://localhost:5000
```

## Development Progress

Workly is actively being developed.

### Completed

* [x] Next.js frontend
* [x] TypeScript
* [x] Tailwind CSS
* [x] Node.js/Express backend
* [x] PostgreSQL database integration
* [x] User registration
* [x] User login
* [x] bcrypt password hashing
* [x] JWT authentication
* [x] Protected API routes
* [x] Project CRUD
* [x] Project ownership authorization
* [x] Team CRUD
* [x] Persistent database-backed data

### In Progress

* [ ] Complete frontend issue management
* [ ] Complete frontend comments integration
* [ ] Team member relationships
* [ ] User profiles
* [ ] User avatars
* [ ] Google OAuth
* [ ] Frontend route protection
* [ ] Loading, error, and empty states
* [ ] Production deployment of the complete application

## What I'm Building

The goal of Workly is to create a realistic project management platform while applying production-style full-stack development practices.

The project is intentionally being built with a separate frontend and backend rather than relying entirely on framework-managed API routes. This provides practical experience with:

* REST API design
* Authentication and authorization
* Relational database design
* SQL queries and relationships
* API-to-frontend integration
* TypeScript across the stack
* State management
* Error handling
* Secure user access
* Full CRUD workflows

## Author

**Daniel**

Full-Stack Developer

[GitHub](https://github.com/EmmyDan1)
