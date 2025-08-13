"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  magnetic?: boolean
  magneticStrength?: number
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  children,
  className,
  disabled,
  type = 'button',
  onClick,
  magnetic = false,
  magneticStrength = 0.25
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white hover:bg-gray-50 text-primary border-2 border-primary',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !magnetic || !buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    setMousePosition({
      x: distanceX * magneticStrength,
      y: distanceY * magneticStrength
    })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Create ripple effect
    const button = buttonRef.current
    if (button) {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples(prev => [...prev, { x, y, id }])

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id))
      }, 1000)
    }

    onClick?.()
  }

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        x: magnetic ? mousePosition.x : 0,
        y: magnetic ? mousePosition.y : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium rounded-lg transition-colors overflow-hidden',
        variantStyles[variant],
        sizeStyles[size],
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || loading}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: 'ripple 1s ease-out forwards'
          }}
        />
      ))}
      
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </motion.button>
  )
}