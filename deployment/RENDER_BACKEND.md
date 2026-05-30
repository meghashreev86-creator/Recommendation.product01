# Render Backend Deployment

1. Push this project to GitHub.
2. Open Render > New > Web Service.
3. Connect your GitHub repository.
4. Use these settings:

```txt
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

5. Add environment variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_recommendation
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-vercel-frontend.vercel.app
NODE_ENV=production
```

6. Deploy and copy the Render URL.
7. Paste that URL in Vercel as `VITE_API_URL` with `/api` at the end.
