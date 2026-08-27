import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size] || 'w-10 h-10';

  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 ${dimensions} ${className}`}>
      <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden relative">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="vibeLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="vibePulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Vibe signal wave background */}
          <path
            d="M 10 50 Q 25 30 40 60 T 70 40 T 90 45"
            stroke="url(#vibePulseGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Primary Trend & Vibe Pulse Arrow */}
          <path
            d="M 20 65 L 40 35 L 58 52 L 80 22"
            stroke="url(#vibeLogoGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Arrow Tip */}
          <path
            d="M 64 22 L 80 22 L 80 38"
            stroke="url(#vibeLogoGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing pulse dots */}
          <circle cx="40" cy="35" r="3.5" fill="#818CF8" />
          <circle cx="58" cy="52" r="3.5" fill="#C084FC" />
          <circle cx="80" cy="22" r="4.5" fill="#38BDF8" />
        </svg>
      </div>
    </div>
  );
}
