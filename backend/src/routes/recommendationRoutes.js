import express from 'express';
import { products, ratings, interactions } from '../data/sampleData.js';
import { getHybridRecommendations, getPopularProducts, getSimilarProducts } from '../utils/recommendationEngine.js';

const router = express.Router();

function parseLimit(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

router.get('/popular/all', (req, res) => res.json(getPopularProducts(products, parseLimit(req.query.limit, 8))));
router.get('/similar/:productId', (req, res) => res.json(getSimilarProducts(req.params.productId, products, parseLimit(req.query.limit, 6))));
router.get('/:userId', (req, res) => {
  const data = getHybridRecommendations(req.params.userId, products, ratings, interactions, parseLimit(req.query.limit, 8));
  res.json({ algorithm: 'Hybrid Recommendation: Content + Popularity + User Behaviour', recommendations: data });
});

export default router;
