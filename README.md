# Fullstack Notes App 

This is a full professional fullstack web application:

* **Frontend**: React + Material UI
* **Backend**: Node.js + Express
* **Database**: MongoDB (local)
* **Authentication**: JWT
* **Styling**: Material UI

---

## Folder Structure

```bash
fullstack_notes_app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## Features

* User registration & login (JWT-based authentication)
* Create, edit, delete personal notes
* Upload images with notes (base64 encoding)
* Search notes by title
* Pagination
* Profile page
* Material UI design
* Fully responsive

---

## Setup Instructions

### 1️⃣ Backend Setup

#### Prerequisites

* Node.js installed
* MongoDB installed and running locally

#### Run Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

---

### 2️⃣ Frontend Setup

#### Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

### 3️⃣ MongoDB Connection

Make sure MongoDB is running on:

```bash
mongodb://localhost:27017/notesapp
```

If not, adjust the connection string inside `backend/server.js` accordingly.

---

## Technology Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Frontend       | React, Material UI, Axios, React Router |
| Backend        | Node.js, Express                        |
| Database       | MongoDB                                 |
| Authentication | JWT                                     |
| Styling        | Material UI                             |

---

## Challenges Faced (Detailed)

### 1️⃣ Synchronizing Frontend and Backend

* Designing secure API endpoints and managing CORS policy.
* Ensuring JWT tokens are correctly stored in browser localStorage.
* Handling token expiration and redirecting users upon authorization errors.
* Synchronizing login state across multiple components.

### 2️⃣ JWT Authentication

* Implementing token-based authentication securely using `jsonwebtoken`.
* Protecting all sensitive API routes and preventing unauthorized access.
* Ensuring token is passed correctly in all API requests.

### 3️⃣ MongoDB Connection

* Handling MongoDB local server installation on Windows.
* Solving MongoDB connection refusal errors and ensuring stable connection.
* Using Mongoose schemas for simple and reliable data modeling.

### 4️⃣ Image Upload Handling

* Avoiding external storage complexity by encoding uploaded images as base64.
* Handling image file reading on frontend with FileReader API.
* Displaying uploaded images correctly while storing them as simple text blobs.

### 5️⃣ Material UI Integration

* Refactoring basic HTML UI to fully professional Material UI components.
* Maintaining consistent responsive design across devices.
* Managing form inputs, error messages, buttons, and grid layout with Material UI.
* Adding Snackbar notifications for better user experience.

### 6️⃣ State Management in React

* Managing complex local component state without external state libraries.
* Preventing unnecessary re-renders and race conditions when fetching notes.
* Handling loading states while communicating with backend.

### 7️⃣ Error Handling

* Providing helpful user error feedback on both frontend and backend.
* Gracefully handling network errors, server crashes, and invalid requests.
* Avoiding full page crashes with isolated error boundaries in React.

---

## Sample Notes (for Testing)

**Title:** Grocery List
**Content:** Milk, Eggs, Bread, Bananas, Coffee

**Title:** Weekend Goals
**Content:** Finish book, Clean apartment, Exercise, Try new recipe

**Title:** Coding Ideas
**Content:** Weather app, Chatbot, Next.js, Tailwind CSS

---

## Future Improvements

* Dark mode toggle
* Refresh tokens (secure auth)
* Full deployment (Render, Vercel, Netlify, Atlas)
* Docker containers
* Collaborative notes
* Drag & drop image uploads

---

## .gitignore Example

**backend/.gitignore**

```
node_modules/
.env
```

**frontend/.gitignore**

```
node_modules/
build/
.env
```

---

## Author

Built using Node.js, React, Material UI, and MongoDB.
