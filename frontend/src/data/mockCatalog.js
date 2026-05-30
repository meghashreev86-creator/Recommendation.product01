const categoryTree = [
  {
    name: 'Electronics',
    children: [
      { name: 'AI Gadgets' },
      { name: 'Gaming' },
      { name: 'Cameras' }
    ]
  },
  {
    name: 'Smart Home',
    children: [
      { name: 'Home Safety' }
    ]
  },
  {
    name: 'Kitchen Appliances',
    children: []
  },
  {
    name: 'Home Appliances',
    children: [
      { name: 'Laundry & Cleaning' },
      { name: 'Heating & Cooling' }
    ]
  },
  {
    name: 'Fashion',
    children: [
      { name: 'Sneakers' },
      { name: 'Shoes' },
      { name: 'Socks' },
      { name: 'Bags' },
      { name: 'Watches' },
      { name: 'Hats' }
    ]
  },
  {
    name: 'Beauty & Skin Care',
    children: []
  },
  {
    name: 'Vehicles & Accessories',
    children: []
  },
  {
    name: 'Books',
    children: []
  },
  {
    name: 'Aviation',
    children: []
  },
  {
    name: 'Sports & Outdoors',
    children: []
  }
];

const premiumBackgrounds = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
];

const authFeaturedProduct = {
  title: 'Orbit One AI Phone',
  price: '₹68,999',
  rating: '4.9',
  reviews: '12.4k verified reviews',
  image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  highlights: ['Adaptive AI camera', 'Trusted social review sync', 'On-device recommendation assistant']
};

const sourceRotation = ['YouTube', 'Instagram', 'Flipkart Reviews', 'Amazon Reviews', 'Editorial Lab'];
const platformList = ['YouTube', 'Instagram', 'Facebook', 'Twitter/X', 'LinkedIn'];

