import React from 'react';
export default function StatsCard({ title, value, note }) {
  return <div className="card stat"><p>{title}</p><h2>{value}</h2><small>{note}</small></div>;
}
