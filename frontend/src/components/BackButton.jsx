import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = 'Back', onClick }) {
  const cleanLabel = typeof label === 'string' ? label.replace(/<|&lt;/, '').trim() : 'Back';
  return (
    <button className="back-button" onClick={onClick}>
      <ArrowLeft size={16} />
      <span>{cleanLabel || 'Back'}</span>
    </button>
  );
}
