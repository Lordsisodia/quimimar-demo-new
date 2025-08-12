"use client"

import React from 'react'
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
  onClick
}) => {
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

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
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
      onClick={onClick}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </motion.button>
  )
}