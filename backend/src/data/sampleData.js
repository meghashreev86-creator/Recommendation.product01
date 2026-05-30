export const users = [
  { id: 'u1', name: 'Demo User', email: 'user@example.com', password: 'password123', role: 'user', age: 22, location: 'Bengaluru' },
  { id: 'u2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin', age: 25, location: 'Bengaluru' },
  { id: 'u3', name: 'Neha Sharma', email: 'neha@example.com', password: 'password123', role: 'user', age: 21, location: 'Chennai' }
];

export const products = [
  { id: 'p1', name: 'Wireless Headphones Pro', brand: 'SoundMax', category: 'Electronics', price: 2499, rating: 4.6, stock: 28, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', description: 'Bluetooth wireless headphones with deep bass noise cancellation and long battery life', tags: ['audio','bluetooth','music','wireless'] },
  { id: 'p2', name: 'Smart Fitness Watch', brand: 'FitPulse', category: 'Wearables', price: 3299, rating: 4.4, stock: 35, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80', description: 'Smart watch with heart rate monitor step tracking sleep tracking and sports modes', tags: ['fitness','watch','health','smart'] },
  { id: 'p3', name: 'Gaming Laptop X15', brand: 'TechNova', category: 'Computers', price: 72999, rating: 4.8, stock: 9, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80', description: 'High performance gaming laptop with dedicated graphics fast SSD and RGB keyboard', tags: ['gaming','laptop','computer','performance'] },
  { id: 'p4', name: 'Ergonomic Office Chair', brand: 'WorkEase', category: 'Furniture', price: 8999, rating: 4.5, stock: 18, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=80', description: 'Comfortable ergonomic chair for office study and long working hours', tags: ['chair','office','comfort','furniture'] },
  { id: 'p5', name: 'Mechanical Keyboard', brand: 'KeyCraft', category: 'Computers', price: 4199, rating: 4.7, stock: 22, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=700&q=80', description: 'RGB mechanical keyboard with blue switches for typing and gaming', tags: ['keyboard','gaming','rgb','computer'] },
  { id: 'p6', name: 'Noise Cancelling Earbuds', brand: 'SoundMax', category: 'Electronics', price: 1999, rating: 4.3, stock: 40, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80', description: 'Compact earbuds with active noise cancellation touch controls and charging case', tags: ['audio','earbuds','wireless','music'] },
  { id: 'p7', name: 'Data Science Handbook', brand: 'EduBooks', category: 'Books', price: 799, rating: 4.6, stock: 55, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80', description: 'Beginner friendly book for data science python pandas machine learning and analytics', tags: ['book','data','machine-learning','python'] },
  { id: 'p8', name: 'AI Study Tablet', brand: 'TabEdge', category: 'Electronics', price: 15999, rating: 4.2, stock: 14, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=80', description: 'Lightweight tablet for study notes video classes entertainment and productivity', tags: ['tablet','study','portable','electronics'] },
  { id: 'p9', name: 'Running Shoes Air', brand: 'RunFast', category: 'Fashion', price: 2799, rating: 4.1, stock: 31, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80', description: 'Lightweight running shoes with cushioned sole breathable design and stylish look', tags: ['shoes','running','sports','fashion'] },
  { id: 'p10', name: 'Portable Bluetooth Speaker', brand: 'SoundMax', category: 'Electronics', price: 1499, rating: 4.2, stock: 46, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80', description: 'Portable speaker with punchy sound waterproof body and long battery backup', tags: ['speaker','audio','bluetooth','portable'] },
  { id: 'p11', name: 'Python Programming Guide', brand: 'EduBooks', category: 'Books', price: 599, rating: 4.5, stock: 44, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80', description: 'Complete python programming guide for beginners with projects and examples', tags: ['book','python','programming','coding'] },
  { id: 'p12', name: '4K Action Camera', brand: 'ViewShot', category: 'Electronics', price: 6499, rating: 4.0, stock: 17, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80', description: 'Action camera for travel sports video recording waterproof and compact design', tags: ['camera','travel','video','electronics'] }
];

export const ratings = [
  { userId: 'u1', productId: 'p1', rating: 5 }, { userId: 'u1', productId: 'p6', rating: 4 }, { userId: 'u1', productId: 'p10', rating: 5 },
  { userId: 'u3', productId: 'p7', rating: 5 }, { userId: 'u3', productId: 'p11', rating: 4 }, { userId: 'u3', productId: 'p8', rating: 4 },
  { userId: 'u2', productId: 'p3', rating: 5 }, { userId: 'u2', productId: 'p5', rating: 5 }
];

export const interactions = [
  { userId: 'u1', productId: 'p1', type: 'view', timestamp: Date.now() - 500000 },
  { userId: 'u1', productId: 'p6', type: 'click', timestamp: Date.now() - 300000 },
  { userId: 'u3', productId: 'p7', type: 'view', timestamp: Date.now() - 200000 }
];
