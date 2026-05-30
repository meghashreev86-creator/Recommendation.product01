import React, { useEffect, useMemo, useState } from 'react';
import { BrainCircuit, Heart, Sparkles, SquarePlay, Star, TrendingUp } from 'lucide-react';
import { api } from '../utils/api';
import { buildCatalog, getCatalogStats, platformList } from '../data/mockCatalog';
import { formatCountdown, formatInr } from '../utils/formatters';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={`${rating}-${index}`}
      size={12}
      fill={index < Math.round(Number(rating) || 0) ? 'currentColor' : 'none'}
    />
  ));
}

export default function Home({
  user,
  searchValue,
  wishlistIds,
  recentActivity,
  onRequestLogin,
  onToggleWishlist,
  onAddActivity,
  onNavigate,
  onCatalogReady,
  onRecommendationsReady,
  refreshKey
}) {
  const [catalog, setCatalog] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [productsResponse, recommendationsResponse] = await Promise.all([
          api('/products', { attachAuth: false }),
          api(`/recommendations/${user?.id || 'guest'}?limit=12`, { attachAuth: false })
        ]);

        const enrichedCatalog = buildCatalog(productsResponse || []);
        const nextRecommendations = buildCatalog(recommendationsResponse?.recommendations || []).slice(0, 10).map(item => ({
          ...item,
          reason: item.reason || 'Recommended by hybrid ML ranking'
        }));

        setCatalog(enrichedCatalog);
        setRecommendations(nextRecommendations);
        onCatalogReady(enrichedCatalog);
        onRecommendationsReady(nextRecommendations);
        setApiError('');
      } catch (err) {
        const fallbackCatalog = buildCatalog([]);
        const fallbackRecommendations = fallbackCatalog.filter(item => item.isTrending).slice(0, 10);
        setCatalog(fallbackCatalog);
        setRecommendations(fallbackRecommendations);
        onCatalogReady(fallbackCatalog);
        onRecommendationsReady(fallbackRecommendations);
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadData().catch(() => {});
  }, [onCatalogReady, onRecommendationsReady, refreshKey, user]);

  const stats = useMemo(() => getCatalogStats(catalog), [catalog]);

  const searchedCatalog = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return catalog;
    return catalog.filter(product => {
      const haystack = [
        product.name,
        product.category,
        product.subcategory,
        product.brand,
        product.description,
        ...(product.tags || [])
      ].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [catalog, searchValue]);

  const trendingProducts = useMemo(
    () => searchedCatalog.filter(product => product.isTrending).slice(0, 6),
    [searchedCatalog]
  );
  const topRatedProducts = useMemo(
    () => searchedCatalog.slice().sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 6),
    [searchedCatalog]
  );
  const deals = useMemo(
    () => searchedCatalog.slice().sort((a, b) => a.price - b.price).slice(0, 6),
    [searchedCatalog]
  );
  const recentlyViewed = useMemo(
    () => catalog.filter(product => recentActivity.some(entry => entry.productId === product.id)).slice(0, 6),
    [catalog, recentActivity]
  );
  const reviewSourceRollup = useMemo(() => {
    return platformList.map(platform => {
      const matches = catalog.flatMap(product => product.reviewsByPlatform || []).filter(item => item.platform === platform);
      const totalReviews = matches.reduce((sum, item) => sum + item.reviewCount, 0);
      const average = matches.length
        ? (matches.reduce((sum, item) => sum + item.averageRating, 0) / matches.length).toFixed(1)
        : '0.0';
      return { platform, average, totalReviews };
    });
  }, [catalog]);

  const shoppingSections = useMemo(() => {
    if (searchValue) {
      return [
        {
          key: 'search-results',
          title: 'Search Results',
          subtitle: `Showing AI-ranked results for "${searchValue}"`,
          products: searchedCatalog.slice(0, 12)
        }
      ];
    }

    return [
      {
        key: 'trending',
        title: 'Trending Now',
        subtitle: 'High-velocity picks with strong shopper momentum and creator visibility.',
        products: trendingProducts
      },
      {
        key: 'recently-viewed',
        title: 'Recently Viewed',
        subtitle: 'Pick up where you left off with products you explored this session.',
        products: recentlyViewed,
        emptyMessage: 'Open a product to start building your recent history.'
      },
      {
        key: 'recommended',
        title: 'Recommended For You',
        subtitle: 'Machine learning selections tuned to engagement, confidence, and category fit.',
        products: (recommendations.length ? recommendations : trendingProducts).slice(0, 6)
      },
      {
        key: 'top-rated',
        title: 'Top Rated',
        subtitle: 'Best-performing products ranked by rating quality and review depth.',
        products: topRatedProducts
      },
      {
        key: 'deals',
        title: "Today's Deals",
        subtitle: 'Premium deals surfacing high-value products with active urgency.',
        products: deals,
        metaFormatter: product => formatCountdown(product.dealEndsAt)
      }
    ];
  }, [deals, recommendations, recentlyViewed, searchValue, searchedCatalog, topRatedProducts, trendingProducts]);

  function handleOpenProduct(product) {
    onAddActivity('Viewed product details', product);
    onNavigate('product', { productId: product.id });
  }

  function renderHomeCard(product, section = {}) {
    const meta = section.metaFormatter?.(product) || `${product.reviewCount} reviews`;

    return (
      <article
        key={product.id}
        className="home-shop-card"
        onClick={() => handleOpenProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpenProduct(product);
          }
        }}
      >
        <div className="home-shop-card-media">
          <img src={product.image} alt={product.name} />
          <button
            className={`home-shop-wishlist ${wishlistIds.includes(product.id) ? 'active' : ''}`}
            onClick={event => {
              event.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label="Add to wishlist"
          >
            <Heart size={15} fill={wishlistIds.includes(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="home-shop-card-body">
          <h3>{product.name}</h3>
          <div className="home-shop-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <strong>{Number(product.rating).toFixed(1)}</strong>
            <span>{meta}</span>
          </div>
          <div className="home-shop-pricing">
            <strong>{formatInr(product.price)}</strong>
          </div>
        </div>
      </article>
    );
  }

  return (
    <main className="home-page responsive-page-shell">
      <section className="hero-surface hero-full-bleed">
        <div className="hero-backdrop" />
        <div className="hero-copy">
          <span className="eyebrow">AI commerce intelligence</span>
          <h1>Premium ecommerce discovery powered by recommendation engines, analytics, and machine learning.</h1>
          <p>
            Shop through explainable AI, trend scoring, trusted reviews, and startup-grade product intelligence in a
            storefront built for modern buying confidence.
          </p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => onNavigate('products')}>
              Explore Catalog
            </button>
            <button className="button-secondary" onClick={() => document.getElementById('home-ai-proof')?.scrollIntoView({ behavior: 'smooth' })}>
              View AI Insights
            </button>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-panel-header">
            <Sparkles size={18} />
            <div>
              <strong>AI insights</strong>
              <span>Real-time ranking, trusted review intelligence, and recommendation signals</span>
            </div>
          </div>
          {recommendations.slice(0, 3).map(item => (
            <button key={item.id} className="hero-reco-row" onClick={() => handleOpenProduct(item)}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{item.reason}</span>
              </div>
              <small>{formatInr(item.price)}</small>
            </button>
          ))}
        </aside>
      </section>

      <section className="stats-strip premium-stats-strip">
        {stats.map(item => (
          <article key={item.label} className="light-panel stat-tile premium-stat-tile">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="page-shell" id="home-ai-proof">
        {apiError && <div className="status-banner info">Backend unavailable. Showing safe demo metadata and curated catalog results.</div>}
        <section className="editorial-feature-layout">
          <div className="editorial-visual">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              alt="AI analytics workspace"
            />
          </div>
          <div className="editorial-copy">
            <span className="eyebrow">AI recommendation systems</span>
            <h2>Recommendation engine, creator intelligence, and analytics-led discovery in one premium experience.</h2>
            <p>
              Behavioral fit, review quality, trend signals, and explainable ranking come together to create a modern
              shopping workflow that feels like a polished AI commerce platform.
            </p>
            <div className="editorial-points">
              <div><BrainCircuit size={18} /><span>Recommendation engine with explainable ranking</span></div>
              <div><SquarePlay size={18} /><span>Creator and review intelligence from trusted platforms</span></div>
              <div><TrendingUp size={18} /><span>Analytics-led merchandising for discovery and confidence</span></div>
            </div>
          </div>
        </section>
      </section>

      {!searchValue && (
        <section className="page-shell colorful-proof-section">
          <div className="section-header editorial-section-head">
            <div>
              <h2>Shopping Intelligence Signals</h2>
              <p>Review density and trust indicators monitored across social and editorial surfaces.</p>
            </div>
          </div>
          <div className="review-rollup-grid editorial-metric-strip">
            {reviewSourceRollup.map(source => (
              <article key={source.platform} className="platform-spotlight-card premium-spotlight-card">
                <span className="eyebrow">{source.platform}</span>
                <strong>{source.average}</strong>
                <p>Average rating</p>
                <small>{source.totalReviews} tracked reviews</small>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="page-shell shopping-sections">
        {isLoading ? (
          <div className="shopping-row-grid home-shopping-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="shopping-skeleton-card skeleton-card">
                <div className="skeleton-media" />
                <div className="skeleton-line large" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        ) : shoppingSections.map(section => (
          <section key={section.key} className="shopping-section">
            <div className="shopping-section-head">
              <div>
                <h2>{section.title}</h2>
                <p>{section.subtitle}</p>
              </div>
            </div>

            {section.products.length ? (
              <div className="shopping-row-grid home-shopping-grid">
                {section.products.map(product => renderHomeCard(product, section))}
              </div>
            ) : (
              <div className="shopping-row-empty">
                <p>{section.emptyMessage || 'No products available right now.'}</p>
              </div>
            )}
          </section>
        ))}
      </section>

      {!user && (
        <section className="page-shell">
          <div className="cta-banner premium-cta-banner">
            <div>
              <span className="eyebrow">Personalization</span>
              <h2>Login to unlock persistent recommendations and premium order tracking</h2>
              <p>Login enables remembered sessions, synced wishlist signals, order history, and richer AI recommendations.</p>
            </div>
            <button className="button-primary" onClick={onRequestLogin}>Login</button>
          </div>
        </section>
      )}
    </main>
  );
}
