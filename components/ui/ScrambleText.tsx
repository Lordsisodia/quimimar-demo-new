"use client"

/**
 * 🎨 Scramble Text Effect
 * Inspired by 21st.dev - Glitch/Matrix-style text animation
 * 
 * Features:
 * ✅ Multiple scramble modes (letters, numbers, symbols)
 * ✅ Customizable animation speed
 * ✅ Hover and click triggers
 * ✅ Gradient text support
 * ✅ Accessibility friendly
 * ✅ TypeWriter mode
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: 'hover' | 'click' | 'auto' | 'scroll';
  speed?: number;
  mode?: 'letters' | 'numbers' | 'symbols' | 'matrix' | 'glitch';
  gradient?: string;
  delay?: number;
  repeat?: boolean;
  typewriter?: boolean;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  trigger = 'hover',
  speed = 30,
  mode = 'letters',
  gradient,
  delay = 0,
  repeat = false,
  typewriter = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasScrambled = useRef(false);

  // Character sets for different modes
  const charSets = {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    matrix: '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ',
    glitch: '█▓▒░▄▀▌│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌'
  };

  const getRandomChar = useCallback(() => {
    const chars = charSets[mode];
    return chars[Math.floor(Math.random() * chars.length)];
  }, [mode]);

  const scrambleText = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const originalText = text;
    const textArray = originalText.split('');

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Typewriter effect
    if (typewriter) {
      let charIndex = 0;
      intervalRef.current = setInterval(() => {
        if (charIndex <= originalText.length) {
          setDisplayText(
            originalText.slice(0, charIndex) +
            originalText.slice(charIndex).split('').map(() => getRandomChar()).join('')
          );
          charIndex++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsScrambling(false);
          hasScrambled.current = true;
        }
      }, speed);
      return;
    }

    // Standard scramble effect
    intervalRef.current = setInterval(() => {
      setDisplayText(
        textArray
          .map((char, index) => {
            // Keep spaces and punctuation
            if (char === ' ' || /[.,!?]/.test(char)) return char;
            
            // Reveal characters progressively
            if (index < iteration) {
              return originalText[index];
            }
            
            // Scramble remaining characters
            return getRandomChar();
          })
          .join('')
      );

      if (iteration >= textArray.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        hasScrambled.current = true;
        
        // Repeat if enabled
        if (repeat && trigger === 'auto') {
          setTimeout(() => {
            hasScrambled.current = false;
            scrambleText();
          }, 2000);
        }
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed, mode, getRandomChar, isScrambling, typewriter, repeat, trigger]);

  // Auto trigger
  useEffect(() => {
    if (trigger === 'auto' && !hasScrambled.current) {
      const timer = setTimeout(() => {
        scrambleText();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, scrambleText]);

  // Scroll trigger
  useEffect(() => {
    if (trigger === 'scroll' && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasScrambled.current) {
              scrambleText();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(elementRef.current);

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  }, [trigger, scrambleText]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      hasScrambled.current = false;
      scrambleText();
    }
  };

  const textStyle = gradient
    ? {
        background: `linear-gradient(to right, ${gradient})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }
    : {};

  return (
    <span
      ref={elementRef}
      className={`
        inline-block font-mono tracking-wider cursor-default select-none
        transition-all duration-300
        ${isScrambling ? 'scale-105' : ''}
        ${className}
      `}
      style={textStyle}
      onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
      onClick={trigger === 'click' ? handleInteraction : undefined}
      role={trigger === 'click' ? 'button' : undefined}
      tabIndex={trigger === 'click' ? 0 : undefined}
      onKeyDown={
        trigger === 'click'
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleInteraction();
              }
            }
          : undefined
      }
    >
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={`
            inline-block transition-all duration-200
            ${isScrambling && char !== ' ' ? 'animate-glitch' : ''}
          `}
          style={{
            animationDelay: `${index * 20}ms`
          }}
        >
          {char}
        </span>
      ))}

      {/* Glitch effect overlay */}
      {mode === 'glitch' && isScrambling && (
        <span className="absolute inset-0 opacity-50 mix-blend-screen">
          <span className="text-red-500 animate-glitch-1">{displayText}</span>
          <span className="text-blue-500 animate-glitch-2">{displayText}</span>
        </span>
      )}

      <style jsx>{`
        @keyframes glitch {
          0%, 100% { 
            transform: translateY(0);
            opacity: 1;
          }
          20% { 
            transform: translateY(-2px);
            opacity: 0.8;
          }
          40% { 
            transform: translateY(2px);
            opacity: 0.8;
          }
          60% { 
            transform: translateY(-1px);
            opacity: 0.9;
          }
          80% { 
            transform: translateY(1px);
            opacity: 0.9;
          }
        }

        @keyframes glitch-1 {
          0%, 100% { 
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
          }
          20% { 
            clip-path: inset(0 100% 0 0);
            transform: translateX(-2px);
          }
          40% { 
            clip-path: inset(0 0 100% 0);
            transform: translateX(2px);
          }
          60% { 
            clip-path: inset(100% 0 0 0);
            transform: translateX(-1px);
          }
          80% { 
            clip-path: inset(0 0 0 100%);
            transform: translateX(1px);
          }
        }

        @keyframes glitch-2 {
          0%, 100% { 
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
          }
          20% { 
            clip-path: inset(0 0 100% 0);
            transform: translateX(2px);
          }
          40% { 
            clip-path: inset(100% 0 0 0);
            transform: translateX(-2px);
          }
          60% { 
            clip-path: inset(0 0 0 100%);
            transform: translateX(1px);
          }
          80% { 
            clip-path: inset(0 100% 0 0);
            transform: translateX(-1px);
          }
        }

        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.5s ease-in-out infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.7s ease-in-out infinite reverse;
        }
      `}</style>
    </span>
  );
};

// Preset configurations for common use cases
export const ScrambleHeading: React.FC<{ children: string; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <ScrambleText
    text={children}
    className={`text-4xl md:text-6xl font-bold ${className}`}
    trigger="scroll"
    mode="glitch"
    gradient="#3B82F6, #8B5CF6, #EC4899"
  />
);

export const ScrambleLink: React.FC<{ children: string; href: string; className?: string }> = ({ 
  children, 
  href,
  className = '' 
}) => (
  <a href={href} className={`inline-block ${className}`}>
    <ScrambleText
      text={children}
      trigger="hover"
      mode="matrix"
      speed={20}
    />
  </a>
);

export default ScrambleText;