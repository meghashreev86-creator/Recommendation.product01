import React, { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  Brain,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  Facebook,
  Instagram,
  Shield,
  Sparkles,
  TrendingUp,
  Truck,
  Twitter,
  Users,
  Zap
} from 'lucide-react';
import { api } from '../utils/api';

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.4-.2-2.1H12z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.7-2.6l-3-2.3c-.8.5-1.9.9-3.7.9-2.8 0-5.2-1.9-6.1-4.5l-3.1 2.4C4.6 19.5 8 22 12 22z" />
      <path fill="#4A90E2" d="M5.9 13.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5L2.8 8.1C2.3 9.2 2 10.6 2 12s.3 2.8.8 3.9l3.1-2.4z" />
      <path fill="#FBBC05" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3.1 14.7 2 12 2 8 2 4.6 4.5 2.8 8.1l3.1 2.4C6.8 7.9 9.2 6 12 6z" />
    </svg>
  );
}

const socialProviders = [
  { key: 'google', icon: GoogleIcon, label: 'Google' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'twitter', icon: Twitter, label: 'Twitter/X' },
  { key: 'facebook', icon: Facebook, label: 'Facebook' }
];

const showcaseProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 'Rs. 159,900',
    rating: '4.9',
    reviews: '2,847 reviews',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    tag: 'AI fit match'
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 'Rs. 29,990',
    rating: '4.9',
    reviews: '5,231 reviews',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    tag: 'Top signal'
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    price: 'Rs. 199,990',
    rating: '4.9',
    reviews: '1,872 reviews',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    tag: 'Recommended'
  }
];

function StatPill({ icon: Icon, value, label, tone }) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: '14px',
        background: tone,
        border: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center'
      }}
    >
      <Icon size={14} style={{ color: '#fff', marginBottom: '6px' }} />
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.68)' }}>{label}</div>
    </div>
  );
}

