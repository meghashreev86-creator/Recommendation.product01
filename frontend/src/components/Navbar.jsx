import React, { useEffect, useState } from 'react';
import { Heart, Search, ShoppingCart, Sparkles } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.hash = '#login';
  };

  return (
    <nav className="top-shell">
      <div className="top-shell-inner navbar-inline-shell">
        <button className="brand-mark" onClick={() => { window.location.hash = '#home'; }}>
          <Sparkles size={18} />
          <span>AI Recommend</span>
        </button>

        <div className="search-rail-inner glass-card navbar-search-shell">
          <div className="search-input-wrap">
            <Search size={18} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search products, brands, or categories"
            />
          </div>
        </div>

        <div className="navbar-link-row">
          <div className="main-nav navbar-primary-links">
            <a href="#products">Products</a>
            <a href="#products">Categories</a>
            <a href="#about">About</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#about">Contact Us</a>
          </div>

          <div className="navbar-utility-links">
            <a href="#wishlist"><Heart size={15} />Wishlist</a>
            <a href="#cart"><ShoppingCart size={15} />Cart</a>
            <DropdownMenu
              user={user || { name: 'Guest', email: 'Login to continue' }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
