"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonCardProps {
  type?: 'product' | 'category' | 'default'
  className?: string
}

export const SkeletonCard = ({ type = 'default', className = '' }: SkeletonCardProps) => {
  const shimmer = {
    initial: { x: -100 },
    animate: { 
      x: 100,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }
    }
  }

  if (type === 'product') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
        {/* Image skeleton */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: '100%' }}
          />
        </div>
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div className="relative h-5 bg-gray-200 rounded overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Rating */}
          <div className="relative h-4 bg-gray-200 rounded w-24 overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Price */}
          <div className="relative h-8 bg-gray-200 rounded w-32 overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Button */}
          <div className="relative h-10 bg-gray-200 rounded-lg overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'category') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-64 relative ${className}`}>
        <div className="absolute inset-0 bg-gray-200">
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: '100%' }}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          {/* Icon */}
          <div className="relative w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Title */}
          <div className="relative h-6 bg-gray-300 rounded w-32 overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Description */}
          <div className="relative h-4 bg-gray-300 rounded w-48 overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Default skeleton
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 space-y-4 ${className}`}>
      <div className="relative h-4 bg-gray-200 rounded w-3/4 overflow-hidden">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: '100%' }}
        />
      </div>
      <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: '100%' }}
        />
      </div>
      <div className="relative h-4 bg-gray-200 rounded w-5/6 overflow-hidden">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

// Skeleton Loading Container
export const SkeletonGrid = ({ 
  count = 4, 
  type = 'default',
  className = ''
}: {
  count?: number
  type?: 'product' | 'category' | 'default'
  className?: string
}) => {
  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonCard type={type} />
        </motion.div>
      ))}
    </div>
  )
}