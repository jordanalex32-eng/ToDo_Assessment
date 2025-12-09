# Todo App – Full Stack Assessment 

## Stack

- Backend: Node.js, Express, TypeScript (in-memory store)
- Frontend: React, Vite, TypeScript, Redux Toolkit
- Shared types in `/shared/types.ts`




# Todo App – Full Stack Assessment

Create a full-stack todo application that allows users to manage tasks across multiple categories.

- Backend: Node.js, Express, TypeScript (in-memory store)
- Frontend: React, Vite, TypeScript, Redux Toolkit
- Shared types in `/shared/types.ts`
- Hosted API (Render): `https://todo-assessment-6716.onrender.com/api`

---



## Getting started

###  Quick Start (recommended for reviewers)

This mode uses the hosted backend on Render and runs only the React client locally.

- Prerequisites:

    Node.js 18+ (20 recommended)

    npm 9+



###  Front End

# 1. Clone the repo
git clone https://github.com/jordanalex32-eng/ToDo_Assessment.git
cd ToDo_Assessment/client

# 2. Install frontend dependencies
npm install

# 3. (Optional) Configure API base URL via .env
# By default the client points to the hosted API:
#   https://todo-assessment-6716.onrender.com/api
# If you want to override, create client/.env and set:
#   VITE_API_URL=...

# 4. Run the Vite dev server
npm run dev


```
### Open the URL printed by Vite (typically http://localhost:5173).



### Features


- Create / edit / delete todos

- Title, description, and optional due date

- Categories, with ability to create new categories

- Filter by:

    completion status: all / active / completed

- category

- Sort by created date or due date

- In-memory storage (no external DB), with shared TypeScript types between client and server
