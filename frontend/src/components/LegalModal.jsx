import React from 'react';

export default function LegalModal({ type, prefs, onPrefsChange, onClose }) {
  if (!type) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-shell legal-shell" onClick={event => event.stopPropagation()}>
        <div className="panel-header">
          <h2>
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms of Service'}
            {type === 'preferences' && 'Manage Privacy Preferences'}
          </h2>
          <button className="button-secondary" onClick={onClose}>Close</button>
        </div>

        {type === 'privacy' && (
          <div className="legal-copy">
            <p>AI Recommend uses account, wishlist, search, and interaction data to power personalized shopping flows.</p>
            <p>Passwords are hashed on the backend, authenticated requests use bearer tokens, and protected views require valid sessions.</p>
            <p>Product review surfaces use APIs or safe demo/mock data only. This experience does not rely on unsafe scraping.</p>
          </div>
        )}

        {type === 'terms' && (
          <div className="legal-copy">
            <p>Use the platform responsibly and do not misuse or attack service endpoints.</p>
            <p>Review-source links redirect to original public platforms where available.</p>
            <p>Demo data, AI summaries, and recommendation signals are provided for shopping assistance and interface evaluation.</p>
          </div>
        )}

        {type === 'preferences' && (
          <div className="legal-copy preference-grid">
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
            <button className="button-primary" onClick={onClose}>Save preferences</button>
          </div>
        )}
      </div>
    </div>
  );
}
