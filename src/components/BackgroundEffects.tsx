
import React from 'react';

interface BackgroundEffectsProps {
  mousePosition: { x: number; y: number };
}

const BackgroundEffects = ({ mousePosition }: BackgroundEffectsProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 3}s`,
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      ))}
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-slower"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
    </div>
  );
};

export default BackgroundEffects;
