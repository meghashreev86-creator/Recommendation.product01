import React from 'react';
import { BarChart3, Bot, CheckCircle, Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Rocket, ShieldCheck, Twitter, Youtube, Zap } from 'lucide-react';
import BackButton from '../components/BackButton';

const highlights = [
  'Explainable recommendation engine',
  'Behavioral and content-based ranking',
  'Cross-platform review intelligence',
  'Premium checkout and order tracking',
  'Secure dashboard with account controls'
];

export default function AboutContact({ onOpenLegalPage, onBack }) {
  return (
    <main className="page-shell about-page">
      <BackButton label="< Back" onClick={onBack} />

      <section className="editorial-hero">
        <div className="editorial-copy">
          <span className="eyebrow">About AI Recommend</span>
          <h1>AI-native ecommerce for product discovery, recommendation intelligence, and confident shopping.</h1>
          <p>
            AI Recommend combines machine learning, shopping analytics, recommendation systems, and trusted review
            signals into a premium editorial commerce experience built for modern product decisions.
          </p>
        </div>
        <div className="editorial-visual">
          <img
            src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80"
            alt="AI product analytics workspace"
          />
        </div>
      </section>

      <section className="editorial-feature-layout about-editorial-layout">
        <div className="editorial-visual">
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
            alt="Machine learning and recommendation dashboard"
          />
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">AI commerce studio</span>
          <h2>Search, ranking, and explainable recommendations work together like a premium shopping concierge.</h2>
          <p>
            Our platform is designed to feel like a professional AI startup product, not a generic catalog. Every
            recommendation section is supported by review quality, behavior signals, and editorial clarity.
          </p>
          <div className="editorial-points">
            <div><Bot size={18} /><span>Recommendation engine tuned for clarity and confidence</span></div>
            <div><BarChart3 size={18} /><span>Analytics-backed product discovery and category intelligence</span></div>
            <div><ShieldCheck size={18} /><span>Trust layer focused on transparency, privacy, and readability</span></div>
          </div>
        </div>
      </section>

      <section className="editorial-flow-grid">
        <article>
          <div className="editorial-icon"><Rocket size={18} /></div>
          <h3>Vision</h3>
          <p>Define the next generation of ecommerce where machine learning acts as a trusted product advisor.</p>
        </article>
        <article>
          <div className="editorial-icon"><Zap size={18} /></div>
          <h3>Shopping Intelligence</h3>
          <p>Surface what is trending, what is top-rated, and what delivers the strongest value signals right now.</p>
        </article>
        <article>
          <div className="editorial-icon"><CheckCircle size={18} /></div>
          <h3>Platform Highlights</h3>
          <ul className="premium-feature-list">
            {highlights.map(item => (
              <li key={item}>
                <CheckCircle size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="editorial-contact-row">
        <div className="editorial-copy">
          <span className="eyebrow">Contact</span>
          <h2>Connect with the platform</h2>
          <p>Reach the team behind AI Recommend for product partnerships, commerce innovation, and platform updates.</p>
          <div className="contact-list">
            <p><Mail size={16} /> concierge@airecommend.ai</p>
            <p><Phone size={16} /> +1 (415) 555-0128</p>
            <p><MapPin size={16} /> San Francisco, California</p>
          </div>
        </div>

        <div className="editorial-copy">
          <span className="eyebrow">Follow</span>
          <h2>AI commerce stories and launch updates</h2>
          <p>Follow AI Recommend across product, developer, and creator channels.</p>
          <div className="footer-actions">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
          <div className="footer-legal-links inline-links">
            <button onClick={() => onOpenLegalPage('privacy')}>Privacy Policy</button>
            <button onClick={() => onOpenLegalPage('terms')}>User Agreement</button>
            <button onClick={() => onOpenLegalPage('preferences')}>Your Privacy Choices</button>
          </div>
        </div>
      </section>
    </main>
  );
}