export default function Login({ mode, onBack, onSwitchMode, onAuthSuccess }) {
  const isSignup = mode === 'signup';
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    remember: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  async function completeAuth(data) {
    const userData = {
      ...data.user,
      name: data.user.name || form.name || 'Shopper'
    };

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');

    if (form.remember) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', data.token);
    }

    onAuthSuccess(userData);
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!form.email || !form.password) {
      setError('Please enter email and password');
      setIsSubmitting(false);
      return;
    }

    if (isSignup && !form.name) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (isSignup && form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isSignup ? '/auth/register' : '/auth/login';
      const payload = isSignup
        ? { name: form.name.trim(), email: form.email.trim(), password: form.password }
        : { email: form.email.trim(), password: form.password };

      const data = await api(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        attachAuth: false
      });

      await completeAuth(data);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function socialLogin(provider) {
    setError('');
    setIsSubmitting(true);
    try {
      const data = await api('/auth/social', {
        method: 'POST',
        body: JSON.stringify({ provider }),
        attachAuth: false
      });

      if (!data.user.name) {
        data.user.name = data.user.email?.split('@')[0] || 'User';
      }

      await completeAuth(data);
    } catch (err) {
      setError(err.message || `Login with ${provider} failed`);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % showcaseProducts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const product = showcaseProducts[activeProduct];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '18px',
        background:
          'radial-gradient(circle at top, rgba(0,255,255,0.12), transparent 30%), linear-gradient(135deg, #060810 0%, #0f1730 55%, #111827 100%)'
      }}
    >
      <div
        className="login-auth-shell"
        style={{
          width: '100%',
          maxWidth: '1180px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          overflow: 'hidden',
          borderRadius: '28px',
          boxShadow: '0 28px 70px rgba(0,0,0,0.38)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <section
          style={{
            padding: '24px',
            background: 'linear-gradient(180deg, rgba(7,12,26,0.96), rgba(14,23,47,0.94))',
            color: '#fff'
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              marginBottom: '18px'
            }}
          >
            Back
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)' }}>
              <Brain size={14} />
              <span style={{ fontSize: '11px', fontWeight: 700 }}>AI ENGINE LIVE</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#8fffe4' }}>
              <Activity size={12} />
              <span style={{ fontSize: '11px', fontWeight: 600 }}>98% confidence</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <StatPill icon={Users} value="500K+" label="Active users" tone="rgba(0,255,255,0.09)" />
            <StatPill icon={BarChart3} value="98%" label="Match rate" tone="rgba(138,43,226,0.10)" />
            <StatPill icon={TrendingUp} value="10K+" label="Products" tone="rgba(255,215,0,0.10)" />
          </div>

          <div
            style={{
              padding: '18px',
              borderRadius: '22px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px', borderRadius: '999px', background: 'rgba(0,255,255,0.10)', border: '1px solid rgba(0,255,255,0.16)', marginBottom: '14px' }}>
              <Zap size={12} style={{ color: '#00ffff' }} />
              <span style={{ fontSize: '11px', color: '#9cf9ff', fontWeight: 600 }}>{product.tag}</span>
              <Sparkles size={11} style={{ color: '#ffd76a' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', alignItems: 'center' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  boxShadow: '0 18px 36px rgba(0,0,0,0.28)'
                }}
              />
              <div style={{ minWidth: 0 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '20px', lineHeight: 1.2 }}>{product.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '20px', color: '#8df9ff' }}>{product.price}</strong>
                  <span style={{ fontSize: '12px', color: '#ffd76a' }}>{product.rating} rating</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.66)' }}>{product.reviews}</span>
                </div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.70)', fontSize: '13px', lineHeight: 1.6 }}>
                  Premium recommendations powered by behavior signals, social proof, and machine learning ranking.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '18px' }}>
            {[
              { icon: Shield, label: 'AI Powered' },
              { icon: CreditCard, label: 'Secure Payments' },
              { icon: Truck, label: 'Fast Delivery' },
              { icon: Clock, label: '24/7 Support' }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
                  <Icon size={12} style={{ color: '#9cf9ff' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.76)' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          style={{
            padding: '28px 26px',
            background: 'rgba(255,255,255,0.97)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', marginBottom: '10px', color: '#5b5ce8' }}>
                WELCOME BACK
              </div>
              <h2 style={{ margin: '0 0 6px', fontSize: '28px', lineHeight: 1.1, color: '#111827' }}>
                {isSignup ? 'Sign Up' : 'Login'}
              </h2>
              <p style={{ margin: 0, color: '#667085', fontSize: '13px', lineHeight: 1.6 }}>
                {isSignup ? 'Sign Up to access premium AI-powered shopping.' : 'Login to access your personalized AI recommendations.'}
              </p>
            </div>

            {error && (
              <div style={{ background: '#fff1f2', color: '#b42318', padding: '10px 12px', borderRadius: '12px', fontSize: '12px', marginBottom: '16px', border: '1px solid #fecdd3' }}>
                {error}
              </div>
            )}

            <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
              {isSignup && (
                <input
                  type="text"
                  value={form.name}
                  onChange={event => setForm({ ...form, name: event.target.value })}
                  placeholder="Full name"
                  style={{ padding: '12px 14px', border: '1px solid #d0d5dd', borderRadius: '12px', fontSize: '13px' }}
                />
              )}

              <input
                type="email"
                value={form.email}
                onChange={event => setForm({ ...form, email: event.target.value })}
                placeholder="Email address"
                style={{ padding: '12px 14px', border: '1px solid #d0d5dd', borderRadius: '12px', fontSize: '13px' }}
              />

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={event => setForm({ ...form, password: event.target.value })}
                  placeholder="Password"
                  style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1px solid #d0d5dd', borderRadius: '12px', fontSize: '13px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 0, background: 'transparent', color: '#667085' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '2px', flexWrap: 'wrap' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#475467', fontSize: '12px' }}>
                  <input type="checkbox" checked={form.remember} onChange={event => setForm({ ...form, remember: event.target.checked })} />
                  Remember me
                </label>
                {!isSignup && (
                  <button type="button" onClick={() => setError('Password reset link sent!')} style={{ border: 0, background: 'transparent', color: '#5b5ce8', fontSize: '12px', fontWeight: 600 }}>
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '6px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: 'linear-gradient(135deg, #111827 0%, #253b80 100%)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 12px 24px rgba(37,59,128,0.18)'
                }}
              >
                {isSubmitting ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Login')}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#eaecf0' }} />
              <span style={{ fontSize: '11px', color: '#98a2b3' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: '#eaecf0' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              {socialProviders.map(provider => {
                const Icon = provider.icon;
                return (
                  <button
                    key={provider.key}
                    onClick={() => socialLogin(provider.key)}
                    aria-label={`Continue with ${provider.label}`}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '999px',
                      border: '1px solid #d0d5dd',
                      background: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#344054',
                      boxShadow: '0 8px 18px rgba(16,24,40,0.06)'
                    }}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', color: '#667085', fontSize: '13px' }}>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => onSwitchMode(isSignup ? 'login' : 'signup')}
                style={{ border: 0, background: 'transparent', color: '#5b5ce8', fontWeight: 700, fontSize: '13px' }}
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-auth-shell {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
