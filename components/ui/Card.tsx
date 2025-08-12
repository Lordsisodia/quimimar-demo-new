"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  hoverable?: boolean
  clickable?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({
  hoverable = false,
  clickable = false,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100',
        hoverable && 'transition-shadow hover:shadow-lg',
        clickable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {children}
    </motion.div>
  )
}