import React from 'react';
import { Heart } from 'lucide-react';
import BackButton from '../components/BackButton';
import ProductCard from '../components/ProductCard';

export default function WishlistPage({ products, wishlistIds, onBack, onOpenProduct, onAddActivity, onToggleWishlist, onAddToCart }) {
  const wishlistProducts = products.filter(product => wishlistIds.includes(product.id));

  function handleViewProduct(product) {
    if (onAddActivity) onAddActivity('Viewed product details', product);
    onOpenProduct(product);
  }

  return (
    <main className="page-shell wishlist-page">
      <BackButton label="< Back" onClick={onBack} />

      <section className="page-head">
        <div>
          <span className="eyebrow">Wishlist</span>
          <h1>Your saved AI Recommend picks</h1>
          <p>Keep track of the products you want to revisit, compare, and buy later.</p>
        </div>
      </section>

      {wishlistProducts.length ? (
        <div className="product-grid full-grid">
          {wishlistProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={() => onToggleWishlist(product)}
              onAddToCart={() => onAddToCart(product, 1)}
              onView={() => handleViewProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="light-panel empty-page-panel">
          <Heart size={22} />
          <h3>No wishlist items yet</h3>
          <p>Save products from the catalog to build your shortlist.</p>
        </div>
      )}
    </main>
  );
}
