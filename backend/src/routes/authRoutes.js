import express from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../data/sampleData.js';
import { signToken } from '../middleware/auth.js';

const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function getSocialProfile(provider) {
  const map = {
    google: { name: 'Google User', email: 'google.user@example.com' },
    facebook: { name: 'Facebook User', email: 'facebook.user@example.com' },
    instagram: { name: 'Instagram User', email: 'instagram.user@example.com' },
    twitter: { name: 'Twitter User', email: 'twitter.user@example.com' },
    x: { name: 'Twitter User', email: 'twitter.user@example.com' }
  };
  return map[provider] || null;
}

router.post('/register', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
  if (!emailRegex.test(email)) return res.status(400).json({ message: 'Please provide a valid email address' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  const exists = users.find(u => normalizeEmail(u.email) === email);
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: `u${Date.now()}`, name, email, password: hashedPassword, role: 'user', createdAt: new Date().toISOString() };
  users.push(user);
  const { password: _, ...safeUser } = user;
  res.status(201).json({ user: safeUser, token: signToken(user) });
});

router.post('/login', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = users.find(u => normalizeEmail(u.email) === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const storedPassword = String(user.password || '');
  const ok = storedPassword.startsWith('$2') ? await bcrypt.compare(password, storedPassword) : password === storedPassword;
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token: signToken(user) });
});

router.post('/social', async (req, res) => {
  const provider = String(req.body?.provider || '').trim().toLowerCase();
  const profile = getSocialProfile(provider);
  if (!profile) return res.status(400).json({ message: 'Unsupported social provider' });

  let user = users.find(u => normalizeEmail(u.email) === profile.email);
  if (!user) {
    const password = await bcrypt.hash(`social_${provider}_${Date.now()}`, 10);
    user = {
      id: `u${Date.now()}`,
      name: profile.name,
      email: profile.email,
      password,
      role: 'user',
      authProvider: provider,
      createdAt: new Date().toISOString()
    };
    users.push(user);
  } else {
    user.authProvider = provider;
  }

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token: signToken(user) });
});

export default router;
