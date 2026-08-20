# Sphere of Influence

Sphere of Influence is a full-stack mentoring web application that connects mentors and mentees.

The application allows mentees to discover mentors, view their profiles and available schedules, and book mentoring sessions. Mentors can create their availability, view their scheduled meetings, and keep track of their mentees.

The project was created to practice building a full-stack application using React, Node.js, Express, and MongoDB.

## Features

### Mentees

* Register and log in
* Create and update a profile
* Discover mentors
* View mentor profiles
* View mentor availability
* Book a mentoring session
* View upcoming meetings
* View mentor connections

### Mentors

* Register and log in
* Create and update a profile
* Add available mentoring schedules
* View upcoming meetings
* View scheduled sessions
* View mentee connections

## Technologies Used

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Installation

To run the project locally, you will need:

* Node.js
* npm
* MongoDB Atlas
* Git

### 1. Clone the repository

```bash id="66q5n1"
git clone <your-repository-url>
```

Go to the project folder:

```bash id="5gqfba"
cd sphere-of-influence
```

### 2. Set up the backend

Go to the backend folder:

```bash id="kjm0v3"
cd backend
```

Install the dependencies:

```bash id="spnxpr"
npm install
```

Create a `.env` file inside the backend folder and add:

```env id="6py11x"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash id="6lmkmp"
npm run dev
```

### 3. Set up the frontend

Open another terminal and go to the frontend folder:

```bash id="7vlw5y"
cd frontend
```

Install the dependencies:

```bash id="vtm87x"
npm install
```

Start the frontend:

```bash id="m4jyid"
npm run dev
```

Open the URL provided by Vite in your browser.

## How to Use the App

### As a Mentee

1. Create a mentee account or log in.
2. Go to the mentee dashboard.
3. Browse the available mentors.
4. Select a mentor to view their profile.
5. Check their available mentoring schedules.
6. Book an available session.
7. View your upcoming meetings from the dashboard.

### As a Mentor

1. Create a mentor account or log in.
2. Go to the mentor dashboard.
3. Add your available mentoring schedules.
4. View sessions booked by mentees.
5. View your upcoming meetings and mentee connections.

## Main API Routes

### Authentication

```text id="h9gq4q"
POST /auth/register
POST /auth/login
```

### Users

```text id="uzf13p"
GET   /api/users/:id
PATCH /api/users/:id
```

### Availability

```text id="0tqpt6"
POST   /api/availability
GET    /api/availability
GET    /api/availability/mentor/:id
PUT    /api/availability/:id
DELETE /api/availability/:id
```

### Bookings

```text id="hy1x9l"
POST /api/bookings
GET  /api/bookings
PUT  /api/bookings/:id/cancel
```

## Project Structure

```text id="i7ttx6"
sphere-of-influence/
│
├── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── server.js
    └── package.json
```

## Future Improvements

Some features that may be added in the future include:

* Mentor search and filtering
* AI-assisted mentor recommendations
* Notifications and reminders
* Calendar integration
* In-app messaging
* Mentoring progress tracking
* Session feedback
* Admin features

## Project Status

This project is currently under development. Some features are still being improved and tested.

## Author

**Irish Delen**

This project was created as part of my full-stack project at Uplift Code Camp.
