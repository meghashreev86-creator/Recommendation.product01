import React, { useMemo, useState } from 'react';
import { LoaderCircle, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { categoryTree, platformList } from '../data/mockCatalog';

const priceBuckets = [
  { key: 'All', label: 'All prices' },
  { key: 'under-5000', label: 'Under Rs. 5,000' },
  { key: '5000-20000', label: 'Rs. 5,000 - Rs. 20,000' },
  { key: '20000-50000', label: 'Rs. 20,000 - Rs. 50,000' },
  { key: 'above-50000', label: 'Above Rs. 50,000' }
];

export default function ProductsPage({
  products,
  wishlistIds,
  searchValue,
  onBack,
  onOpenProduct,
  onAddActivity,
  onToggleWishlist,
  onAddToCart
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const categoryOptions = useMemo(
    () => ['All', ...categoryTree.flatMap(item => [item.name, ...(item.children || []).map(child => child.name)])],
    []
  );

  function handleViewProduct(product) {
    if (onAddActivity) onAddActivity('Viewed product details', product);
    onOpenProduct(product);
  }

  const visibleProducts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    const filtered = products.filter(product => {
      const haystack = [
        product.name,
        product.category,
        product.subcategory,
        product.brand,
        product.description,
        ...(product.tags || [])
      ].join(' ').toLowerCase();

      const matchesSearch = query ? haystack.includes(query) : true;
      const matchesCategory = selectedCategory === 'All'
        ? true
        : product.category === selectedCategory || product.subcategory === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All'
        ? true
        : (product.reviewsByPlatform || []).some(item => item.platform === selectedPlatform);
      const matchesRating = selectedRating === 'All' ? true : Number(product.rating) >= Number(selectedRating);
      const matchesTrending = showTrendingOnly ? product.isTrending : true;
      const matchesPrice = selectedPrice === 'All'
        ? true
        : selectedPrice === 'under-5000'
          ? product.price < 5000
          : selectedPrice === '5000-20000'
            ? product.price >= 5000 && product.price <= 20000
            : selectedPrice === '20000-50000'
              ? product.price > 20000 && product.price <= 50000
              : product.price > 50000;

      return matchesSearch && matchesCategory && matchesPlatform && matchesRating && matchesTrending && matchesPrice;
    });

    const sorters = {
      latest: (a, b) => Number(b.isLatest) - Number(a.isLatest) || b.reviewCount - a.reviewCount,
      trending: (a, b) => Number(b.isTrending) - Number(a.isTrending) || b.rating - a.rating,
      'most-reviewed': (a, b) => b.reviewCount - a.reviewCount,
      rating: (a, b) => b.rating - a.rating,
      price: (a, b) => a.price - b.price
    };

    return filtered.sort(sorters[sortBy] || sorters.latest);
  }, [products, searchValue, selectedCategory, selectedPlatform, selectedPrice, selectedRating, showTrendingOnly, sortBy]);

  return (
    <main className="page-shell products-page responsive-page-shell">
      <BackButton label="< Back" onClick={onBack} />

      <section className="page-head products-hero">
        <div>
          <span className="eyebrow">Full catalog</span>
          <h1>AI-powered product marketplace</h1>
          <p>Search, filter, compare, and sort every product in one premium ecommerce workspace.</p>
        </div>
        <div className="products-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="AI commerce analytics"
          />
          <div className="products-hero-chip">
            <Sparkles size={16} />
            <span>{visibleProducts.length} AI-ranked products</span>
          </div>
        </div>
      </section>

      <section className="products-layout premium-products-layout">
        <aside className="filter-sidebar">
          <div className="filter-card premium-filter-card">
            <div className="filter-card-head">
              <h3>Filters</h3>
              <SlidersHorizontal size={16} />
            </div>

            <label>
              Category
              <select value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)}>
                {categoryOptions.map(name => (
                  <option key={name} value={name}>{name === 'All' ? 'All categories' : name}</option>
                ))}
              </select>
            </label>

            <label>
              Price
              <select value={selectedPrice} onChange={event => setSelectedPrice(event.target.value)}>
                {priceBuckets.map(bucket => (
                  <option key={bucket.key} value={bucket.key}>{bucket.label}</option>
                ))}
              </select>
            </label>

            <label>
              Platform
              <select value={selectedPlatform} onChange={event => setSelectedPlatform(event.target.value)}>
                <option value="All">All platforms</option>
                {platformList.map(platform => <option key={platform} value={platform}>{platform}</option>)}
              </select>
            </label>

            <label>
              Rating
              <select value={selectedRating} onChange={event => setSelectedRating(event.target.value)}>
                <option value="All">All ratings</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </label>

            <label>
              Sorting
              <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="most-reviewed">Most reviewed</option>
                <option value="rating">Highest rated</option>
                <option value="price">Lowest price</option>
              </select>
            </label>

            <label className="check-line checkbox-row">
              <input type="checkbox" checked={showTrendingOnly} onChange={event => setShowTrendingOnly(event.target.checked)} />
              <span>Trending only</span>
            </label>
          </div>
        </aside>

        <div className="products-main">
          <div className="category-chip-row">
            {categoryOptions.slice(0, 8).map(category => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? 'All Products' : category}
              </button>
            ))}
          </div>

          <div className="section-header compact premium-results-head">
            <div>
              <h2>Product results</h2>
              <p>{searchValue ? `Search: "${searchValue}" - ` : ''}{visibleProducts.length} products available</p>
            </div>
          </div>

          <div className="product-grid full-grid premium-products-grid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={() => onToggleWishlist(product)}
                  onAddToCart={() => onAddToCart(product, 1)}
                  onView={() => handleViewProduct(product)}
                />
              ))
            ) : (
              <div className="light-panel empty-page-panel products-empty-state">
                <LoaderCircle size={34} className="animate-spin" />
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term to discover more AI-ranked picks.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
