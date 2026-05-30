import express from 'express';
import { ratings, products } from '../data/sampleData.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { userId, productId, rating } = req.body;
  if (!userId || !productId || rating === undefined || rating === null) return res.status(400).json({ message: 'userId, productId and rating are required' });
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const numericRating = Number(rating);
  if (!Number.isFinite(numericRating)) return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
  const value = Math.min(5, Math.max(1, numericRating));
  const existing = ratings.find(r => r.userId === userId && r.productId === productId);
  const statusCode = existing ? 200 : 201;
  if (existing) existing.rating = value;
  else ratings.push({ userId, productId, rating: value });
  const productRatings = ratings.filter(r => r.productId === productId);
  if (product && productRatings.length) product.rating = Number((productRatings.reduce((s, r) => s + r.rating, 0) / productRatings.length).toFixed(1));
  res.status(statusCode).json({ message: 'Rating saved', rating: { userId, productId, rating: value }, productRating: product.rating });
});

router.get('/', (req, res) => res.json(ratings));

export default router;
