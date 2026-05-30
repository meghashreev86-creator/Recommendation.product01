import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ExternalLink, Heart, PlayCircle, ShoppingCart, Star } from 'lucide-react';

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString('en-US')}`;
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={`${rating}-${index}`}
      size={15}
      fill={index < Math.round(Number(rating) || 0) ? 'currentColor' : 'none'}
    />
  ));
}

export default function ProductDetailsModal({
  product,
  relatedProducts,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onOpenProduct
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    setQuantity(1);
    setActiveImage(product?.gallery?.[0] || product?.image || '');
  }, [product]);

  const sourceSummary = useMemo(() => {
    if (!product?.reviewsByPlatform?.length) return null;
    const total = product.reviewsByPlatform.reduce((sum, entry) => sum + entry.reviewCount, 0);
    return {
      total,
      average: (
        product.reviewsByPlatform.reduce((sum, entry) => sum + entry.averageRating, 0) /
        product.reviewsByPlatform.length
      ).toFixed(1)
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-shell product-detail-shell" onClick={event => event.stopPropagation()}>
        <button className="back-link" onClick={onClose}>
          <ArrowLeft size={16} />
          Back to catalog
        </button>

        <div className="detail-layout">
          <div className="detail-gallery glass-card">
            <img className="detail-hero-image" src={activeImage} alt={product.name} />
            <div className="gallery-strip">
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
          </div>

          <div className="detail-main glass-card">
            <div className="detail-headline">
              <div>
                <span className="eyebrow">{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
              <button
                className={`icon-button wish ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="detail-meta-row">
              <div>
                <strong>{formatPrice(product.price)}</strong>
                <span>{product.brand}</span>
              </div>
              <div className="rating-line">
                <span className="stars">{renderStars(product.rating)}</span>
                <span>{Number(product.rating).toFixed(1)}</span>
                <small>{product.reviewCount} reviews</small>
              </div>
            </div>

            <div className="detail-badge-row">
              {product.badges?.map(badge => (
                <span key={badge} className="badge badge-ghost">{badge}</span>
              ))}
              <span className="badge badge-soft">Source: {product.source}</span>
            </div>

            <div className="detail-grid-2">
              <section>
                <h3>How it works</h3>
                <ul className="detail-list">
                  {(product.howItWorks || []).map(item => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section>
                <h3>Features</h3>
                <ul className="detail-list">
                  {(product.features || []).map(item => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>

            <section className="detail-review-summary">
              <h3>Review summary</h3>
              <p>{product.reviewSummary}</p>
              {sourceSummary ? (
                <div className="source-summary-grid">
                  <div><strong>{sourceSummary.average}</strong><span>Average rating</span></div>
                  <div><strong>{sourceSummary.total}</strong><span>Total tracked reviews</span></div>
                  <div><strong>{product.reviewsByPlatform.length}</strong><span>Source platforms</span></div>
                </div>
              ) : (
                <p>No reviews available</p>
              )}
            </section>

            <div className="detail-actions">
              <label className="quantity-picker">
                <span>Qty</span>
                <input
                  type="number"
                  min="1"
                  max={Math.max(1, Number(product.stock) || 1)}
                  value={quantity}
                  onChange={event => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                />
              </label>
              <button className="button-primary" onClick={() => onAddToCart(product, quantity)}>
                <ShoppingCart size={16} />
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="detail-content-grid">
          <section className="glass-card">
            <h3>Social review platforms</h3>
            <div className="platform-grid">
              {(product.reviewsByPlatform || []).map(platform => (
                <a key={platform.platform} className="platform-card" href={platform.url} target="_blank" rel="noreferrer">
                  <div>
                    <strong>{platform.platform}</strong>
                    <p>{platform.badge}</p>
                  </div>
                  <div className="platform-stats">
                    <span>{platform.averageRating.toFixed(1)} avg</span>
                    <span>{platform.reviewCount} reviews</span>
                    {platform.hasVideo && <span>Video available</span>}
                  </div>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </section>

          <section className="glass-card">
            <h3>Customer comments</h3>
            <div className="comment-list">
              {(product.comments || []).map(comment => (
                <article key={`${comment.user}-${comment.text}`} className="comment-card">
                  <strong>{comment.user}</strong>
                  <p>{comment.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-card">
            <h3>AI recommendation insight</h3>
            <p>{product.reason}</p>
            <div className="mini-tag-row">
              {(product.tags || []).map(tag => (
                <span key={tag} className="mini-tag">#{tag}</span>
              ))}
            </div>
          </section>

          <section className="glass-card">
            <h3>Video reviews</h3>
            {(product.videoReviews || []).length ? (
              <div className="video-review-grid">
                {product.videoReviews.map(video => (
                  <a key={video.title} href={video.url} target="_blank" rel="noreferrer" className="video-card">
                    <img src={video.thumbnail} alt={video.title} />
                    <div>
                      <strong>{video.title}</strong>
                      <span>{video.platform}</span>
                    </div>
                    <PlayCircle size={18} />
                  </a>
                ))}
              </div>
            ) : (
              <p>No reviews available</p>
            )}
          </section>

          <section className="glass-card">
            <h3>Related products</h3>
            <div className="related-grid">
              {(relatedProducts || []).map(item => (
                <button key={item.id} className="related-card" onClick={() => onOpenProduct(item)}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
