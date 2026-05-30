import React, { useEffect, useMemo, useState } from 'react';
import { Activity, BrainCircuit, Heart, LogOut, PackageCheck, Settings2, ShieldCheck, Sparkles, UserRound, Star } from 'lucide-react';
import { api } from '../utils/api';
import BackButton from '../components/BackButton';
import { buildCatalog } from '../data/mockCatalog';
import { formatDateShort, formatInr } from '../utils/formatters';

const tabs = [
  { key: 'overview', label: 'Overview', icon: Sparkles },
  { key: 'recommendations', label: 'Recommendations', icon: BrainCircuit },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'orders', label: 'Orders', icon: PackageCheck },
  { key: 'profile', label: 'Profile', icon: UserRound },
  { key: 'settings', label: 'Settings', icon: Settings2 },
  { key: 'logout', label: 'Logout', icon: LogOut }
];

const emptyAdminForm = {
  name: '',
  brand: '',
  category: '',
  price: '',
  rating: '4.5',
  stock: '10',
  image: '',
  description: '',
  tags: ''
};

export default function Dashboard({
  user,
  activeTab,
  onTabChange,
  recommendations = [],
  orders = [],
  wishlistProducts = [],
  wishlistIds = [],
  recentActivity = [],
  recentlyViewed = [],
  products = [],
  onOpenProduct,
  onAddActivity,
  onOpenLegalPage,
  onBack,
  onLogout,
  onCatalogRefresh
}) {
  const productsViewedCount = recentlyViewed.length;
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminRatings, setAdminRatings] = useState([]);
  const [adminError, setAdminError] = useState('');
  const [adminForm, setAdminForm] = useState(emptyAdminForm);
  const [fallbackProducts, setFallbackProducts] = useState([]);
  const [managedProducts, setManagedProducts] = useState(products);
  const [editingProductId, setEditingProductId] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  useEffect(() => {
    setManagedProducts(products.length ? products : fallbackProducts);
  }, [fallbackProducts, products]);

  useEffect(() => {
    if (products.length) return undefined;
    api('/products', { attachAuth: false })
      .then(data => setFallbackProducts(buildCatalog(data || [])))
      .catch(() => setFallbackProducts(buildCatalog([])));
    return undefined;
  }, [products.length]);

  useEffect(() => {
    if (!user || user.role !== 'admin') return undefined;
    Promise.all([api('/admin/stats'), api('/admin/users'), api('/ratings')])
      .then(([stats, users, ratings]) => {
        setAdminStats(stats);
        setAdminUsers(users);
        setAdminRatings(ratings);
        setAdminError('');
      })
      .catch(err => setAdminError(err.message));
    return undefined;
  }, [user]);

  const displayProducts = products.length ? products : fallbackProducts;
  const displayWishlist = wishlistProducts.length ? wishlistProducts : displayProducts.filter(product => wishlistIds.includes(product.id));

  const topStats = useMemo(() => ([
    // Requirement 4 & 7: Update Products viewed count instantly
    { label: 'Products viewed', value: recentlyViewed.length }, 
    { label: 'Wishlist items', value: displayWishlist.length },
    { label: 'Orders placed', value: orders.length },
    { label: 'Recommendations', value: recommendations.length }
  ]), [displayWishlist.length, orders.length, recentlyViewed.length, recommendations.length]);

  function handleTabClick(tab) {
    if (tab === 'logout') {
      onLogout();
      return;
    }
    onTabChange(tab);
  }

  function handleProductClick(product) {
    if (onAddActivity) onAddActivity('Viewed product details', product);
    onOpenProduct(product);
  }

  function hydrateAdminForm(product) {
    setEditingProductId(product.id);
    setAdminForm({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || '',
      price: String(product.price || ''),
      rating: String(product.rating || 4.5),
      stock: String(product.stock || 10),
      image: product.image || '',
      description: product.description || '',
      tags: (product.tags || []).join(', ')
    });
  }

  function resetAdminForm() {
    setEditingProductId('');
    setAdminForm(emptyAdminForm);
  }

  async function saveProduct(event) {
    event.preventDefault();
    setIsSavingProduct(true);
    setAdminMessage('');
    try {
      const payload = {
        name: adminForm.name.trim(),
        brand: adminForm.brand.trim(),
        category: adminForm.category.trim(),
        price: Number(adminForm.price),
        rating: Number(adminForm.rating),
        stock: Number(adminForm.stock),
        image: adminForm.image.trim(),
        description: adminForm.description.trim(),
        tags: adminForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      if (editingProductId) {
        const updated = await api(`/products/${editingProductId}`, { method: 'PUT', body: JSON.stringify(payload) });
        setManagedProducts(prev => prev.map(item => item.id === updated.id ? { ...item, ...updated } : item));
        setAdminMessage('Product updated.');
      } else {
        const created = await api('/products', { method: 'POST', body: JSON.stringify(payload) });
        setManagedProducts(prev => [{ ...created }, ...prev]);
        setAdminMessage('Product added.');
      }
      resetAdminForm();
      await onCatalogRefresh();
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setIsSavingProduct(false);
    }
  }

  async function deleteProduct(productId) {
    try {
      await api(`/products/${productId}`, { method: 'DELETE' });
      setManagedProducts(prev => prev.filter(item => item.id !== productId));
      setAdminMessage('Product deleted.');
      await onCatalogRefresh();
    } catch (err) {
      setAdminMessage(err.message);
    }
  }

  if (!user) {
    return (
      <main className="page-shell dashboard-page">
        <BackButton label="< Back" onClick={onBack} />
        <section className="light-panel empty-page-panel">
          <h1>Protected dashboard</h1>
          <p>Login is required to access recommendations, orders, wishlist activity, and secure profile tools.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell dashboard-page">
      <BackButton label="< Back" onClick={onBack} />

      <section className="page-head">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Premium AI dashboard for {user.name}</h1>
          <p>Protected insights, recommendation analytics, orders, recent browsing intelligence, and account controls in one place.</p>
        </div>
      </section>

      <section className="dashboard-shell">
        <aside className="dashboard-nav glass-card">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                className={`dashboard-nav-button ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.key)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <div className="dashboard-content">
          <div className="dashboard-metrics">
            {topStats.map(item => (
              <article key={item.label} className="light-panel metric-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          {activeTab === 'overview' && (
            <section className="dashboard-ai-banner">
              <article className="light-panel dashboard-ai-banner-card">
                <span className="eyebrow">AI Intelligence Layer</span>
                <h2>Shopping signals, recommendations, and order activity stay synced in real time.</h2>
                <p>Use the dashboard to review saved orders, revisit high-intent products, and track what the recommendation engine is surfacing for you.</p>
              </article>
            </section>
          )}

          {(activeTab === 'overview' || activeTab === 'recommendations') && (
            <section className="light-panel">
              <div className="panel-header">
                <h2>{activeTab === 'overview' ? 'Overview' : 'Recommendations'}</h2>
                <Sparkles size={18} />
              </div>
              <div className="dashboard-item-list">
                {recommendations.slice(0, 6).map(product => (
                  <button
                    key={product.id} 
                    className="dashboard-item" 
                    onClick={() => handleProductClick(product)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      padding: '12px', 
                      width: '100%', 
                      textAlign: 'left',
                      minHeight: '75px'
                    }}
                  >
                    <img src={product.image} alt="" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ 
                        display: 'block', 
                        color: '#111827', 
                        fontSize: '14px', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        marginBottom: '2px'
                      }}>{product.name}</strong>
                      <span style={{ fontSize: '12px', color: '#667085', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.reason}</span>
                    </div>
                    <strong style={{ marginLeft: 'auto', whiteSpace: 'nowrap', color: '#111827', fontSize: '15px' }}>{formatInr(product.price)}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'overview' && (
            <section className="light-panel">
              <div className="panel-header">
                {/* Requirement 5: Clean Recently Viewed section */}
                <h2>Recently Viewed Products</h2> 
                <Activity size={18} />
              </div>
              <div className="dashboard-item-list">
                {recentlyViewed.length ? recentlyViewed.slice(0, 10).map(product => (
                  <button 
                    key={product.id} 
                    className="dashboard-item" 
                    onClick={() => handleProductClick(product)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      padding: '12px', 
                      width: '100%', 
                      textAlign: 'left',
                      minHeight: '85px'
                    }}
                  >
                    <img src={product.image} alt="" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Requirement 6: Fix layout, no overlapping text */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
                        <strong style={{ 
                          color: '#111827', 
                          fontSize: '14px',
                          lineHeight: '1.3',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>{product.name}</strong>
                        <small style={{ color: '#98a2b3', fontSize: '10px', flexShrink: 0 }}>{formatDateShort(product.viewedAt)}</small>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#667085' }}>{product.category}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#ffd700', fontSize: '12px' }}>
                            <Star size={10} fill="currentColor" />
                            {product.rating}
                          </div>
                        </div>
                        {/* Price aligned to the right as per Requirement 6 */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <strong style={{ color: '#111827', fontSize: '14px', display: 'block' }}>{formatInr(product.price)}</strong>
                          <span style={{ fontSize: '10px', color: '#667085', opacity: 0.8 }}>View Details</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )) : (
                  // Requirement 5: Empty state message
                  <div style={{ padding: '60px 40px', textAlign: 'center', color: '#888' }}>No products viewed yet.</div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'wishlist' && (
            <section className="light-panel">
              <div className="panel-header">
                <h2>Wishlist</h2>
                <Heart size={18} />
              </div>
              <div className="dashboard-item-list">
                {displayWishlist.length ? displayWishlist.map(product => (
                  <button key={product.id} className="dashboard-item" onClick={() => handleProductClick(product)}>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.category} - {product.source}</span>
                    </div>
                    <small>{formatInr(product.price)}</small>
                  </button>
                )) : <p>Your wishlist is empty.</p>}
              </div>
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="light-panel">
              <div className="panel-header">
                <h2>Orders</h2>
                <PackageCheck size={18} />
              </div>
              <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.length ? orders.map(order => (
                  <article key={order.id} className="light-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '16px', display: 'block' }}>Order ID: {order.id}</strong>
                        <small style={{ color: '#888' }}>Placed on: {new Date(order.createdAt).toLocaleString()}</small>
                      </div>
                      <span className="badge badge-hot" style={{ background: '#e8fff3', color: '#0f9d58', border: '1px solid #b7ebcb' }}>{order.status || 'Placed'}</span>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#111827' }}>Product Details</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.name}</div>
                            <small style={{ color: '#667085' }}>Qty: {item.quantity} x {formatInr(item.price)}</small>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '13px' }}>
                      <div><span style={{ color: '#667085', display: 'block' }}>Payment Method</span><strong>{order.paymentMethod || 'N/A'}</strong></div>
                      <div><span style={{ color: '#667085', display: 'block' }}>Transaction ID</span><strong>{order.transactionId || 'N/A'}</strong></div>
                      <div><span style={{ color: '#667085', display: 'block' }}>Delivery Address</span><strong>{order.address ? `${order.address.house}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}` : 'N/A'}</strong></div>
                      <div style={{ textAlign: 'right' }}><span style={{ color: '#667085', display: 'block' }}>Total Amount</span><strong style={{ fontSize: '18px', color: '#111827' }}>{formatInr(order.total)}</strong></div>
                    </div>
                  </article>
                )) : <p>No orders yet.</p>}
              </div>
            </section>
          )}

          {activeTab === 'profile' && (
            <section className="light-panel">
              <div className="panel-header">
                <h2>Profile</h2>
                <UserRound size={18} />
              </div>
              <div className="profile-grid">
                <div><span>Name</span><strong>{user.name}</strong></div>
                <div><span>Email</span><strong>{user.email}</strong></div>
                <div><span>Role</span><strong>{user.role}</strong></div>
                <div><span>Recent activity</span><strong>{recentActivity.length} events</strong></div>
              </div>
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="light-panel">
              <div className="panel-header">
                <h2>Settings</h2>
                <Settings2 size={18} />
              </div>
              <div className="settings-grid">
                <article className="setting-card">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>Your Privacy Choices</strong>
                    <p>Open policy pages and manage privacy preferences from the secure dashboard area.</p>
                  </div>
                  <button className="button-secondary" onClick={() => onOpenLegalPage('preferences')}>Open</button>
                </article>
                <article className="setting-card">
                  <Activity size={18} />
                  <div>
                    <strong>Session security</strong>
                    <p>JWT expiry, input validation, and role-based admin protection remain enabled.</p>
                  </div>
                </article>
              </div>
            </section>
          )}

          {user.role === 'admin' && (
            <section className="light-panel admin-panel">
              <div className="panel-header">
                <h2>Admin controls</h2>
                <ShieldCheck size={18} />
              </div>

              {adminError && <p className="status-banner error">{adminError}</p>}
              {adminMessage && <p className="status-banner info">{adminMessage}</p>}

              {adminStats && (
                <div className="dashboard-metrics admin-metrics">
                  <article className="light-panel metric-card"><span>Products</span><strong>{adminStats.totalProducts}</strong></article>
                  <article className="light-panel metric-card"><span>Users</span><strong>{adminStats.totalUsers}</strong></article>
                  <article className="light-panel metric-card"><span>Ratings</span><strong>{adminStats.totalRatings}</strong></article>
                  <article className="light-panel metric-card"><span>Interactions</span><strong>{adminStats.totalInteractions}</strong></article>
                </div>
              )}

              <div className="admin-grid">
                <form className="admin-form" onSubmit={saveProduct}>
                  <h3>{editingProductId ? 'Edit product' : 'Add product'}</h3>
                  <input value={adminForm.name} onChange={event => setAdminForm(prev => ({ ...prev, name: event.target.value }))} placeholder="Product name" required />
                  <input value={adminForm.brand} onChange={event => setAdminForm(prev => ({ ...prev, brand: event.target.value }))} placeholder="Brand" required />
                  <input value={adminForm.category} onChange={event => setAdminForm(prev => ({ ...prev, category: event.target.value }))} placeholder="Category" required />
                  <input value={adminForm.price} onChange={event => setAdminForm(prev => ({ ...prev, price: event.target.value }))} placeholder="Price" required />
                  <input value={adminForm.rating} onChange={event => setAdminForm(prev => ({ ...prev, rating: event.target.value }))} placeholder="Rating" required />
                  <input value={adminForm.stock} onChange={event => setAdminForm(prev => ({ ...prev, stock: event.target.value }))} placeholder="Stock" required />
                  <input value={adminForm.image} onChange={event => setAdminForm(prev => ({ ...prev, image: event.target.value }))} placeholder="Image URL" required />
                  <textarea value={adminForm.description} onChange={event => setAdminForm(prev => ({ ...prev, description: event.target.value }))} placeholder="Description" rows="4" required />
                  <input value={adminForm.tags} onChange={event => setAdminForm(prev => ({ ...prev, tags: event.target.value }))} placeholder="Tags separated by commas" />
                  <div className="admin-form-actions">
                    <button className="button-primary" type="submit" disabled={isSavingProduct}>
                      {isSavingProduct ? 'Saving...' : editingProductId ? 'Update product' : 'Add product'}
                    </button>
                    {editingProductId && <button className="button-secondary" type="button" onClick={resetAdminForm}>Cancel</button>}
                  </div>
                </form>

                <div className="admin-list-block">
                  <h3>Manage products</h3>
                  <div className="dashboard-item-list">
                    {managedProducts.slice(0, 10).map(product => (
                      <article key={product.id} className="dashboard-item static">
                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.category} - {product.subcategory || 'General'}</span>
                        </div>
                        <div className="inline-button-row">
                          <button className="button-secondary" onClick={() => hydrateAdminForm(product)}>Edit</button>
                          <button className="button-secondary danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="admin-list-block">
                  <h3>Manage reviews</h3>
                  <div className="dashboard-item-list">
                    {adminRatings.length ? adminRatings.slice(0, 8).map(entry => (
                      <article key={`${entry.userId}-${entry.productId}`} className="dashboard-item static">
                        <div>
                          <strong>{entry.productId}</strong>
                          <span>User {entry.userId}</span>
                        </div>
                        <small>{entry.rating}/5</small>
                      </article>
                    )) : <p>No reviews available</p>}
                  </div>
                </div>

                <div className="admin-list-block">
                  <h3>Manage users</h3>
                  <div className="dashboard-item-list">
                    {adminUsers.length ? adminUsers.slice(0, 8).map(item => (
                      <article key={item.id} className="dashboard-item static">
                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.email}</span>
                        </div>
                        <small>{item.role}</small>
                      </article>
                    )) : <p>No users available</p>}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
