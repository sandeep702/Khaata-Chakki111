
import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
          </div>
        ))}
      </div>
      
      <div className="text-center relative z-10">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-8 border-purple-300 border-t-white mx-auto shadow-2xl"></div>
          <div className="absolute inset-0 rounded-full h-32 w-32 border-8 border-pink-300 border-r-white animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-2 rounded-full h-28 w-28 border-4 border-blue-300 border-b-white animate-spin mx-auto" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse flex items-center justify-center">
            <Sparkles className="text-white animate-pulse" size={24} />
          </div>
        </div>
        <h2 className="text-5xl font-black text-white mb-4 animate-pulse bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Loading Khaata Chakki
        </h2>
        <p className="text-purple-200 text-xl animate-bounce">Preparing your magical workspace...</p>
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 150, 300].map((delay, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gradient-to-r from-white to-purple-200 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
