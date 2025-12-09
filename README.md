# Todo App – Full Stack Assessment 

## Stack

- Backend: Node.js, Express, TypeScript (in-memory store)
- Frontend: React, Vite, TypeScript, Redux Toolkit
- Shared types in `/shared/types.ts`

## Getting started

### 1. Backend API

```bash
cd server
npm install
npm run dev



```
## API will be available at http://localhost:7000/api


### 2. Front End

```bash
cd client
npm install
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