const curatedProducts = [
  { id: 'mx1', name: 'Orbit One AI Phone', brand: 'Orbit', category: 'Electronics', subcategory: 'AI Gadgets', price: 68999, rating: 4.9, stock: 18, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80', description: 'Flagship AI phone with adaptive camera workflows and on-device summary tools.', tags: ['phone', 'mobile', 'ai', 'camera'] },
  { id: 'mx2', name: 'NeuroGlass Assistant', brand: 'NeuroGlass', category: 'Electronics', subcategory: 'AI Gadgets', price: 42999, rating: 4.7, stock: 11, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80', description: 'Context-aware smart glasses for shopping, navigation, and instant product recall.', tags: ['ai', 'wearable', 'assistant', 'smart'] },
  { id: 'mx3', name: 'StudioBook ML Pro', brand: 'StudioBook', category: 'Electronics', subcategory: 'Gaming', price: 124999, rating: 4.8, stock: 9, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80', description: 'Creator-grade laptop optimized for ML experiments, content production, and premium hybrid work.', tags: ['laptop', 'creator', 'ml', 'performance'] },
  { id: 'mx4', name: 'PulseFrame 4K Camera', brand: 'PulseFrame', category: 'Electronics', subcategory: 'Cameras', price: 54999, rating: 4.6, stock: 14, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', description: 'Compact creator camera with cinematic stabilization and AI framing.', tags: ['camera', 'creator', 'video', 'travel'] },
  { id: 'mx5', name: 'AeroSync Gaming Console', brand: 'AeroSync', category: 'Electronics', subcategory: 'Gaming', price: 46999, rating: 4.8, stock: 21, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=80', description: 'Premium next-gen console with fast loading and social clip intelligence.', tags: ['gaming', 'console', 'entertainment', 'social'] },
  { id: 'mx6', name: 'ChefSense Smart Oven', brand: 'ChefSense', category: 'Kitchen Appliances', subcategory: 'Kitchen Appliances', price: 18499, rating: 4.8, stock: 12, image: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=900&q=80', description: 'Voice-assisted smart oven with recipe sync and adaptive heat zones.', tags: ['kitchen', 'oven', 'smart-home', 'cooking'] },
  { id: 'mx7', name: 'Velvet Brew System', brand: 'Velvet', category: 'Kitchen Appliances', subcategory: 'Kitchen Appliances', price: 21999, rating: 4.5, stock: 16, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', description: 'Luxury bean-to-cup brewer with app scheduling and smooth crema tuning.', tags: ['coffee', 'kitchen', 'luxury', 'smart'] },
  { id: 'mx8', name: 'Luma Air Fryer X', brand: 'Luma', category: 'Kitchen Appliances', subcategory: 'Kitchen Appliances', price: 10999, rating: 4.4, stock: 26, image: 'https://images.unsplash.com/photo-1585515656931-3fd36f4b5f6f?auto=format&fit=crop&w=900&q=80', description: 'Sleek countertop air fryer with rapid presets and easy cleanup.', tags: ['airfryer', 'kitchen', 'home', 'appliance'] },
  { id: 'mx9', name: 'Nimbus Smart Lock', brand: 'Nimbus', category: 'Smart Home', subcategory: 'Home Safety', price: 12499, rating: 4.7, stock: 22, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80', description: 'Fingerprint and app-enabled smart lock with remote guest access.', tags: ['security', 'smart-lock', 'home', 'iot'] },
  { id: 'mx10', name: 'Halo Cam Protect', brand: 'Halo', category: 'Smart Home', subcategory: 'Home Safety', price: 8999, rating: 4.5, stock: 24, image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=900&q=80', description: 'Indoor security camera with person detection and privacy-first controls.', tags: ['camera', 'security', 'home', 'smart'] },
  { id: 'mx11', name: 'GlowGrid Smart Light', brand: 'GlowGrid', category: 'Smart Home', subcategory: 'Smart Home', price: 6999, rating: 4.3, stock: 36, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', description: 'Ambient lighting kit with scene automation and voice routines.', tags: ['lighting', 'smart-home', 'decor', 'voice'] },
  { id: 'mx12', name: 'CalmAir Studio Purifier', brand: 'CalmAir', category: 'Home Appliances', subcategory: 'Heating & Cooling', price: 16999, rating: 4.7, stock: 16, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80', description: 'Air purifier with live quality dashboard and quiet sleep mode.', tags: ['air', 'purifier', 'health', 'smart-home'] },
  { id: 'mx13', name: 'SwiftWash Neo', brand: 'SwiftWash', category: 'Home Appliances', subcategory: 'Laundry & Cleaning', price: 27999, rating: 4.4, stock: 8, image: 'https://images.unsplash.com/photo-1626806787461-102c1a6d1a14?auto=format&fit=crop&w=900&q=80', description: 'Compact laundry system with quick wash profiles and energy insights.', tags: ['laundry', 'cleaning', 'home', 'appliance'] },
  { id: 'mx14', name: 'ThermaCloud Tower', brand: 'ThermaCloud', category: 'Home Appliances', subcategory: 'Heating & Cooling', price: 23999, rating: 4.6, stock: 15, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80', description: 'Premium climate tower with silent airflow and app scheduling.', tags: ['climate', 'cooling', 'heating', 'smart'] },
  { id: 'mx15', name: 'HyperStep Carbon Sneakers', brand: 'HyperStep', category: 'Fashion', subcategory: 'Sneakers', price: 9499, rating: 4.5, stock: 26, image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80', description: 'Carbon-plated sneakers designed for city wear and high-energy workouts.', tags: ['sneakers', 'running', 'fashion', 'lifestyle'] },
  { id: 'mx16', name: 'Urban Voyager Backpack', brand: 'Urban Voyager', category: 'Fashion', subcategory: 'Bags', price: 5999, rating: 4.5, stock: 34, image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=900&q=80', description: 'Premium commuter backpack with laptop vault and hidden pockets.', tags: ['bag', 'commute', 'travel', 'fashion'] },
  { id: 'mx17', name: 'Chrono Edge Watch', brand: 'Chrono Edge', category: 'Fashion', subcategory: 'Watches', price: 15999, rating: 4.6, stock: 18, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80', description: 'Hybrid fashion watch with polished metal finish and smart alerts.', tags: ['watch', 'fashion', 'lifestyle', 'premium'] },
  { id: 'mx18', name: 'Crestline Travel Hat', brand: 'Crestline', category: 'Fashion', subcategory: 'Hats', price: 2499, rating: 4.2, stock: 42, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=900&q=80', description: 'All-weather travel hat with breathable weave and subtle luxury styling.', tags: ['hat', 'travel', 'fashion', 'outdoor'] },
  { id: 'mx19', name: 'LuxeSkin LED Therapy Mask', brand: 'LuxeSkin', category: 'Beauty & Skin Care', subcategory: 'Beauty & Skin Care', price: 14999, rating: 4.4, stock: 30, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', description: 'Salon-inspired LED mask for tone, glow, and guided recovery sessions.', tags: ['beauty', 'skincare', 'led', 'wellness'] },
  { id: 'mx20', name: 'SilkRoot Hair Duo', brand: 'SilkRoot', category: 'Beauty & Skin Care', subcategory: 'Beauty & Skin Care', price: 3499, rating: 4.3, stock: 44, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', description: 'Premium scalp-and-shine kit built around restorative ingredients.', tags: ['hair', 'beauty', 'care', 'wellness'] },
  { id: 'mx21', name: 'DriveSync HUD Assistant', brand: 'DriveSync', category: 'Vehicles & Accessories', subcategory: 'Vehicles & Accessories', price: 9999, rating: 4.6, stock: 20, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', description: 'Heads-up driving assistant with route projection and AI guidance.', tags: ['car', 'hud', 'vehicle', 'smart'] },
  { id: 'mx22', name: 'RoadPilot Dash Cam', brand: 'RoadPilot', category: 'Vehicles & Accessories', subcategory: 'Vehicles & Accessories', price: 7999, rating: 4.4, stock: 27, image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80', description: '4K dash cam with night clarity and instant incident capture.', tags: ['dashcam', 'car', 'camera', 'safety'] },
  { id: 'mx23', name: 'Data Science Handbook', brand: 'EduBooks', category: 'Books', subcategory: 'Books', price: 799, rating: 4.6, stock: 55, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80', description: 'Beginner friendly guide to data science, Python, and machine learning.', tags: ['book', 'data', 'machine-learning', 'python'] },
  { id: 'mx24', name: 'Python Systems Guide', brand: 'EduBooks', category: 'Books', subcategory: 'Books', price: 699, rating: 4.5, stock: 49, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80', description: 'Modern programming reference with practical engineering examples.', tags: ['book', 'technology', 'python', 'coding'] },
  { id: 'mx25', name: 'AeroPilot Pro Headset', brand: 'AeroPilot', category: 'Aviation', subcategory: 'Aviation', price: 28999, rating: 4.8, stock: 10, image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80', description: 'Premium aviation headset with clear cockpit audio and durable comfort.', tags: ['aviation', 'pilot', 'headset', 'travel'] },
  { id: 'mx26', name: 'RunFast Performance Socks', brand: 'RunFast', category: 'Fashion', subcategory: 'Socks', price: 899, rating: 4.2, stock: 62, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=80', description: 'Compression-ready performance socks built for long training days.', tags: ['socks', 'sports', 'fashion', 'comfort'] },
  { id: 'mx27', name: 'TrailPulse Smart Bottle', brand: 'TrailPulse', category: 'Sports & Outdoors', subcategory: 'Sports & Outdoors', price: 3999, rating: 4.3, stock: 38, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80', description: 'Hydration bottle with reminders, temperature lock, and workout sync.', tags: ['fitness', 'outdoor', 'smart', 'sports'] },
  { id: 'mx28', name: 'Summit Vision Binoculars', brand: 'Summit Vision', category: 'Sports & Outdoors', subcategory: 'Sports & Outdoors', price: 12999, rating: 4.5, stock: 17, image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', description: 'Weather-ready binocular kit for travel, adventure, and field content.', tags: ['outdoor', 'travel', 'optics', 'sports'] }
];

function clampRating(value) {
  return Number(Math.max(3.9, Math.min(5, value)).toFixed(1));
}

function buildPlatformStats(product, index) {
  const baseReviews = 180 + index * 51 + Math.round((product.rating || 4.4) * 110);
  return platformList.map((platform, platformIndex) => ({
    platform,
    averageRating: clampRating((product.rating || 4.4) - 0.18 + platformIndex * 0.04),
    reviewCount: baseReviews + platformIndex * 73,
    badge: platform === 'YouTube'
      ? 'Video review'
      : platform === 'Instagram'
        ? 'Community picks'
        : platform === 'LinkedIn'
          ? 'Professional take'
          : 'Trusted source',
    hasVideo: platform === 'YouTube' || platform === 'Instagram',
    url: platform === 'YouTube'
      ? `https://www.youtube.com/results?search_query=${encodeURIComponent(product.name + ' review')}`
      : platform === 'Instagram'
        ? `https://www.instagram.com/explore/tags/${encodeURIComponent(product.brand.replace(/\s+/g, ''))}/`
        : platform === 'Facebook'
          ? 'https://www.facebook.com/'
          : platform === 'Twitter/X'
            ? `https://x.com/search?q=${encodeURIComponent(product.name)}`
            : 'https://www.linkedin.com/'
  }));
}

function buildVideoReviews(product) {
  return [
    {
      title: `${product.name} long-form review`,
      platform: 'YouTube',
      thumbnail: product.image,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(product.name + ' long review')}`
    },
    {
      title: `${product.brand} short-form reactions`,
      platform: 'Instagram',
      thumbnail: premiumBackgrounds[1],
      url: `https://www.instagram.com/explore/tags/${encodeURIComponent(product.brand.replace(/\s+/g, ''))}/`
    }
  ];
}

function buildComments(product) {
  return [
    { user: 'Aarav K.', text: `${product.name} feels premium and the recommendation summary was actually useful.` },
    { user: 'Isha M.', text: `Strong design, great real-world value, and the review sources helped me compare quickly.` },
    { user: 'Rohan S.', text: `One of the most polished picks in this category with good creator coverage.` }
  ];
}

function buildPros(product) {
  return [
    `Premium ${product.brand} finish`,
    'Strong ratings across social platforms',
    'Fits AI-assisted shopping use cases well'
  ];
}

function buildCons(product) {
  return [
    'Premium pricing in some regions',
    'Best value depends on your category priorities',
    'Limited stock on the most popular variants'
  ];
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function enrichProduct(product, index) {
  const rating = Number(product.rating) || 4.4;
  const reviewCount = product.reviewCount || 240 + index * 46;
  const reviewsByPlatform = buildPlatformStats({ ...product, rating }, index);
  const dealEndsAt = new Date(Date.now() + ((index % 6) + 6) * 60 * 60 * 1000).toISOString();

  return {
    ...product,
    rating,
    reviewCount,
    source: product.source || sourceRotation[index % sourceRotation.length],
    isTrending: product.isTrending ?? index % 2 === 0,
    isMostReviewed: product.isMostReviewed ?? reviewCount > 500,
    hasVideoReview: product.hasVideoReview ?? true,
    isLatest: product.isLatest ?? index < 8,
    dealEndsAt,
    gallery: [product.image, premiumBackgrounds[index % premiumBackgrounds.length], premiumBackgrounds[(index + 1) % premiumBackgrounds.length]],
    howItWorks: [
      'AI Recommend compares performance, social proof, and buying intent signals in real time.',
      'Machine learning ranking balances engagement, category relevance, and review quality.',
      'Badges explain why a product is trending, heavily reviewed, or rich in video commentary.'
    ],
    features: [
      `${product.brand} premium build quality`,
      'Cross-platform review intelligence',
      'Fast discovery with ML ranking',
      'Clean ecommerce experience with explainable recommendations'
    ],
    pros: buildPros(product),
    cons: buildCons(product),
    reviewSummary: 'Rated highly for design, reliability, and confidence across trusted shopping and social channels.',
    reviewsByPlatform,
    videoReviews: buildVideoReviews(product),
    comments: buildComments(product),
    reason: product.reason || 'Recommended by hybrid AI based on category fit, review strength, and shopper interest.',
    badges: [
      product.isTrending ?? index % 2 === 0 ? 'Trending' : null,
      product.isMostReviewed ?? reviewCount > 500 ? 'Most reviewed' : null,
      'Video reviews'
    ].filter(Boolean)
  };
}

export function buildCatalog(apiProducts = []) {
  return uniqueById([...apiProducts, ...curatedProducts]).map(enrichProduct);
}

export function getCatalogStats(products) {
  const totalReviews = products.reduce((sum, product) => sum + (product.reviewCount || 0), 0);
  return [
    { label: 'Products', value: products.length, note: 'Premium catalog picks' },
    { label: 'Reviews', value: `${Math.max(1, Math.round(totalReviews / 1000))}k+`, note: 'Trusted reviews tracked' },
    { label: 'Categories', value: categoryTree.length, note: 'Expanded shopping discovery' },
    { label: 'Sources', value: platformList.length, note: 'Safe social proof channels' }
  ];
}

export { authFeaturedProduct, categoryTree, platformList, premiumBackgrounds };
