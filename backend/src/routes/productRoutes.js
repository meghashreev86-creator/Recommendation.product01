import express from 'express';
import { products, interactions } from '../data/sampleData.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { getSimilarProducts } from '../utils/recommendationEngine.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { search = '', category = '' } = req.query;
  const filtered = products.filter(p => {
    const text = [p.name, p.brand, p.description, p.category, ...(p.tags || [])].join(' ').toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });
  res.json(filtered);
});

router.get('/categories', (req, res) => res.json([...new Set(products.map(p => p.category))]));

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.get('/:id/similar', (req, res) => res.json(getSimilarProducts(req.params.id, products, 6)));

router.post('/', requireAuth, requireAdmin, (req, res) => {
  const product = { id: `p${Date.now()}`, rating: 4, stock: 10, tags: [], ...req.body };
  products.push(product);
  res.status(201).json(product);
});

router.put('/:id', requireAuth, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

router.delete('/:id', requireAuth, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

router.post('/:id/interactions', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const userId = String(req.body?.userId || '').trim() || 'guest';
  const allowedTypes = new Set(['view', 'click', 'add_to_cart', 'purchase']);
  const type = allowedTypes.has(req.body?.type) ? req.body.type : 'view';
  interactions.push({ userId, productId: req.params.id, type, timestamp: Date.now() });
  res.status(201).json({ message: 'Interaction logged' });
});

export default router;
