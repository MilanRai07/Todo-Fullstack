# Todo App

My first attempt to fullstack(frontend+backend) task manager for organizing personal todos by status, priority, category, and due date. The app includes a dashboard, task search and filtering, account management, and image attachments.

## Features

- Sign up, log in, verify your email, and recover or change your password.
- Create, view, edit, filter, and delete tasks.
- Organize tasks with personal categories, priorities, statuses, and due dates.
- View today's tasks, completed tasks, and overdue tasks.
- See a status summary on the dashboard.
- Attach images to tasks and profile accounts.
- Manage your profile and account settings.

## Tech stack

- **Frontend:** React, Vite, React Router, TanStack Query, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Integrations:** Cloudinary for image storage and Brevo for email delivery

## Requirements

- Node.js and npm
- A MongoDB database, local or hosted
- A Cloudinary account for image uploads
- A Brevo API key and verified sender address for email delivery

Image uploads require Cloudinary configuration. Email verification and other email flows require Brevo configuration.

## Setup

Run these commands from the repository root.

### 1. Configure the backend

Create `backend/.env`:

```dotenv
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/todo-app
JWT_SECRET=replace-with-a-long-random-secret
CORS_ORIGINS=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

BREVO_API_KEY=your-brevo-api-key
SENDER_EMAIL=your-verified-sender@example.com
```

Use your own credentials for the Cloudinary and Brevo values. Keep secrets out of source control. `PORT` defaults to `3001`, and `CORS_ORIGINS` defaults to `http://localhost:5173` if omitted. For multiple frontend origins, separate them with commas.

Install dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

The API is available at `http://localhost:3001`. Its root endpoint (`/`) returns a simple server health message.

### 2. Configure the frontend

Create `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:3001
```

Install dependencies and start the development server in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Useful commands

Run these from their respective `backend/` or `frontend/` directories.

| Command | Project | Description |
| --- | --- | --- |
| `npm run dev` | Backend | Start the API with Nodemon |
| `npm run run` | Backend | Start the API with Node.js |
| `npm run dev` | Frontend | Start the Vite development server |
| `npm run build` | Frontend | Create a production build in `frontend/dist/` |
| `npm run preview` | Frontend | Preview the production build locally |
| `npm run lint` | Frontend | Run ESLint |

## API overview

The API uses cookie-based authentication for protected endpoints.

| Base path | Purpose |
| --- | --- |
| `/auth` | Account registration, login, email verification, password recovery, and profile management |
| `/todo` | Task creation, listing, updates, deletion, status counts, and overdue tasks |
| `/category` | Create, list, update, and delete the signed-in user's categories |

The API runs on port `3001` by default. Set `VITE_API_URL` to the API's base URL and include the frontend origin in `CORS_ORIGINS`.

## Project structure

```text
backend/
  category/       Category model, routes, and controllers
  config/         MongoDB and Cloudinary configuration
  middleware/     Authentication and image-upload middleware
  migrations/     MongoDB data migrations
  todo/           Todo model, routes, and controllers
  users/          User model, routes, and controllers
  utils/          Email and Cloudinary helpers
frontend/
  src/
    component/    Shared UI components
    pages/        App pages and dashboard sections
    service/      API requests and React Query mutations
    style/        Global and component styles
```

## Notes

- Todos and categories are scoped to the authenticated user.
- Task image uploads accept image files up to 5 MB.
- The backend package currently does not define an automated test suite.
