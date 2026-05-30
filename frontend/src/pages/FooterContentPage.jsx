import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  BrainCircuit,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Rocket,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import BackButton from '../components/BackButton';
import ProductCard from '../components/ProductCard';

const pageContent = {
  electronics: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'Electronics',
    description: 'Explore flagship electronics curated through ratings, review density, and AI-powered relevance across phones, creator devices, gaming gear, and cameras.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    points: [
      'High-trust devices ranked by engagement and review quality',
      'Premium picks across AI gadgets, gaming, and creator hardware',
      'Recommendations tuned for performance, ecosystem fit, and value'
    ],
    ctaLabel: 'Explore full catalog',
    action: 'products'
  },
  smart_home: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'Smart Home',
    description: 'Build a connected home around security, automation, and ambient intelligence with AI-ranked products selected for reliability and ease of use.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Compare locks, cameras, lighting, and air quality devices',
      'Focus on privacy-first controls and dependable automation',
      'Recommendations prioritized by household utility and ratings'
    ],
    ctaLabel: 'Browse smart home products',
    action: 'products'
  },
  ai_gadgets: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'AI Gadgets',
    description: 'Discover AI-native hardware designed for productivity, context awareness, translation, content creation, and next-generation personal computing.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=80',
    points: [
      'AI-first wearables, phones, and experimental personal devices',
      'Explainable ranking driven by trend velocity and review depth',
      'Clear guidance on where AI meaningfully improves the experience'
    ],
    ctaLabel: 'View AI product picks',
    action: 'products'
  },
  fashion: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'Fashion',
    description: 'Shop premium everyday fashion through a cleaner decision flow that emphasizes materials, usefulness, ratings, and long-term versatility.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Sneakers, bags, watches, and travel-ready essentials',
      'Review-backed picks with stronger value and satisfaction signals',
      'Lifestyle-oriented merchandising without clutter or noise'
    ],
    ctaLabel: 'See fashion recommendations',
    action: 'products'
  },
  beauty: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'Beauty',
    description: 'Review modern beauty and wellness products with a focus on technology-enabled routines, verified results, and transparent product positioning.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Beauty devices and premium care kits with clearer evaluation',
      'Useful guidance organized around routine fit and outcomes',
      'Readable product intelligence without inflated marketing claims'
    ],
    ctaLabel: 'Browse beauty picks',
    action: 'products'
  },
  books: {
    type: 'category',
    eyebrow: 'Category Hub',
    title: 'Books',
    description: 'Find smart, practical reading recommendations across machine learning, engineering, and professional growth with AI-assisted discovery.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Technology books ranked by usefulness and reader feedback',
      'Clean summaries for quick shortlist building',
      'Great entry points for ML, Python, and data-focused learning'
    ],
    ctaLabel: 'Explore reading guides',
    action: 'products'
  },
  about: {
    type: 'content',
    eyebrow: 'Company',
    title: 'About Us',
    description: 'AI Recommend is a premium AI-powered ecommerce platform built to make product discovery feel more intelligent, trustworthy, and readable.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80',
    icon: BrainCircuit,
    sections: [
      {
        title: 'What we build',
        body: 'We combine recommendation systems, product analytics, review intelligence, and ecommerce UX into one platform that helps shoppers move from curiosity to confident purchase decisions faster.'
      },
      {
        title: 'Why it feels different',
        body: 'Instead of trapping every insight inside heavy boxes, we structure content like a premium editorial storefront: clean hierarchy, useful signals, and product cards only where interaction matters.'
      },
      {
        title: 'How AI helps',
        body: 'Ranking blends category fit, review quality, trend momentum, and behavioral signals so recommendations feel relevant, explainable, and grounded in practical shopping value.'
      }
    ],
    highlights: ['AI-native shopping flows', 'Review-aware product ranking', 'Premium ecommerce presentation'],
    ctaLabel: 'Explore the platform',
    action: 'home'
  },
  careers: {
    type: 'content',
    eyebrow: 'Company',
    title: 'Careers',
    description: 'Join a team building the future of AI-driven shopping experiences across machine learning, commerce design, and recommendation infrastructure.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    icon: Briefcase,
    sections: [
      {
        title: 'Open roles',
        body: 'We are interested in frontend engineers, ML engineers, product designers, and analytics-minded builders who care about making AI genuinely useful in ecommerce.'
      },
      {
        title: 'How we work',
        body: 'Our product culture values readable interfaces, careful experimentation, and shipping experiences that help people understand why a recommendation exists.'
      },
      {
        title: 'What you will shape',
        body: 'You will influence ranking UX, product intelligence surfaces, shopping assistant flows, and the systems that connect recommendations to real user confidence.'
      }
    ],
    highlights: ['Remote-friendly collaboration', 'Product + ML pairing culture', 'High-ownership execution'],
    ctaLabel: 'Contact recruiting',
    action: 'contact'
  },
  partnerships: {
    type: 'content',
    eyebrow: 'Company',
    title: 'Partnerships',
    description: 'Partner with AI Recommend to connect premium products, retail catalogs, creator intelligence, and AI merchandising into one polished experience.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    icon: Users,
    sections: [
      {
        title: 'For brands',
        body: 'Feature products in high-intent recommendation zones backed by review data, trend scoring, and editorial category hubs that help buyers understand fit quickly.'
      },
      {
        title: 'For retailers',
        body: 'Integrate recommendation layers into your existing catalog to improve discovery, better organize long-tail inventory, and surface trusted social proof.'
      },
      {
        title: 'For creators and publishers',
        body: 'Bring content, review perspective, and category expertise into a storefront experience that respects audience trust and shopping clarity.'
      }
    ],
    highlights: ['Brand placement with context', 'AI merchandising support', 'Content-to-commerce pathways'],
    ctaLabel: 'Start a partnership conversation',
    action: 'contact'
  },
  innovation: {
    type: 'content',
    eyebrow: 'Company',
    title: 'Innovation',
    description: 'See how our innovation work explores recommendation systems, interpretable ranking, analytics-led shopping, and AI-first commerce interactions.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80',
    icon: Rocket,
    sections: [
      {
        title: 'Recommendation engine design',
        body: 'We experiment with hybrid ranking models that combine collaborative patterns, content similarity, quality signals, and confidence scoring.'
      },
      {
        title: 'Shopping intelligence',
        body: 'Our analytics layer surfaces review density, trend movement, and product momentum so recommendations are not just flashy, but grounded in evidence.'
      },
      {
        title: 'Readable AI UX',
        body: 'We care deeply about making complex systems legible through better hierarchy, clearer reasoning, and layouts that support decision-making rather than overwhelm it.'
      }
    ],
    highlights: ['Hybrid ML ranking', 'Interpretability-first UX', 'Modern analytics surfaces'],
    ctaLabel: 'View AI insights',
    action: 'insights'
  },
  blog: {
    type: 'content',
    eyebrow: 'Resources',
    title: 'Blog',
    description: 'Read product thinking, ecommerce strategy, and AI shopping perspectives written for teams building more helpful digital commerce experiences.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80',
    icon: Newspaper,
    sections: [
      {
        title: 'Editorial product analysis',
        body: 'We break down what makes premium category pages, recommendation modules, and review-aware shopping flows feel useful rather than generic.'
      },
      {
        title: 'Designing for confidence',
        body: 'Our articles focus on the intersection of readable UX, trustworthy product detail presentation, and commerce interactions that respect user attention.'
      },
      {
        title: 'Applied AI in ecommerce',
        body: 'We share practical ideas for using machine learning to improve discovery, sorting, personalization, and post-purchase account experiences.'
      }
    ],
    highlights: ['Product strategy notes', 'Commerce UX commentary', 'AI implementation ideas'],
    ctaLabel: 'Browse AI insights',
    action: 'insights'
  },
  insights: {
    type: 'content',
    eyebrow: 'Resources',
    title: 'AI Insights',
    description: 'Explore how recommendation quality, review trust, analytics, and ranking explainability shape better ecommerce experiences.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    icon: BarChart3,
    sections: [
      {
        title: 'Trend intelligence',
        body: 'We monitor which products earn sustained attention, where ratings remain strong over time, and how category momentum changes across emerging tech segments.'
      },
      {
        title: 'Review signal quality',
        body: 'Not every review count is equally useful. We look for patterns in rating consistency, source mix, and discussion depth to surface stronger product confidence.'
      },
      {
        title: 'Explainable recommendations',
        body: 'The goal is not just to rank products, but to make those rankings understandable through reason summaries, category context, and shopping-focused design.'
      }
    ],
    highlights: ['Trend movement tracking', 'Review quality analysis', 'Recommendation explainability'],
    ctaLabel: 'Explore AI-ranked products',
    action: 'products'
  },
  newsletters: {
    type: 'content',
    eyebrow: 'Resources',
    title: 'Newsletters',
    description: 'Subscribe to product intelligence updates covering AI gadgets, smart home breakthroughs, top-rated picks, and premium ecommerce design trends.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    icon: Mail,
    sections: [
      {
        title: 'What you receive',
        body: 'A curated digest of category standouts, buying guides, product drops, and AI commerce thinking written for people who want signal instead of noise.'
      },
      {
        title: 'How often',
        body: 'Expect concise weekly updates built for busy readers who want to stay current without digging through crowded marketplaces.'
      }
    ],
    highlights: ['Weekly curated digest', 'AI shopping coverage', 'Category-specific picks'],
    ctaLabel: 'Manage account preferences',
    action: 'account_settings'
  },
  guides: {
    type: 'content',
    eyebrow: 'Resources',
    title: 'Product Guides',
    description: 'Use our guides to compare features, narrow choices, and understand which product attributes matter most for your actual use case.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80',
    icon: BookOpen,
    sections: [
      {
        title: 'Buying with context',
        body: 'Our guides explain who a product is best for, what tradeoffs matter, and where premium pricing is justified versus where a simpler option may be smarter.'
      },
      {
        title: 'AI-assisted comparison',
        body: 'We use ratings, review summaries, and category logic to simplify technical choices while keeping final recommendations grounded and practical.'
      },
      {
        title: 'Cross-category usefulness',
        body: 'From electronics and AI devices to books and smart home gear, guides are structured to help both first-time buyers and detail-oriented shoppers.'
      }
    ],
    highlights: ['Decision-friendly comparisons', 'Use-case-based guidance', 'Cleaner shortlist building'],
    ctaLabel: 'Open the products page',
    action: 'products'
  },
  contact: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Contact',
    description: 'Get in touch for platform support, product questions, partnerships, or general feedback about the AI Recommend shopping experience.',
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80',
    icon: Mail,
    sections: [
      {
        title: 'Support channels',
        body: 'We route requests around orders, product feedback, account access, and platform questions with clear next steps and response expectations.'
      },
      {
        title: 'Best way to reach us',
        body: 'Use the support form below when you want a response tied to a shopping issue, recommendation question, or account workflow.'
      }
    ],
    highlights: ['Support for shopping flows', 'Fast contact intake', 'Clear escalation paths'],
    ctaLabel: 'Explore products',
    action: 'products'
  },
  privacy: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Privacy',
    description: 'Understand how AI Recommend handles session data, personalization signals, account storage, and safe commerce experience design.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
    icon: ShieldCheck,
    sections: [
      {
        title: 'What we store',
        body: 'We use local or session storage for account continuity, wishlist state, order history, and user-friendly shopping persistence inside this demo experience.'
      },
      {
        title: 'How personalization works',
        body: 'Recommendation and shopping signals rely on browsing behavior, wishlist actions, and product interactions to make future suggestions more relevant.'
      },
      {
        title: 'Security principles',
        body: 'Sensitive payment information should remain minimized, protected, and never include stored CVV or complete card numbers in the client.'
      }
    ],
    highlights: ['Transparent data handling', 'Readable policy language', 'Privacy-aware shopping design'],
    ctaLabel: 'Review privacy choices',
    action: 'preferences'
  },
  account_settings: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Account Settings',
    description: 'Manage how your account experience works, from saved shopping preferences to order alerts and personalization settings.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    icon: Settings2,
    sections: [
      {
        title: 'Profile and session controls',
        body: 'Review your account, sign-in continuity, and dashboard access so your recommendations, orders, and saved activity stay easy to manage.'
      },
      {
        title: 'Communication preferences',
        body: 'Choose which updates matter most, including order confirmations, product guides, and AI insight digests.'
      }
    ],
    highlights: ['Account visibility', 'Preference controls', 'Dashboard handoff'],
    ctaLabel: 'Open dashboard settings',
    action: 'dashboard_settings'
  },
  refund: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Refund Policy',
    description: 'Review a clear, shopper-friendly refund overview covering eligibility windows, return expectations, and how support requests are handled.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    icon: Settings2,
    sections: [
      {
        title: 'Eligibility and timing',
        body: 'Refund requests should be assessed against order timing, product condition, payment confirmation, and seller-side return terms in a production ecommerce workflow.'
      },
      {
        title: 'Support and verification',
        body: 'When a refund is requested, order ID, transaction ID, and shipping details help support teams validate the case quickly and reduce friction.'
      },
      {
        title: 'Customer clarity',
        body: 'The goal is a predictable process with visible expectations, status updates, and easy access to order history when something goes wrong.'
      }
    ],
    highlights: ['Clear eligibility guidance', 'Order validation context', 'Customer-first policy design'],
    ctaLabel: 'Contact support',
    action: 'contact'
  },
  preferences: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Your Privacy Choices',
    description: 'Choose how personalization, updates, and convenience settings shape your AI Recommend experience across shopping and account flows.',
    image: 'https://images.unsplash.com/photo-1516321310764-8d5b1cf95d84?auto=format&fit=crop&w=1400&q=80',
    icon: ShieldCheck,
    sections: [
      {
        title: 'Personalization controls',
        body: 'Your choices affect how recommendations adapt to wishlist activity, viewed products, and category browsing patterns over time.'
      },
      {
        title: 'Communication choices',
        body: 'You can choose whether to receive newsletters, product guides, and trend updates while keeping the experience concise and relevant.'
      }
    ],
    highlights: ['Personalization toggles', 'Communication clarity', 'Quick preference review'],
    ctaLabel: 'Go to dashboard',
    action: 'dashboard_settings'
  },
  terms: {
    type: 'content',
    eyebrow: 'Support',
    title: 'User Agreement',
    description: 'Read the operating principles for using AI Recommend, including account behavior, product data usage, and expectations around platform access.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    icon: ShieldCheck,
    sections: [
      {
        title: 'Using the platform responsibly',
        body: 'AI Recommend is built for product discovery, shopping research, and ecommerce experimentation. Access should respect platform boundaries and protected features.'
      },
      {
        title: 'Recommendation content',
        body: 'Insights and ranking signals are designed to help users compare products more effectively, but final purchase decisions remain with the shopper.'
      },
      {
        title: 'Service evolution',
        body: 'As the product grows, experiences, policies, and capabilities may evolve to support better security, reliability, and commerce functionality.'
      }
    ],
    highlights: ['Clear usage expectations', 'Recommendation transparency', 'Platform reliability'],
    ctaLabel: 'Return home',
    action: 'home'
  },
  sitemap: {
    type: 'content',
    eyebrow: 'Support',
    title: 'Sitemap',
    description: 'Browse the main destinations in AI Recommend, from product exploration and AI insights to support, account, and order workflows.',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80',
    icon: Sparkles,
    sections: [
      {
        title: 'Shopping destinations',
        body: 'Home, Products, Product Detail, Wishlist, Cart, and category-specific editorial hubs help users move through discovery and purchase steps clearly.'
      },
      {
        title: 'Account destinations',
        body: 'Login, Signup, Dashboard, Orders, Wishlist, and Settings provide continuity for saved activity, recommendations, and post-purchase visibility.'
      },
      {
        title: 'Information destinations',
        body: 'About, AI Insights, Product Guides, Privacy, Refund Policy, and other footer-linked pages provide richer context around the platform.'
      }
    ],
    highlights: ['Shopping flows', 'Account flows', 'Information architecture'],
    ctaLabel: 'Explore products',
    action: 'products'
  }
};

