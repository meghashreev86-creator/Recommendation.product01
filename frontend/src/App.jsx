import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, Sparkles, UserRound, X } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutContact from './pages/AboutContact';
import Footer from './components/Footer';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import LegalPage from './pages/LegalPage';
import FooterContentPage from './pages/FooterContentPage';
import { buildCatalog } from './data/mockCatalog';

const protectedPages = new Set(['dashboard']);

function storageKey(prefix, user) {
  return `${prefix}_${user?.id || 'guest'}`;
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

function readStoredToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
}

function readRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '').trim();
  if (!hash) return { page: 'home' };

  const [page, param] = hash.split('/');
  if (page === 'product') return { page: 'product', productId: param || '' };
  if (page === 'legal') return { page: 'legal', legalType: param || 'privacy' };
  if (page === 'content') return { page: 'content', slug: param || 'about' };

  const allowed = new Set(['home', 'products', 'login', 'signup', 'dashboard', 'about', 'cart', 'wishlist']);
  return allowed.has(page) ? { page } : { page: 'home' };
}

function routeToHash(route) {
  if (route.page === 'home') return '';
  if (route.page === 'product') return `#product/${route.productId || ''}`;
  if (route.page === 'legal') return `#legal/${route.legalType || 'privacy'}`;
  if (route.page === 'content') return `#content/${route.slug || 'about'}`;
  return `#${route.page}`;
}

