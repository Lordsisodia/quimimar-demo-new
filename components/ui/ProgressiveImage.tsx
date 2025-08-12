"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export const ProgressiveImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  objectFit = 'cover'
}: ProgressiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)
  const [blurDataUrl, setBlurDataUrl] = useState<string>('')

  // Generate a blur placeholder
  useEffect(() => {
    // Create a tiny placeholder (10x10 pixels)
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Create a gradient that matches the general color theme
      const gradient = ctx.createLinearGradient(0, 0, 10, 10)
      gradient.addColorStop(0, '#e5e7eb')
      gradient.addColorStop(1, '#f3f4f6')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 10, 10)
      
      setBlurDataUrl(canvas.toDataURL())
    }
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    // Fallback to a placeholder image
    setImgSrc('/placeholder-product.jpg')
    setIsLoading(false)
  }

  const imageProps = fill 
    ? { fill: true, sizes: sizes || '100vw' }
    : { width: width || 400, height: height || 400 }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-100, 100],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              }}
              style={{ width: '100%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.1 : 1
        }}
        transition={{ duration: 0.4 }}
        className="relative w-full h-full"
      >
        <Image
          {...imageProps}
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          placeholder={blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={blurDataUrl}
          style={{ objectFit }}
          className={`${fill ? 'object-cover' : ''}`}
        />
      </motion.div>
    </div>
  )
}

// Lazy loading wrapper with Intersection Observer
export const LazyImage = ({ 
  threshold = 0.1, 
  rootMargin = '50px',
  ...imageProps 
}: ProgressiveImageProps & { 
  threshold?: number
  rootMargin?: string 
}) => {
  const [isInView, setIsInView] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={imageProps.className}>
      {isInView ? (
        <ProgressiveImage {...imageProps} />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}