function matchCategoryProduct(product, slug) {
  const tags = (product.tags || []).map(tag => tag.toLowerCase());
  switch (slug) {
    case 'electronics':
      return product.category === 'Electronics';
    case 'smart_home':
      return product.category === 'Smart Home' || tags.includes('smart-home') || tags.includes('iot');
    case 'ai_gadgets':
      return product.subcategory === 'AI Gadgets' || tags.includes('ai') || tags.includes('machine-learning');
    case 'fashion':
      return product.category === 'Fashion';
    case 'beauty':
      return product.category === 'Beauty & Skin Care' || tags.includes('beauty') || tags.includes('skincare');
    case 'books':
      return product.category === 'Books';
    default:
      return false;
  }
}

function buildRecommendations(products, relatedProducts) {
  const relatedIds = new Set(relatedProducts.map(product => product.id));
  const sorted = [...products]
    .filter(product => !relatedIds.has(product.id))
    .sort((a, b) => (Number(b.isTrending) - Number(a.isTrending)) || b.rating - a.rating || b.reviewCount - a.reviewCount);
  return sorted.slice(0, 4);
}

export default function FooterContentPage({
  slug,
  products,
  wishlistIds,
  user,
  onBack,
  onNavigate,
  onOpenProduct,
  onAddActivity,
  onToggleWishlist,
  onAddToCart
}) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSaved, setNewsletterSaved] = useState(false);
  const [accountPrefs, setAccountPrefs] = useState({
    orderAlerts: true,
    guides: true,
    insights: false
  });
  const [accountSaved, setAccountSaved] = useState(false);

  const content = pageContent[slug] || pageContent.about;
  const isCategoryPage = content.type === 'category';

  useEffect(() => {
    try {
      const storedPrefs = JSON.parse(localStorage.getItem('account_content_prefs') || 'null');
      if (storedPrefs) setAccountPrefs(prev => ({ ...prev, ...storedPrefs }));
    } catch {
      // ignore storage parsing issues
    }
  }, []);

  const relatedProducts = useMemo(() => {
    if (!isCategoryPage) return [];
    return products.filter(product => matchCategoryProduct(product, slug)).slice(0, 8);
  }, [isCategoryPage, products, slug]);

  const recommendationProducts = useMemo(() => {
    if (isCategoryPage) {
      return buildRecommendations(products, relatedProducts);
    }
    return [...products]
      .sort((a, b) => Number(b.isTrending) - Number(a.isTrending) || b.rating - a.rating || b.reviewCount - a.reviewCount)
      .slice(0, 4);
  }, [isCategoryPage, products, relatedProducts]);

  const categoryStats = useMemo(() => {
    if (!isCategoryPage) return [];
    const avgRating = relatedProducts.length
      ? (relatedProducts.reduce((sum, product) => sum + (product.rating || 0), 0) / relatedProducts.length).toFixed(1)
      : '0.0';
    const reviewCount = relatedProducts.reduce((sum, product) => sum + (product.reviewCount || 0), 0);
    return [
      { label: 'Products', value: relatedProducts.length || 0 },
      { label: 'Average rating', value: avgRating },
      { label: 'Tracked reviews', value: reviewCount || 0 }
    ];
  }, [isCategoryPage, relatedProducts]);

  function handleOpenProduct(product) {
    if (onAddActivity) onAddActivity('Viewed product details', product);
    onOpenProduct(product);
  }

  function handlePrimaryAction(action) {
    if (action === 'products') return onNavigate('products');
    if (action === 'home') return onNavigate('home');
    if (action === 'contact') return onNavigate('content', { slug: 'contact' });
    if (action === 'preferences') return onNavigate('content', { slug: 'preferences' });
    if (action === 'insights') return onNavigate('content', { slug: 'insights' });
    if (action === 'account_settings') return onNavigate('content', { slug: 'account_settings' });
    if (action === 'dashboard_settings') return onNavigate(user ? 'dashboard' : 'login', user ? { dashboardTab: 'settings' } : {});
  }

  function submitContactForm(event) {
    event.preventDefault();
    setContactSent(true);
    setContactForm({ name: '', email: '', message: '' });
  }

  function submitNewsletter(event) {
    event.preventDefault();
    localStorage.setItem('newsletter_signup_email', newsletterEmail.trim());
    setNewsletterSaved(true);
    setNewsletterEmail('');
  }

  function saveAccountPreferences(event) {
    event.preventDefault();
    localStorage.setItem('account_content_prefs', JSON.stringify(accountPrefs));
    setAccountSaved(true);
  }

  return (
    <main className="page-shell footer-content-page">
      <BackButton label="< Back" onClick={onBack} />

      <section className="footer-content-hero">
        <div className="footer-content-copy">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>

          {content.points?.length ? (
            <div className="footer-content-points">
              {content.points.map(point => (
                <div key={point}>
                  <Sparkles size={16} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ) : null}

          {content.highlights?.length ? (
            <div className="footer-highlight-row">
              {content.highlights.map(item => <span key={item}>{item}</span>)}
            </div>
          ) : null}

          {content.ctaLabel ? (
            <div className="hero-actions">
              <button className="button-primary" onClick={() => handlePrimaryAction(content.action)}>
                {content.ctaLabel}
                <ArrowRight size={16} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="footer-content-visual">
          <img src={content.image} alt={content.title} />
        </div>
      </section>

      {isCategoryPage ? (
        <>
          <section className="footer-metric-strip">
            {categoryStats.map(item => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </section>

          <section className="footer-editorial-section">
            <div className="section-header editorial-section-head">
              <div>
                <h2>Why this category stands out</h2>
                <p>Useful context, stronger recommendations, and products matched to how shoppers actually compare options.</p>
              </div>
            </div>
            <div className="footer-text-columns">
              <div>
                <h3>Category overview</h3>
                <p>{content.description}</p>
              </div>
              <div>
                <h3>Recommendation signals</h3>
                <p>We rank within this category using review quality, product relevance, trend movement, and overall usefulness so standout products surface faster.</p>
              </div>
            </div>
          </section>

          <section className="footer-editorial-section">
            <div className="section-header editorial-section-head">
              <div>
                <h2>Related products</h2>
                <p>Products matched to this category with working product detail, wishlist, and add-to-cart actions.</p>
              </div>
            </div>
            {relatedProducts.length ? (
              <div className="product-grid full-grid footer-products-grid">
                {relatedProducts.map(product => (
                  <div key={product.id} className="footer-product-stack">
                    <ProductCard
                      product={product}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={() => onToggleWishlist(product)}
                      onAddToCart={() => onAddToCart(product, 1)}
                      onView={() => handleOpenProduct(product)}
                    />
                    <div className="footer-product-actions">
                      <button className="button-secondary" onClick={() => handleOpenProduct(product)}>View details</button>
                      <button className="button-primary" onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="footer-empty-copy">
                <p>No matching products are available yet for this category.</p>
              </div>
            )}
          </section>

          <section className="footer-editorial-section">
            <div className="section-header editorial-section-head">
              <div>
                <h2>Recommended next</h2>
                <p>Additional AI-ranked products worth comparing alongside this category shortlist.</p>
              </div>
            </div>
            <div className="product-grid footer-recommend-grid">
              {recommendationProducts.map(product => (
                <button key={product.id} className="footer-recommend-tile" onClick={() => handleOpenProduct(product)}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.category} · {product.rating.toFixed(1)} rating</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="footer-editorial-section">
            <div className="footer-copy-stack">
              {(content.sections || []).map(section => {
                const Icon = content.icon || Sparkles;
                return (
                  <article key={section.title} className="footer-copy-block">
                    <div className="footer-copy-heading">
                      <div className="editorial-icon">
                        <Icon size={18} />
                      </div>
                      <h2>{section.title}</h2>
                    </div>
                    <p>{section.body}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {slug === 'contact' && (
            <section className="footer-editorial-section">
              <div className="footer-support-layout">
                <form className="footer-form-panel" onSubmit={submitContactForm}>
                  <h2>Send a message</h2>
                  <label>
                    Name
                    <input value={contactForm.name} onChange={event => setContactForm(prev => ({ ...prev, name: event.target.value }))} required />
                  </label>
                  <label>
                    Email
                    <input type="email" value={contactForm.email} onChange={event => setContactForm(prev => ({ ...prev, email: event.target.value }))} required />
                  </label>
                  <label>
                    Message
                    <textarea rows="5" value={contactForm.message} onChange={event => setContactForm(prev => ({ ...prev, message: event.target.value }))} required />
                  </label>
                  <button className="button-primary" type="submit">
                    <Send size={16} />
                    Submit request
                  </button>
                  {contactSent && <p className="footer-form-success">Thanks — your request has been captured for follow-up.</p>}
                </form>

                <div className="footer-support-copy">
                  <h2>Support details</h2>
                  <div className="contact-list">
                    <p><Mail size={16} /> support@airecommend.ai</p>
                    <p><Phone size={16} /> +1 (415) 555-0181</p>
                    <p><MapPin size={16} /> San Francisco, California</p>
                  </div>
                  <p>Use this form for account help, order questions, category recommendations, and platform feedback.</p>
                </div>
              </div>
            </section>
          )}

          {slug === 'newsletters' && (
            <section className="footer-editorial-section">
              <form className="footer-inline-form" onSubmit={submitNewsletter}>
                <div>
                  <h2>Subscribe to updates</h2>
                  <p>Get weekly AI shopping and recommendation highlights in one concise digest.</p>
                </div>
                <div className="footer-inline-form-controls">
                  <input type="email" value={newsletterEmail} onChange={event => setNewsletterEmail(event.target.value)} placeholder="Email address" required />
                  <button className="button-primary" type="submit">Subscribe</button>
                </div>
              </form>
              {newsletterSaved && <p className="footer-form-success">Subscription saved locally for this demo experience.</p>}
            </section>
          )}

          {(slug === 'account_settings' || slug === 'preferences') && (
            <section className="footer-editorial-section">
              <div className="footer-support-layout">
                <form className="footer-form-panel" onSubmit={saveAccountPreferences}>
                  <h2>Preference controls</h2>
                  <label className="check-line checkbox-row">
                    <input type="checkbox" checked={accountPrefs.orderAlerts} onChange={event => setAccountPrefs(prev => ({ ...prev, orderAlerts: event.target.checked }))} />
                    <span>Order alerts and purchase updates</span>
                  </label>
                  <label className="check-line checkbox-row">
                    <input type="checkbox" checked={accountPrefs.guides} onChange={event => setAccountPrefs(prev => ({ ...prev, guides: event.target.checked }))} />
                    <span>Product guides and buying recommendations</span>
                  </label>
                  <label className="check-line checkbox-row">
                    <input type="checkbox" checked={accountPrefs.insights} onChange={event => setAccountPrefs(prev => ({ ...prev, insights: event.target.checked }))} />
                    <span>AI insights and trend briefings</span>
                  </label>
                  <button className="button-primary" type="submit">Save preferences</button>
                  {accountSaved && <p className="footer-form-success">Preferences saved locally.</p>}
                </form>

                <div className="footer-support-copy">
                  <h2>Account handoff</h2>
                  <p>{user ? `Signed in as ${user.name}. You can continue to the dashboard for profile, orders, wishlist, and settings.` : 'Login to access dashboard-based account controls, orders, and saved shopping activity.'}</p>
                  <button className="button-secondary" onClick={() => handlePrimaryAction('dashboard_settings')}>
                    {user ? 'Open dashboard settings' : 'Login to continue'}
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="footer-editorial-section">
            <div className="section-header editorial-section-head">
              <div>
                <h2>Related product recommendations</h2>
                <p>Helpful products and premium picks connected to this part of the platform.</p>
              </div>
            </div>
            <div className="product-grid footer-recommend-grid footer-recommend-grid-cards">
              {recommendationProducts.map(product => (
                <div key={product.id} className="footer-product-stack">
                  <ProductCard
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={() => onToggleWishlist(product)}
                    onAddToCart={() => onAddToCart(product, 1)}
                    onView={() => handleOpenProduct(product)}
                  />
                  <div className="footer-product-actions">
                    <button className="button-secondary" onClick={() => handleOpenProduct(product)}>View details</button>
                    <button className="button-primary" onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
