import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Heart, PlayCircle, ShoppingCart, Star } from 'lucide-react';
import BackButton from '../components/BackButton';
import { formatCountdown, formatInr } from '../utils/formatters';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star key={`${rating}-${index}`} size={15} fill={index < Math.round(Number(rating) || 0) ? 'currentColor' : 'none'} />
  ));
}

export default function ProductDetailPage({
  product,
  relatedProducts,
  latestProducts,
  dailyDeals,
  moreToExplore,
  isWishlisted,
  onBack,
  onViewProduct,
  onAddActivity,
  onAddToCart,
  onToggleWishlist,
  onOpenProduct
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.gallery?.[0] || product?.image || '');

  useEffect(() => {
    setQuantity(1);
    setActiveImage(product?.gallery?.[0] || product?.image || '');
    if (product && onViewProduct) {
      onViewProduct(product);
    }
  }, [product]);

  const sourceSummary = useMemo(() => {
    if (!product?.reviewsByPlatform?.length) return null;
    const total = product.reviewsByPlatform.reduce((sum, entry) => sum + entry.reviewCount, 0);
    const average = (
      product.reviewsByPlatform.reduce((sum, entry) => sum + entry.averageRating, 0) /
      product.reviewsByPlatform.length
    ).toFixed(1);
    return { total, average };
  }, [product]);

  if (!product) return null;

  return (
    <main className="page-shell detail-page">
      <BackButton label="< Back" onClick={onBack} />

      <section className="detail-hero-layout">
        <article className="detail-gallery-panel">
          <img className="detail-stage-image" src={activeImage} alt={product.name} />
          <div className="gallery-strip article-gallery">
            {(product.gallery || [product.image]).map(image => (
              <button
                key={image}
                className={`gallery-thumb ${activeImage === image ? 'active' : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </article>

        <article className="detail-article">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-lead">{product.description}</p>

          <div className="detail-rating-row">
            <span className="stars">{renderStars(product.rating)}</span>
            <strong>{Number(product.rating).toFixed(1)}</strong>
            <span>{product.reviewCount} reviews</span>
            <span>{product.source}</span>
          </div>

          <div className="detail-price-row">
            <strong>{formatInr(product.price)}</strong>
            <span>{product.brand}</span>
          </div>

          <div className="detail-badge-row">
            {product.badges?.map(badge => <span key={badge} className="badge badge-soft">{badge}</span>)}
          </div>

          <div className="buy-panel">
            <label className="quantity-picker">
              <span>Qty</span>
              <input type="number" min="1" value={quantity} onChange={event => setQuantity(Math.max(1, Number(event.target.value) || 1))} />
            </label>
            <button className="button-primary" onClick={() => onAddToCart(product, quantity)}>
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <button className={`button-secondary ${isWishlisted ? 'selected-action' : ''}`} onClick={() => onToggleWishlist(product)}>
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              Wishlist
            </button>
          </div>

          <div className="article-copy-grid">
            <section>
              <h3>How it works</h3>
              <ul className="detail-list">
                {(product.howItWorks || []).map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h3>Pros</h3>
              <ul className="detail-list">
                {(product.pros || []).map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h3>Cons</h3>
              <ul className="detail-list">
                {(product.cons || []).map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h3>Features</h3>
              <ul className="detail-list">
                {(product.features || []).map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>
        </article>
      </section>

      <section className="detail-section-grid">
        <article className="light-panel social-proof-panel">
          <div className="section-header compact">
            <div>
              <h2>Social review dashboard</h2>
              <p>AI summary of platform sentiment and tracked discussion.</p>
            </div>
          </div>
          <div className="platform-grid branded-platform-grid">
            {(product.reviewsByPlatform || []).map(platform => (
              <a key={platform.platform} className="platform-card branded" href={platform.url} target="_blank" rel="noreferrer">
                <div>
                  <strong>{platform.platform}</strong>
                  <p>{platform.badge}</p>
                </div>
                <div className="platform-stats">
                  <span>{platform.averageRating.toFixed(1)} avg</span>
                  <span>{platform.reviewCount} tracked</span>
                  {platform.hasVideo && <span>Video available</span>}
                </div>
                <ExternalLink size={16} />
              </a>
            ))}
          </div>
          {sourceSummary && (
            <div className="source-summary-grid">
              <div><strong>{sourceSummary.average}</strong><span>Average rating</span></div>
              <div><strong>{sourceSummary.total}</strong><span>Total tracked reviews</span></div>
              <div><strong>{product.reviewsByPlatform.length}</strong><span>Platforms monitored</span></div>
            </div>
          )}
        </article>

        <article className="light-panel">
          <div className="section-header compact">
            <div>
              <h2>Video review section</h2>
              <p>Open the original platform for creator-led coverage.</p>
            </div>
          </div>
          <div className="video-review-grid article-video-grid">
            {(product.videoReviews || []).map(video => (
              <a key={video.title} href={video.url} target="_blank" rel="noreferrer" className="video-card article-video-card">
                <img src={video.thumbnail} alt={video.title} />
                <div>
                  <strong>{video.title}</strong>
                  <span>{video.platform}</span>
                </div>
                <PlayCircle size={18} />
              </a>
            ))}
          </div>
        </article>

        <article className="light-panel">
          <div className="section-header compact">
            <div>
              <h2>Customer comments</h2>
              <p>Readable social-proof snippets from safe demo metadata.</p>
            </div>
          </div>
          <div className="comment-list">
            {(product.comments || []).map(comment => (
              <article key={`${comment.user}-${comment.text}`} className="comment-card light-comment">
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="light-panel">
          <div className="section-header compact">
            <div>
              <h2>AI recommendation insight</h2>
              <p>{product.reason}</p>
            </div>
          </div>
          <div className="mini-tag-row">
            {(product.tags || []).map(tag => <span key={tag} className="mini-tag">#{tag}</span>)}
          </div>
        </article>
      </section>

      <section className="section-stack">
        <section className="content-carousel">
          <div className="section-header compact">
            <div>
              <h2>The Latest</h2>
              <p>Fresh arrivals and latest recommendation candidates.</p>
            </div>
          </div>
          <div className="mini-showcase-grid">
            {latestProducts.map(item => (
              <button key={item.id} className="showcase-tile light-tile" onClick={() => onOpenProduct(item)}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.subcategory}</span>
                </div>
                <small>{formatInr(item.price)}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="content-carousel">
          <div className="section-header compact">
            <div>
              <h2>Daily Deals</h2>
              <p>Today’s offers with live countdown timers.</p>
            </div>
          </div>
          <div className="mini-showcase-grid">
            {dailyDeals.map(item => (
              <button key={item.id} className="showcase-tile light-tile" onClick={() => onOpenProduct(item)}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{formatCountdown(item.dealEndsAt)}</span>
                </div>
                <small>{formatInr(item.price)}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="content-carousel">
          <div className="section-header compact">
            <div>
              <h2>Related</h2>
              <p>Products connected by category fit and recommendation logic.</p>
            </div>
          </div>
          <div className="mini-showcase-grid">
            {relatedProducts.map(item => (
              <button key={item.id} className="showcase-tile light-tile" onClick={() => onOpenProduct(item)}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
                <small>{formatInr(item.price)}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="content-carousel">
          <div className="section-header compact">
            <div>
              <h2>More to Explore</h2>
              <p>Additional AI-ranked picks for discovery and comparison.</p>
            </div>
          </div>
          <div className="mini-showcase-grid">
            {moreToExplore.map(item => (
              <button key={item.id} className="showcase-tile light-tile" onClick={() => onOpenProduct(item)}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.reason}</span>
                </div>
                <small>{formatInr(item.price)}</small>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
