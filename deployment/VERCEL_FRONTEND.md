# Vercel Frontend Deployment

1. Push this project to GitHub.
2. Open Vercel > Add New Project > Import GitHub Repository.
3. Select the repository.
4. Use these settings:

```txt
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Add environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

6. Click Deploy.