function decodeTokenPayload(token) {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function App() {
  const [route, setRoute] = useState(() => readRouteFromHash());
  const [user, setUser] = useState(readStoredUser);
  const [searchValue, setSearchValue] = useState('');
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [catalogCache, setCatalogCache] = useState([]);
  const [recommendationCache, setRecommendationCache] = useState([]);
  const [catalogRefreshKey, setCatalogRefreshKey] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]');
  });
  const [privacyPrefs, setPrivacyPrefs] = useState({
    cookies: true,
    personalization: true,
    marketing: false
  });

  const page = route.page;
  const isAuthPage = page === 'login' || page === 'signup';
  const fallbackCatalog = useMemo(() => buildCatalog([]), []);
  const displayCatalog = catalogCache.length ? catalogCache : fallbackCatalog;
  const displayRecommendations = recommendationCache.length ? recommendationCache : fallbackCatalog.filter(item => item.isTrending).slice(0, 8);
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const wishlistProducts = useMemo(
    () => displayCatalog.filter(product => wishlistIds.includes(product.id)),
    [displayCatalog, wishlistIds]
  );
  const selectedProduct = useMemo(
    () => displayCatalog.find(product => product.id === route.productId) || null,
    [displayCatalog, route.productId]
  );

  useEffect(() => {
    const handleHashChange = () => setRoute(readRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const nextHash = routeToHash(route);
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    }
  }, [route]);

  useEffect(() => {
    const storedPrefs = JSON.parse(localStorage.getItem('privacy_prefs') || 'null');
    if (storedPrefs) setPrivacyPrefs(storedPrefs);
  }, []);

  useEffect(() => {
    localStorage.setItem('privacy_prefs', JSON.stringify(privacyPrefs));
  }, [privacyPrefs]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(storageKey('cart', user)) || '[]');
    const wishlist = JSON.parse(localStorage.getItem(storageKey('wishlist', user)) || '[]');
    const ordersData = JSON.parse(localStorage.getItem(storageKey('orders', user)) || '[]');
    const activity = JSON.parse(localStorage.getItem(storageKey('activity', user)) || '[]');
    setCartItems(Array.isArray(cart) ? cart : []);
    setWishlistIds(Array.isArray(wishlist) ? wishlist : []);
    setOrders(Array.isArray(ordersData) ? ordersData : []);
    setRecentActivity(Array.isArray(activity) ? activity : []);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(storageKey('cart', user), JSON.stringify(cartItems));
  }, [cartItems, user]);

  useEffect(() => {
    localStorage.setItem(storageKey('wishlist', user), JSON.stringify(wishlistIds));
  }, [wishlistIds, user]);

  useEffect(() => {
    localStorage.setItem(storageKey('orders', user), JSON.stringify(orders));
  }, [orders, user]);

  useEffect(() => {
    localStorage.setItem(storageKey('activity', user), JSON.stringify(recentActivity));
  }, [recentActivity, user]);

  useEffect(() => {
    const token = readStoredToken();
    const payload = token ? decodeTokenPayload(token) : null;
    if (payload?.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
      if (protectedPages.has(page)) setRoute({ page: 'login' });
    }
  }, [page]);

  useEffect(() => {
    if (!user && protectedPages.has(page)) setRoute({ page: 'login' });
  }, [page, user]);

  useEffect(() => {
    if (page === 'product' && route.productId && !selectedProduct && displayCatalog.length) {
      setRoute({ page: 'products' });
    }
  }, [displayCatalog.length, page, route.productId, selectedProduct]);

  function navigate(nextPage, options = {}) {
    setMobileNavOpen(false);
    setProfileOpen(false);
    if (options.dashboardTab) setDashboardTab(options.dashboardTab);
    if (nextPage === 'product') {
      setRoute({ page: 'product', productId: options.productId || '' });
      return;
    }
    if (nextPage === 'legal') {
      setRoute({ page: 'legal', legalType: options.legalType || 'privacy' });
      return;
    }
    if (nextPage === 'content') {
      setRoute({ page: 'content', slug: options.slug || 'about' });
      return;
    }
    setRoute({ page: nextPage });
  }

  function addActivity(action, product) {
    const entry = {
      id: `a_${Date.now()}`,
      action,
      productId: product?.id || '',
      productName: product?.name || '',
      timestamp: new Date().toISOString()
    };
    setRecentActivity(prev => [entry, ...prev].slice(0, 30));

    if (action === 'Viewed product details' && product) {
      saveRecentlyViewed(product);
    }
  }

  function saveRecentlyViewed(product) {
    if (!product) return;

    const viewedProduct = {
      id: product.id,
      name: product.name,
      image: product.image || product.image_url,
      price: product.price,
      rating: product.rating,
      category: product.category,
      viewedAt: new Date().toISOString()
    };

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== viewedProduct.id);
      const updated = [viewedProduct, ...filtered].slice(0, 20);
      localStorage.setItem('recentlyViewedProducts', JSON.stringify(updated));
      return updated;
    });
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('home');
  }

  function addToCart(product, quantity = 1) {
    const safeQty = Math.max(1, Number(quantity) || 1);
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + safeQty } : item);
      }
      return [...prev, { product, quantity: safeQty }];
    });
    addActivity('Added to cart', product);
  }

  function updateCartQuantity(productId, quantity) {
    const safeQty = Math.max(1, Number(quantity) || 1);
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: safeQty } : item));
  }

  function removeFromCart(productId) {
    const removed = cartItems.find(item => item.product.id === productId);
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    if (removed) addActivity('Removed from cart', removed.product);
  }

  function toggleWishlist(product) {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        addActivity('Removed from wishlist', product);
        return prev.filter(id => id !== product.id);
      }
      addActivity('Added to wishlist', product);
      return [...prev, product.id];
    });
  }

  function placeOrder(orderDraft) {
    if (!cartItems.length) return;
    if (!user) {
      navigate('login');
      return null;
    }
    const newOrder = {
      id: orderDraft?.id || `o_${Date.now()}`,
      transactionId: orderDraft?.transactionId || `txn_${Date.now()}`,
      items: orderDraft?.items || cartItems.map(item => ({ ...item.product, quantity: item.quantity })),
      total: orderDraft?.total || cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      createdAt: orderDraft?.createdAt || new Date().toISOString(),
      status: orderDraft?.status || 'Placed',
      paymentMethod: orderDraft?.paymentMethod || 'N/A',
      paymentDetails: orderDraft?.paymentDetails || null,
      address: orderDraft?.address || null
    };
    setOrders(prev => [newOrder, ...prev]);
    cartItems.forEach(item => addActivity('Ordered product', item.product));
    setCartItems([]);
    return newOrder;
  }

  const showSearchRail = ['home', 'products', 'dashboard', 'about', 'wishlist', 'cart', 'content'].includes(page);

  return (
    <div className="app-shell">
      {!isAuthPage && (
        <header className="top-shell">
          <div className="top-shell-inner">
            <button className="brand-mark" onClick={() => navigate('home')}>
              <Sparkles size={18} />
              <span>AI Recommend</span>
            </button>

            <button className="mobile-nav-toggle" onClick={() => setMobileNavOpen(prev => !prev)} aria-label="Toggle navigation">
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <nav className={`main-nav ${mobileNavOpen ? 'open' : ''}`}>
              <button onClick={() => navigate('products')}>Products</button>
              <button onClick={() => navigate('products')}>Categories</button>
              <button onClick={() => navigate('about')}>About</button>
              <button onClick={() => navigate(user ? 'dashboard' : 'login')}>Dashboard</button>
              <button onClick={() => navigate('about')}>Contact Us</button>
              <button onClick={() => navigate('wishlist')}>
                <Heart size={15} />
                Wishlist
              </button>
              <button onClick={() => navigate('cart')}>
                <ShoppingCart size={15} />
                Cart
                <span className="count-pill">{cartCount}</span>
              </button>
            </nav>

            <div className="profile-menu-wrap">
              <button className="avatar-button" onClick={() => setProfileOpen(prev => !prev)}>
                <UserRound size={16} />
                <span>{user ? user.name.slice(0, 1).toUpperCase() : 'G'}</span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown glass-card">
                  {user ? (
                    <>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                      <button onClick={() => navigate('dashboard', { dashboardTab: 'profile' })}>Profile</button>
                      <button onClick={() => navigate('dashboard', { dashboardTab: 'settings' })}>Settings</button>
                      {user.role === 'admin' && <button onClick={() => navigate('dashboard', { dashboardTab: 'overview' })}>Admin panel</button>}
                      <button onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                      <strong>Guest</strong>
                      <span>Secure login required for protected views</span>
                      <button onClick={() => navigate('login')}>Login</button>
                      <button onClick={() => navigate('signup')}>Sign up</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {showSearchRail && (
            <div className="search-rail">
              <div className="search-rail-inner glass-card">
                <div className="search-input-wrap">
                  <Search size={18} />
                  <input
                    value={searchValue}
                    onChange={event => {
                      const val = event.target.value;
                      setSearchValue(val);
                      if (val.trim() && !['home', 'products'].includes(page)) {
                        navigate('products');
                      }
                    }}
                    placeholder="Search by product name, category, brand, or tags"
                  />
                </div>
                <div className="rail-shortcuts">
                  <button onClick={() => { setSearchValue('AI'); navigate('products'); }}>AI gear</button>
                  <button onClick={() => { setSearchValue('smart'); navigate('products'); }}>Smart home</button>
                  <button onClick={() => { setSearchValue('gaming'); navigate('products'); }}>Gaming</button>
                </div>
              </div>
            </div>
          )}
        </header>
      )}

      {page === 'home' && (
        <Home
          user={user}
          searchValue={searchValue}
          wishlistIds={wishlistIds}
          recentActivity={recentActivity}
          onRequestLogin={() => navigate('login')}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          onAddActivity={addActivity}
          onNavigate={navigate}
          onCatalogReady={setCatalogCache}
          onRecommendationsReady={setRecommendationCache}
          refreshKey={catalogRefreshKey}
        />
      )}

      {page === 'products' && (
        <ProductsPage
          products={displayCatalog}
          wishlistIds={wishlistIds}
          searchValue={searchValue}
          onBack={() => navigate('home')}
          onOpenProduct={product => {
            saveRecentlyViewed(product);
            navigate('product', { productId: product.id });
          }}
          onAddActivity={addActivity}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      )}

      {page === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          relatedProducts={displayCatalog.filter(item => item.id !== selectedProduct.id && item.category === selectedProduct.category).slice(0, 6)}
          latestProducts={displayCatalog.filter(item => item.isLatest && item.id !== selectedProduct.id).slice(0, 6)}
          dailyDeals={displayCatalog.filter(item => item.id !== selectedProduct.id).slice(0, 6)}
          moreToExplore={displayCatalog.filter(item => item.id !== selectedProduct.id).slice(6, 12)}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onViewProduct={saveRecentlyViewed}
          onAddActivity={addActivity}
          onBack={() => navigate('products')}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          onOpenProduct={product => {
            saveRecentlyViewed(product);
            navigate('product', { productId: product.id });
          }}
        />
      )}

      {page === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onBack={() => navigate('home')}
          onUpdateCartQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
          onPlaceOrder={placeOrder}
          onExploreProducts={() => navigate('products')}
          onViewOrders={() => navigate('dashboard', { dashboardTab: 'orders' })}
        />
      )}

      {page === 'wishlist' && (
        <WishlistPage
          products={displayCatalog}
          wishlistIds={wishlistIds}
          onBack={() => navigate('home')}
          onOpenProduct={product => navigate('product', { productId: product.id })}
          onAddActivity={addActivity}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      )}

      {(page === 'login' || page === 'signup') && (
        <Login
          mode={page}
          onBack={() => navigate('home')}
          onSwitchMode={nextMode => navigate(nextMode)}
          onAuthSuccess={loggedInUser => {
            setUser(loggedInUser);
            navigate('dashboard');
          }}
        />
      )}

      {page === 'dashboard' && (
        <Dashboard
          user={user}
          activeTab={dashboardTab}
          onTabChange={setDashboardTab}
          recommendations={displayRecommendations}
          orders={orders}
          wishlistProducts={wishlistProducts}
          wishlistIds={wishlistIds}
          recentActivity={recentActivity}
          recentlyViewed={recentlyViewed}
          products={displayCatalog}
          onOpenProduct={product => navigate('product', { productId: product.id })}
          onOpenLegalPage={type => navigate('legal', { legalType: type })}
          onBack={() => navigate('home')}
          onLogout={handleLogout}
          onCatalogRefresh={async () => {
            setCatalogRefreshKey(prev => prev + 1);
          }}
        />
      )}

      {page === 'about' && (
        <AboutContact onOpenLegalPage={type => navigate('legal', { legalType: type })} onBack={() => navigate('home')} />
      )}

      {page === 'legal' && (
        <LegalPage
          type={route.legalType}
          prefs={privacyPrefs}
          onPrefsChange={setPrivacyPrefs}
          onBack={() => navigate('home')}
        />
      )}

      {page === 'content' && (
        <FooterContentPage
          slug={route.slug}
          products={displayCatalog}
          wishlistIds={wishlistIds}
          user={user}
          onBack={() => navigate('home')}
          onNavigate={navigate}
          onOpenProduct={product => {
            saveRecentlyViewed(product);
            navigate('product', { productId: product.id });
          }}
          onAddActivity={addActivity}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      )}

      {!isAuthPage && <Footer onNavigate={navigate} />}
    </div>
  );
}
