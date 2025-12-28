# Minimal TO-DO List with AI Scheduling

A simple, minimal TO-DO web app (MERN) that includes user **login / sign-up** and an **AI scheduling assistant** powered by **GPT-4o-mini**. The project focuses on a clean REST API using Express and a lightweight React frontend. This repository demonstrates basic CRUD for tasks and a small AI assistant that can help schedule and rearrange tasks.

---

## Features

* User authentication: **Sign up** and **Sign in** (JWT-based)
* Full CRUD for TODO items: **POST**, **GET**, **PATCH**, **DELETE**
* AI scheduling assistant (GPT-4o-mini) to help plan tasks and suggest schedule changes
* REST API built with **Express**
* MongoDB for storage
* Minimal, focused React frontend (client located at `client/my-react-app`)
* Optional integrations: **n8n** workflow automation example (if configured)

---

## Tech stack

* Frontend: React
* Backend: Node.js, Express
* Database: MongoDB
* Auth: JSON Web Tokens (JWT)
* AI: OpenAI model **gpt-4o-mini** (via OpenAI API)
* Automation (optional): n8n

**Tags / topics:** `react`, `nodejs`, `javascript`, `express`, `ai`, `mongodb`, `minimal`, `chatbot`, `to-do-list`, `mern-stack`, `n8n`, `gpt-4o-mini`

---

## API (example endpoints)

> The API is RESTful and uses the typical HTTP verbs: `POST`, `GET`, `PATCH`, `DELETE`.

### Auth

* `POST /api/auth/register` — Register a new user. Body: `{ name, email, password }`
* `POST /api/auth/login` — Login and receive a JWT. Body: `{ email, password }`

### Todos

* `GET /api/todos` — Get authenticated user's todos. (Requires `Authorization: Bearer <token>`)
* `POST /api/todos` — Create a new todo. Body example: `{ title, description, dueDate, priority }`
* `PATCH /api/todos/:id` — Update a todo (partial update). Accepts fields to patch.
* `DELETE /api/todos/:id` — Delete a todo.

### AI Scheduling Assistant

* `POST /api/ai/schedule` — Send your tasks (or a single task plus preferences) and receive a suggested schedule. Example request body: `{ tasks: [...], window: { start, end }, preferences: {...} }`.

> Implementation note: The backend calls the OpenAI API with model `gpt-4o-mini` to generate scheduling suggestions. Make sure your API key has access to the model.

---

## Getting started (local)

### Prerequisites

* Node.js (>= 18 recommended)
* npm or yarn
* MongoDB (local or cloud, e.g. MongoDB Atlas)
* OpenAI API key with access to `gpt-4o-mini` (for AI features)

### Install

```bash
# from project root
npm install
# then install client deps
cd client/my-react-app
npm install
cd ../..
```

### Environment variables

Create a `.env` in the server folder (or root, depending on project structure) with at least:

```
PORT=4000
MONGO_URI=mongodb+srv://... or mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=sk-...
```

If you use n8n or other integrations, set any required webhook URLs or credentials.

### Run (development)

```bash
# run server (example)
npm run dev

# in another terminal: run client
cd client/my-react-app
npm start
```

> If you prefer a single command to run server + client, consider using `concurrently` or a simple script in the root `package.json`.

---

## Usage

1. Register a new account (`/api/auth/register`).
2. Login to receive a JWT (`/api/auth/login`).
3. Use the JWT in `Authorization` header to access the Todos endpoints.
4. Use the AI Scheduling endpoint to get suggested plans for your tasks. Example flow:

   * Send a list of tasks, desired time window, and preferences to `/api/ai/schedule`.
   * Receive a human-friendly schedule that you can accept or modify.

**Tip:** The AI assistant is implemented as a helper that parses your tasks and outputs a suggested schedule with explanations and recommended priorities.

---

## Implementation notes

* The backend uses Express to expose a REST API using `POST`, `GET`, `PATCH`, and `DELETE` for typical CRUD flows.
* Authentication should be implemented with hashed passwords (bcrypt) and JWTs for stateless sessions.
* Keep AI prompt design minimal and safe: validate and sanitize user input before sending to the OpenAI API.
* For production, secure environment variables, enable HTTPS, and limit model usage where appropriate.

---

## Optional: Integrate n8n

If you want automation (e.g., send scheduled reminders, sync tasks to calendars), n8n can be set up to receive webhooks from this app and trigger additional workflows.

---

## Contributing

Contributions are welcome! Suggested contributions:

* Improve AI prompts and output parsing
* Add calendar sync (Google Calendar / Outlook)
* Add tests and CI
* Improve mobile responsiveness

Please open issues or PRs with clear descriptions.

---

## License & Contact

MIT License — feel free to reuse and modify.

If you want to reach me: add contact info or link to your GitHub profile here.

---

*Made with ❤️ — minimal, focused, and powered by a little AI help.*
