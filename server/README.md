# Server Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Set up your `.env` file with your MongoDB Atlas URI.
3. Start the server:
   ```
   npm start
   ```

API Endpoints:
- `POST /api/search` — Search GitHub repos by keyword and store results
- `GET /api/results?page=1` — Get stored results with pagination
