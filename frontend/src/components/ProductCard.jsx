import React from 'react';
import { Heart, Star } from 'lucide-react';
import { formatInr } from '../utils/formatters';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={`${rating}-${index}`}
      size={13}
      fill={index < Math.round(Number(rating) || 0) ? 'currentColor' : 'none'}
    />
  ));
}

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, onView }) {
  return (
    <article className="product-card premium-product-card responsive-product-card" onClick={onView} role="button" tabIndex={0} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onView();
      }
    }}>
      <div className="product-media premium-product-media">
        <img src={product.image} alt={product.name} />
        <button
          className={`icon-button wish ${isWishlisted ? 'active' : ''}`}
          onClick={event => {
            event.stopPropagation();
            onToggleWishlist();
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-content premium-product-content">
        <h3>{product.name}</h3>

        <div className="rating-line premium-rating-line">
          <span className="stars">{renderStars(product.rating)}</span>
          <strong>{Number(product.rating).toFixed(1)}</strong>
          <small>{product.reviewCount} reviews</small>
        </div>

        <div className="price-row premium-price-row">
          <strong>{formatInr(product.price)}</strong>
        </div>
      </div>
    </article>
  );
}
