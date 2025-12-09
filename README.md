# Todo App – Full Stack Assessment

A full-stack todo application for managing tasks across multiple categories with a modern React front end and a TypeScript/Node.js API.

---

## Live Deployments

- **Frontend (GitHub Pages)**  
  https://jordanalex32-eng.github.io/ToDo_Assessment/

- **Backend API (Render)**  
  Base URL: `https://todo-assessment-6716.onrender.com/api`

The frontend is configured via `VITE_API_BASE_URL` to talk to this backend.

---

## Stack

- **Backend:** Node.js, Express, TypeScript (in-memory store)
- **Frontend:** React, Vite, TypeScript, Redux Toolkit
- **Shared Types:** `shared/types.ts` used by both client and server

---

## Features

- Create, edit, delete todos
- Title, description, optional due date
- Categories, with ability to create new categories
- Filter by:
  - Completion status: **all / active / completed**
  - Category
- Sort by **created date** or **due date**
- In-memory storage (no external DB)
- Shared TypeScript types between client and server for type-safe API contracts

---

## Project Structure

    .
    ├── client/           # React + Vite + TypeScript frontend
    │   └── src/
    │       ├── App.tsx   # Main UI
    │       ├── App.css   # Main styling
    │       ├── todos/    # Redux slice + API for todos
    │       └── categories/ # Redux slice + API for categories
    ├── server/           # Node.js + Express + TypeScript backend
    │   └── src/
    │       ├── index.ts  # Server entrypoint
    │       └── routes/   # REST API routes
    └── shared/
        └── types.ts      # Shared TypeScript interfaces

---

## Getting Started Locally

### 1. Prerequisites

- Node.js **18+** (Node 20+ recommended)  
- npm **8+**

Clone the repository:

    git clone https://github.com/jordanalex32-eng/ToDo_Assessment.git
    cd ToDo_Assessment

---

### 2. Backend API (server)

From the repo root:

    cd server
    npm install

#### Development

    npm run dev

- Runs the TypeScript server with hot reload.  
- Default API base URL: `http://localhost:7000/api`

#### Production build

    npm run build
    npm start

- `build` compiles TypeScript into `dist/`  
- `start` runs the compiled JavaScript (same command used by Render)

---

### 3. Frontend (client)

From the repo root:

    cd client
    npm install

#### Environment configuration

Create a `.env.development` file in `client/`:

    VITE_API_BASE_URL=http://localhost:7000/api

For production (GitHub Pages), `.env.production` is configured with:

    VITE_API_BASE_URL=https://todo-assessment-6716.onrender.com/api

> The value **must include `/api`** because the server mounts routes under `/api`.

#### Run the dev server

    npm run dev

Vite will print a URL such as:

    http://localhost:5173/

Open that in your browser. The app will talk to your local backend at `http://localhost:7000/api`.

---

## GitHub Pages Deployment (Frontend)

The `gh-pages` branch is used for GitHub Pages.

Typical flow after frontend changes:

    # from repo root
    cd client
    npm run build
    # if you have a deploy script, run it here (e.g. npm run deploy)

GitHub Pages serves the built app at:

    https://jordanalex32-eng.github.io/ToDo_Assessment/

---

## Render Deployment (Backend)

The Render service points at this repo and runs something equivalent to:

    cd server
    npm install
    npm run build
    npm start

Key details:

- **Runtime:** Node.js  
- **Start command:** `npm start`  
- **Public URL:** `https://todo-assessment-6716.onrender.com`  
- **API base path:** `/api`

The frontend’s `VITE_API_BASE_URL` should be this base URL + `/api`.

---

## API Overview

All endpoints are prefixed with `/api`.

- `GET /api/categories` – list categories  
- `POST /api/categories` – create category  
- `GET /api/todos` – list todos with optional filters  
- `POST /api/todos` – create todo  
- `PUT /api/todos/:id` – update todo  
- `DELETE /api/todos/:id` – delete todo  

All responses use the shared TypeScript types from `shared/types.ts`.

---

## Development Notes

- Uses **Redux Toolkit** on the frontend for predictable state management.
- Backend uses an **in-memory store**, so data resets on server restart.
- Types are shared between client and server to keep contracts in sync and avoid duplication.

---

## License

This project is intended for assessment and learning purposes.
