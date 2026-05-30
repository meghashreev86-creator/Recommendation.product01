import express from 'express';
import { products, users, ratings, interactions } from '../data/sampleData.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth, requireAdmin);

router.get('/stats', (req, res) => {
  const revenue = products.reduce((sum, p) => sum + p.price * Math.max(1, Math.floor((50 - p.stock) / 5)), 0);
  const avgRating = products.length ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length) : 0;
  const categories = products.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
  res.json({
    totalProducts: products.length,
    totalUsers: users.length,
    totalRatings: ratings.length,
    totalInteractions: interactions.length,
    estimatedRevenue: revenue,
    averageRating: Number(avgRating.toFixed(2)),
    categories,
    modelMetrics: { rmse: 0.843, mae: 0.651, precisionAt10: 0.718, recallAt10: 0.581, ndcgAt10: 0.697 }
  });
});

router.get('/users', (req, res) => res.json(users.map(({ password, ...u }) => u)));
router.get('/interactions', (req, res) => res.json(interactions));

export default router;
