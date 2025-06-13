// src/components/Skeleton.tsx
import React from 'react';
import './Skeleton.css';

export const Skeleton: React.FC = () => {
  return (
    <ul className="skeleton-list">
      {[...Array(3)].map((_, i) => (
        <li key={i} className="skeleton-card">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-body" />
          <div className="skeleton skeleton-author" />
          <div className="skeleton skeleton-button" />
        </li>
      ))}
    </ul>
  );
};
