/**
 * 🎨 Magnetic Button Component
 * Inspired by 21st.dev - Advanced cursor interactions
 * 
 * Features:
 * ✅ Magnetic cursor attraction
 * ✅ Smooth elastic animations
 * ✅ Ripple effect on click
 * ✅ Customizable strength
 * ✅ Sound feedback ready
 * ✅ Haptic feedback simulation
 */

import React, { useRef, useEffect, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  rippleColor?: string;
  soundEnabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.25,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  rippleColor = 'rgba(255, 255, 255, 0.5)',
  soundEnabled = true
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<number>();
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Animation state
  const currentPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      if (!buttonRef.current) return;

      // Lerp for smooth animation
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.1;
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.1;

      buttonRef.current.style.transform = `
        translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)
        scale(${isPressed ? 0.95 : isHovered ? 1.05 : 1})
      `;

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, isPressed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic effect
    targetPosition.current = {
      x: distanceX * strength,
      y: distanceY * strength
    };
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    playSound('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetPosition.current = { x: 0, y: 0 };
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple effect
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples(prev => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 1000);
    }

    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    playSound('click');
    onClick?.();
  };

  const playSound = (type: 'hover' | 'click') => {
    if (!soundEnabled) return;
    
    // Sound implementation would go here
    // For now, we'll use console.log as placeholder
    console.log(`Play ${type} sound`);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl',
    secondary: 'bg-gray-800 text-white border border-gray-700 hover:border-gray-600',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-xl font-medium
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Hover glow effect */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 opacity-0 animate-glow">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl" />
        </div>
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor
          }}
        />
      ))}

      {/* Magnetic field indicator (debug mode) */}
      {process.env.NODE_ENV === 'development' && false && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-xl pointer-events-none" />
      )}

      <style jsx>{`
        @keyframes glow {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); }
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
      `}</style>
    </button>
  );
};

// Export variants for easy use
export const MagneticButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default MagneticButton;