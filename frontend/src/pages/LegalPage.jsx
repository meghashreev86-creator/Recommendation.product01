import React from 'react';
import { ShieldCheck } from 'lucide-react';
import BackButton from '../components/BackButton';

const contentMap = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'AI Recommend uses account, wishlist, search, and interaction data to improve recommendation quality and maintain secure sessions.',
      'Passwords are hashed on the backend, protected routes are JWT-aware, and session expiry is handled in the client experience.',
      'Review dashboards rely on APIs or safe demo metadata only. The product does not use unsafe scraping practices.'
    ]
  },
  terms: {
    title: 'User Agreement',
    body: [
      'Use the platform responsibly and do not misuse service endpoints or protected admin functions.',
      'Product insights, recommendations, and social review summaries are provided for informed shopping assistance.',
      'Platform policies may evolve to support security, legal compliance, and operational reliability.'
    ]
  },
  preferences: {
    title: 'Your Privacy Choices',
    body: [
      'Manage cookies, personalization, and update preferences using the connected settings and privacy controls.',
      'These controls affect how AI Recommend stores convenience settings and recommendation behavior.',
      'You can revisit these preferences at any time from the dashboard settings area.'
    ]
  },
  refund: {
    title: 'Refund Policy',
    body: [
      'Order, refund, and return expectations should be communicated clearly before checkout in a production deployment.',
      'This demo experience focuses on interface, recommendation, and account flow design rather than live commerce settlement.',
      'Refund rules can be connected to your backend commerce and payment systems without changing the surrounding UI structure.'
    ]
  },
  sitemap: {
    title: 'Sitemap',
    body: [
      'Primary destinations include Home, Products, Product Detail, Wishlist, Cart, Dashboard, About, and Policy pages.',
      'Supporting flows include secure Login, Signup, protected Dashboard sections, and Admin Controls for catalog management.',
      'Recommendation, review, and detail experiences are designed to stay navigable across desktop, tablet, and mobile.'
    ]
  },
  careers: {
    title: 'Careers',
    body: [
      'Join the team building the future of AI-driven commerce. We are looking for engineers, designers, and ML researchers.',
      'Check back soon for active job listings in San Francisco and remote roles.',
    ]
  },
  partnerships: {
    title: 'Partnerships',
    body: [
      'We collaborate with brands and retailers to integrate AI recommendation layers into their existing catalogs.',
      'Reach out to our partnership team to learn how to feature your premium products on AI Recommend.',
    ]
  },
  innovation: {
    title: 'Innovation Lab',
    body: [
      'Exploring the boundaries of explainable AI, neural search, and interactive shopping interfaces.',
      'Our lab focuses on making machine learning transparent and helpful for everyday consumers.',
    ]
  },
  blog: {
    title: 'AI Recommend Blog',
    body: [
      'Latest news on shopping trends, AI breakthroughs, and product guides.',
      'Stay tuned for deep dives into how our recommendation engine works.',
    ]
  },
  insights: {
    title: 'AI Insights',
    body: [
      'Data-driven reports on consumer behavior and emerging tech categories.',
      'Learn what’s trending and why, powered by our aggregate analysis.',
    ]
  },
  newsletters: {
    title: 'Newsletters',
    body: [
      'Get personalized weekly digests of AI-ranked products and tech news directly in your inbox.',
      'Subscribe from your account settings to stay ahead of the curve.',
    ]
  },
  guides: {
    title: 'Product Guides',
    body: [
      'Comprehensive buying guides for electronics, fashion, and home tech.',
      'Our guides simplify complex specs into clear, AI-validated recommendations.',
    ]
  },
  electronics: {
    title: 'Electronics Reviews',
    body: [
      'Deep dives into the latest smartphones, laptops, and wearable tech.',
      'Our AI analyzes thousands of reviews to give you the real story behind the specs.',
    ]
  },
  smart_home: {
    title: 'Smart Home Advice',
    body: [
      'Building an ecosystem that works for you. From security to automation.',
      'We review compatibility, ease of use, and privacy standards for all smart home devices.',
    ]
  },
  ai_gadgets: {
    title: 'AI Gadgets & Tools',
    body: [
      'Reviewing the next generation of AI-native hardware.',
      'From AI pins to specialized translation devices, we track the cutting edge of personal technology.',
    ]
  },
  fashion: {
    title: 'Fashion Recommendations',
    body: [
      'Trend analysis meets AI-powered fit and style suggestions.',
      'We analyze designer collections and consumer feedback to recommend premium apparel.',
    ]
  },
  beauty: {
    title: 'Beauty & Wellness',
    body: [
      'Science-backed reviews of premium skincare and tech-enabled wellness devices.',
      'Personalized advice based on ingredient transparency and verified results.',
    ]
  },
  books: {
    title: 'Literary Insights',
    body: [
      'Curated reading lists powered by AI sentiment analysis and genre trends.',
      'Find your next great read through our deep literary analysis tools.',
    ]
  }
};

export default function LegalPage({ type, prefs, onPrefsChange, onBack }) {
  const content = contentMap[type] || contentMap.privacy;
  const showPreferences = type === 'preferences' && prefs && onPrefsChange;

  return (
    <main className="page-shell legal-page">
      <BackButton label="< Back" onClick={onBack} />
      <section className="light-panel legal-page-panel">
        <span className="eyebrow">Policy</span>
        <h1>{content.title}</h1>
        {content.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

        {showPreferences && (
          <div className="preference-card">
            <div className="panel-header preference-card-head">
              <h2>Preference settings</h2>
              <ShieldCheck size={18} />
            </div>

            <div className="preference-grid">
              <label className="check-line checkbox-row">
                <input
                  type="checkbox"
                  checked={prefs.cookies}
                  onChange={event => onPrefsChange(prev => ({ ...prev, cookies: event.target.checked }))}
                />
                <span>Enable cookies for secure session continuity</span>
              </label>

              <label className="check-line checkbox-row">
                <input
                  type="checkbox"
                  checked={prefs.personalization}
                  onChange={event => onPrefsChange(prev => ({ ...prev, personalization: event.target.checked }))}
                />
                <span>Enable recommendation personalization</span>
              </label>

              <label className="check-line checkbox-row">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={event => onPrefsChange(prev => ({ ...prev, marketing: event.target.checked }))}
                />
                <span>Enable marketing updates</span>
              </label>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
