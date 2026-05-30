import React from 'react';
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Reviews & Advice',
    links: [
      { label: 'Electronics', href: '#content/electronics', key: 'electronics' },
      { label: 'Smart Home', href: '#content/smart_home', key: 'smart_home' },
      { label: 'AI Gadgets', href: '#content/ai_gadgets', key: 'ai_gadgets' },
      { label: 'Fashion', href: '#content/fashion', key: 'fashion' },
      { label: 'Beauty', href: '#content/beauty', key: 'beauty' },
      { label: 'Books', href: '#content/books', key: 'books' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#content/about', key: 'about' },
      { label: 'Careers', href: '#content/careers', key: 'careers' },
      { label: 'Partnerships', href: '#content/partnerships', key: 'partnerships' },
      { label: 'Innovation', href: '#content/innovation', key: 'innovation' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#content/blog', key: 'blog' },
      { label: 'AI Insights', href: '#content/insights', key: 'insights' },
      { label: 'Newsletters', href: '#content/newsletters', key: 'newsletters' },
      { label: 'Product Guides', href: '#content/guides', key: 'guides' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '#content/contact', key: 'contact' },
      { label: 'Privacy', href: '#content/privacy', key: 'privacy' },
      { label: 'Account Settings', href: '#content/account_settings', key: 'account_settings' },
      { label: 'Refund Policy', href: '#content/refund', key: 'refund' }
    ]
  }
];

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, key) => {
    e.preventDefault();
    if (onNavigate) return onNavigate('content', { slug: key });
    window.location.hash = `#content/${key}`;
  };

  return (
    <footer className="site-footer premium-footer">
      <div className="footer-solid">
        <div className="footer-grid-columns">
          <div className="footer-brand-column">
            <span className="eyebrow">AI Recommend</span>
            <h3>AI Recommend helps users discover smarter products using AI-powered recommendations, machine learning insights, and trusted social review analysis.</h3>
            <div className="footer-actions">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {columns.map(column => (
            <div key={column.title} className="footer-link-column">
              <h4>{column.title}</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {column.links.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link-item"
                    onClick={(e) => handleLinkClick(e, link.key)}
                    style={{ 
                      color: 'rgba(255,255,255,0.72)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px',
                      width: 'fit-content'
                    }}
                    onMouseEnter={(e) => { 
                      e.target.style.color = '#00ffff'; 
                      e.target.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => { 
                      e.target.style.color = 'rgba(255,255,255,0.72)';
                      e.target.style.textDecoration = 'none';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div 
          className="footer-bottom-links" 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            alignItems: 'center' 
          }}
        >
          {[
            { label: 'Privacy Policy', key: 'privacy', href: '#content/privacy' },
            { label: 'User Agreement', key: 'terms', href: '#content/terms' },
            { label: 'Refund Policy', key: 'refund', href: '#content/refund' },
            { label: 'Your Privacy Choices', key: 'preferences', href: '#content/preferences' },
            { label: 'Sitemap', key: 'sitemap', href: '#content/sitemap' }
          ].map(link => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.key)}
              style={{ 
                color: '#d1d5db', 
                textDecoration: 'none', 
                fontSize: '12px',
                cursor: 'pointer',
                transition: '0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.target.style.color = '#d1d5db'; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
