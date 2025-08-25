
# API-Driven Mini Web App

## Main Aim
Build a full-stack, API-driven web application that allows users to search for GitHub repositories by keyword, store the results in a database, and display them on a dashboard. This project demonstrates how to connect a frontend (React) to a backend (Node.js/Express), interact with a public API (GitHub), and persist data in a database (MongoDB).

---

## How It Works
1. **User Input (Frontend):**
	- The user enters a keyword in the search form on the React dashboard.

2. **API Request (Backend):**
	- The React app sends a request to the backend (`/api/search`) with the keyword.
	- The backend uses Axios to fetch repository data from the GitHub API, using your GitHub token for authentication.

3. **Database Storage:**
	- The backend processes the GitHub response, extracts relevant repo details, and saves them in MongoDB.

4. **Dashboard Display:**
	- The React app fetches stored results from the backend (`/api/results`) and displays them in a styled dashboard with pagination.

5. **Error Handling:**
	- If there’s an API or database error, the app shows a clear error message.

---

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB (Atlas)

## Features
- Search GitHub repos by keyword
- Store results in database
- Dashboard with pagination
- Error handling

## Setup Instructions

### 1. Backend
```
cd server
npm install
# Set up .env with MongoDB URI and GitHub token
npm start
```

### 2. Frontend
```
cd client
npm install
npm start
```

## Deployment
- See deployment instructions in this README.

## Demo
- [Hosted Link](#)

## License
MIT
