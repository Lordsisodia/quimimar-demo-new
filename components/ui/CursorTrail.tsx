"use client"

/**
 * 🎨 Cursor Trail Effect
 * Inspired by 21st.dev - Interactive cursor animations
 * 
 * Features:
 * ✅ Multiple trail types (dots, stars, gradient, text)
 * ✅ Customizable colors and physics
 * ✅ Performance optimized with RAF
 * ✅ Mobile touch support
 * ✅ Emoji and custom shapes
 * ✅ Interactive element detection
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  id: number;
  vx?: number;
  vy?: number;
  scale?: number;
  rotation?: number;
  emoji?: string;
}

interface CursorTrailProps {
  type?: 'dots' | 'stars' | 'gradient' | 'emoji' | 'text' | 'sparkle';
  color?: string;
  size?: number;
  length?: number;
  emoji?: string;
  text?: string;
  fadeSpeed?: number;
  physics?: boolean;
  interactive?: boolean;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
  type = 'dots',
  color = '#3B82F6',
  size = 20,
  length = 20,
  emoji = '✨',
  text = 'CLEAN',
  fadeSpeed = 0.95,
  physics = false,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animationRef = useRef<number>();
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const idCounter = useRef(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    contextRef.current = canvas.getContext('2d');

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Mouse/Touch tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Check if over interactive element
      if (interactive) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const isInteractive = element?.matches('button, a, input, [role="button"]');
        setIsOverInteractive(!!isInteractive);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  // Draw functions for different trail types
  const drawDot = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint) => {
    const opacity = 1 - point.age;
    const currentSize = size * (1 - point.age * 0.5) * (point.scale || 1);
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, currentSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
  }, [color, size]);

  const drawStar = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint) => {
    const opacity = 1 - point.age;
    const currentSize = size * (1 - point.age * 0.5) * (point.scale || 1);
    const rotation = point.rotation || 0;
    
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(rotation);
    ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
    
    // Draw star
    const spikes = 5;
    const outerRadius = currentSize / 2;
    const innerRadius = outerRadius / 2;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [color, size]);

  const drawGradient = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint, index: number) => {
    if (index === 0 || !trailRef.current[index - 1]) return;
    
    const prevPoint = trailRef.current[index - 1];
    const opacity = 1 - point.age;
    
    const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y);
    gradient.addColorStop(0, `${color}00`);
    gradient.addColorStop(0.5, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${color}00`);
    
    ctx.beginPath();
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = size * (1 - point.age * 0.5);
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [color, size]);

  const drawEmoji = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint) => {
    const opacity = 1 - point.age;
    const currentSize = size * (1 - point.age * 0.5) * (point.scale || 1);
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.font = `${currentSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(point.emoji || emoji, point.x, point.y);
    ctx.restore();
  }, [emoji, size]);

  const drawText = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint) => {
    const opacity = 1 - point.age;
    const currentSize = (size / 2) * (1 - point.age * 0.5);
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.font = `bold ${currentSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(text[Math.floor(point.age * text.length)], point.x, point.y);
    ctx.restore();
  }, [color, size, text]);

  const drawSparkle = useCallback((ctx: CanvasRenderingContext2D, point: TrailPoint) => {
    const opacity = 1 - point.age;
    const currentSize = size * (1 - point.age * 0.5) * (point.scale || 1);
    
    // Draw sparkle cross
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(point.rotation || 0);
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 2;
    
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, -currentSize / 2);
    ctx.lineTo(0, currentSize / 2);
    ctx.stroke();
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(-currentSize / 2, 0);
    ctx.lineTo(currentSize / 2, 0);
    ctx.stroke();
    
    // Diagonal lines
    const diagonalSize = currentSize / 3;
    ctx.beginPath();
    ctx.moveTo(-diagonalSize, -diagonalSize);
    ctx.lineTo(diagonalSize, diagonalSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-diagonalSize, diagonalSize);
    ctx.lineTo(diagonalSize, -diagonalSize);
    ctx.stroke();
    
    ctx.restore();
  }, [color, size]);

  // Animation loop
  const animate = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add new trail point
    if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
      const newPoint: TrailPoint = {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        age: 0,
        id: idCounter.current++,
        scale: isOverInteractive ? 1.5 : 1,
        rotation: Math.random() * Math.PI * 2
      };

      // Add physics
      if (physics && trailRef.current.length > 0) {
        const lastPoint = trailRef.current[trailRef.current.length - 1];
        newPoint.vx = (newPoint.x - lastPoint.x) * 0.5;
        newPoint.vy = (newPoint.y - lastPoint.y) * 0.5;
      }

      // Random emoji for emoji mode
      if (type === 'emoji') {
        const emojis = ['✨', '⭐', '🌟', '💫', '🌙', '☄️'];
        newPoint.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      }

      trailRef.current.push(newPoint);
    }

    // Update and draw trail
    trailRef.current = trailRef.current.filter((point, index) => {
      // Update age
      point.age += 1 / length;

      // Apply physics
      if (physics && point.vx !== undefined && point.vy !== undefined) {
        point.x += point.vx;
        point.y += point.vy;
        point.vx *= 0.98;
        point.vy *= 0.98;
        point.vy += 0.2; // Gravity
      }

      // Update rotation
      if (point.rotation !== undefined) {
        point.rotation += 0.1;
      }

      // Remove old points
      if (point.age >= 1) return false;

      // Draw based on type
      switch (type) {
        case 'dots':
          drawDot(ctx, point);
          break;
        case 'stars':
          drawStar(ctx, point);
          break;
        case 'gradient':
          drawGradient(ctx, point, index);
          break;
        case 'emoji':
          drawEmoji(ctx, point);
          break;
        case 'text':
          drawText(ctx, point);
          break;
        case 'sparkle':
          drawSparkle(ctx, point);
          break;
      }

      return true;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [type, length, physics, isOverInteractive, drawDot, drawStar, drawGradient, drawEmoji, drawText, drawSparkle]);

  // Start animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// Preset configurations
export const CleaningBubbles: React.FC = () => (
  <CursorTrail
    type="dots"
    color="#60A5FA"
    size={30}
    length={15}
    physics={true}
  />
);

export const SparkleTrail: React.FC = () => (
  <CursorTrail
    type="sparkle"
    color="#F59E0B"
    size={25}
    length={10}
  />
);

export const TextTrail: React.FC<{ text?: string }> = ({ text = "CLEAN" }) => (
  <CursorTrail
    type="text"
    text={text}
    color="#10B981"
    size={40}
    length={text.length * 2}
  />
);

export default CursorTrail;