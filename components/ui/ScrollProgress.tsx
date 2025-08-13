/**
 * 🎨 Scroll Progress Indicator
 * Inspired by 21st.dev - Shows reading/scroll progress
 * 
 * Features:
 * ✅ Smooth gradient progress bar
 * ✅ Percentage display on hover
 * ✅ Milestone markers
 * ✅ Smooth transitions
 * ✅ Customizable colors
 */

import React, { useState, useEffect } from 'react';

interface ScrollProgressProps {
  showPercentage?: boolean;
  height?: number;
  gradient?: string;
  milestones?: number[];
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  showPercentage = true,
  height = 4,
  gradient = 'from-blue-500 via-purple-500 to-pink-500',
  milestones = [25, 50, 75]
}) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrolled / (docHeight - winHeight);
      const progress = Math.min(scrollPercent * 100, 100);
      
      setProgress(progress);
      setIsVisible(scrolled > 100); // Show after scrolling 100px
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  return (
    <>
      {/* Main Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ height: `${height}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm" />
        
        {/* Progress Fill */}
        <div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${gradient} transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          
          {/* Leading Edge Glow */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent blur-sm" />
        </div>

        {/* Milestone Markers */}
        {milestones.map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-0 bottom-0 w-px transition-opacity duration-300 ${
              progress >= milestone ? 'bg-white/50' : 'bg-gray-400/30'
            }`}
            style={{ left: `${milestone}%` }}
          >
            {/* Milestone Dot */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                progress >= milestone
                  ? 'bg-white scale-100'
                  : 'bg-gray-400/50 scale-75'
              }`}
            />
          </div>
        ))}

        {/* Percentage Display */}
        {showPercentage && isHovered && (
          <div
            className="absolute top-full mt-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full 
                     shadow-xl transition-all duration-300 pointer-events-none"
            style={{ 
              left: `${Math.min(Math.max(progress, 5), 95)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {Math.round(progress)}%
            {/* Arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        )}
      </div>

      {/* Scroll Hint (appears at top) */}
      {progress === 0 && isVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gray-900/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full 
                        flex items-center gap-2 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Scroll to explore
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollProgress;