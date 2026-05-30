# AI Powered Product Recommendation Using Machine Learning

A full-stack recommendation app with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB Atlas support with in-memory sample-data fallback
- Hybrid recommendation engine (content + popularity + behavior)
- Admin analytics dashboard

## Folder Structure

```txt
ai_product_recommendation_app/
|-- backend/
|   |-- src/
|   |   |-- config/db.js
|   |   |-- data/sampleData.js
|   |   |-- middleware/auth.js
|   |   |-- models/*.js
|   |   |-- routes/*.js
|   |   |-- utils/recommendationEngine.js
|   |   `-- server.js
|   |-- .env.example
|   |-- package.json
|   `-- render.yaml
|-- frontend/
|   |-- src/
|   |   |-- components/*.jsx
|   |   |-- pages/*.jsx
|   |   |-- styles/index.css
|   |   |-- utils/api.js
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- .env.example
|   |-- package.json
|   |-- vercel.json
|   `-- vite.config.js
|-- dataset/
|-- deployment/
`-- package.json
```

## Run Locally

1. Open `ai_product_recommendation_app` in VS Code.
2. Install dependencies:

```bash
npm install
npm run install:all
```

If PowerShell blocks `npm` scripts on your system, use:

```powershell
npm.cmd install
npm.cmd run install:all
```

3. Create env files:

Backend:

```powershell
cd backend
Copy-Item .env.example .env
```

Frontend:

```powershell
cd ../frontend
Copy-Item .env.example .env
```

4. From root, start both apps:

```bash
npm run dev
```

PowerShell alternative:

```powershell
npm.cmd run dev
```

Frontend: `http://localhost:5173`  
Backend health: `http://localhost:5000/api/health`

## Default Login

- User: `user@example.com / password123`
- Admin: `admin@example.com / admin123`
- Social buttons available: Google, Facebook, Instagram

## MongoDB Atlas Setup

In `backend/.env`, replace:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/ai_recommendation
```

If MongoDB is unavailable, the app still works with in-memory sample data.

## Vercel Frontend Deployment

Deploy the `frontend` folder.

- Framework Preset: Vite
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Set:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

## Render Backend Deployment

Deploy the `backend` folder.

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Set:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=change_this_secret
CLIENT_URL=https://your-vercel-frontend.vercel.app
```

## Common Fixes

- Missing `package.json`: switch to the correct folder.
- Vercel output directory error: set exactly `dist`.
- CORS error: set `CLIENT_URL` on backend.
- MongoDB auth error: verify credentials and network access (`0.0.0.0/0` for testing).
- Port in use: change `PORT` in `backend/.env` or stop the other process.
- Login issue: ensure backend is running on port `5000` and frontend `.env` has `VITE_API_URL=http://localhost:5000/api`.
