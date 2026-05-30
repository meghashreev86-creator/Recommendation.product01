function tokenize(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
}

function productText(product) {
  return [product.name, product.brand, product.category, product.description, ...(product.tags || [])].join(' ');
}

function cosineSimilarity(aTokens, bTokens) {
  const a = new Map();
  const b = new Map();
  aTokens.forEach(t => a.set(t, (a.get(t) || 0) + 1));
  bTokens.forEach(t => b.set(t, (b.get(t) || 0) + 1));
  const words = new Set([...a.keys(), ...b.keys()]);
  let dot = 0, magA = 0, magB = 0;
  words.forEach(w => {
    const av = a.get(w) || 0;
    const bv = b.get(w) || 0;
    dot += av * bv;
    magA += av * av;
    magB += bv * bv;
  });
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

export function getPopularProducts(products, limit = 8) {
  return [...products].sort((a, b) => (b.rating * 0.7 + b.stock * 0.01) - (a.rating * 0.7 + a.stock * 0.01)).slice(0, limit);
}

export function getSimilarProducts(productId, products, limit = 6) {
  const base = products.find(p => p.id === productId || String(p._id) === productId);
  if (!base) return getPopularProducts(products, limit);
  const baseTokens = tokenize(productText(base));
  return products
    .filter(p => (p.id || String(p._id)) !== productId)
    .map(p => ({ ...p, score: cosineSimilarity(baseTokens, tokenize(productText(p))) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getHybridRecommendations(userId, products, ratings, interactions, limit = 8) {
  const userRatings = ratings.filter(r => r.userId === userId);
  const userInteractions = interactions.filter(i => i.userId === userId);
  const touchedIds = new Set([...userRatings.map(r => r.productId), ...userInteractions.map(i => i.productId)]);
  if (touchedIds.size < 2) return getPopularProducts(products, limit).map(p => ({ ...p, reason: 'Popular product for new users', score: p.rating }));

  const likedIds = userRatings.filter(r => r.rating >= 4).map(r => r.productId);
  const viewedIds = userInteractions.map(i => i.productId);
  const profileProducts = products.filter(p => [...likedIds, ...viewedIds].includes(p.id));
  const profileTokens = tokenize(profileProducts.map(productText).join(' '));

  return products
    .filter(p => !touchedIds.has(p.id))
    .map(p => {
      const contentScore = cosineSimilarity(profileTokens, tokenize(productText(p)));
      const popularityScore = p.rating / 5;
      const categoryBoost = profileProducts.some(x => x.category === p.category) ? 0.15 : 0;
      const score = (0.6 * contentScore) + (0.3 * popularityScore) + categoryBoost;
      return { ...p, score: Number(score.toFixed(4)), reason: contentScore > 0.2 ? 'Based on your interests' : 'Hybrid ML recommendation' };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
