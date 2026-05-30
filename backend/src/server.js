import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
await connectDB();

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173'
].filter(Boolean));

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);

    if (process.env.NODE_ENV !== 'production') {
      // In local development allow custom local-network URLs like http://192.168.x.x:5173
      return callback(null, true);
    }

    return callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ message: 'AI Product Recommendation API is running' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK', project: 'AI Powered Product Recommendation using Machine Learning' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);

app.use((error, req, res, next) => {
  if (error?.message?.startsWith('CORS:')) {
    return res.status(403).json({ message: 'CORS blocked this request origin' });
  }
  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
});

app.use((req, res) => res.status(404).json({ message: 'API route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
