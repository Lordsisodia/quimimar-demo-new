"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: React.ReactNode[]
  itemsPerView?: number
  gap?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
}

export const Carousel = ({
  children,
  itemsPerView = 4,
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className = ''
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const dragX = useMotionValue(0)

  const totalItems = children.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalItems > itemsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, autoPlayInterval)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, maxIndex, totalItems, itemsPerView])

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      handlePrevious()
    } else if (info.offset.x < -threshold) {
      handleNext()
    }
  }

  // Responsive items per view
  const getResponsiveItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView
    
    const width = window.innerWidth
    if (width < 640) return 1
    if (width < 768) return Math.min(2, itemsPerView)
    if (width < 1024) return Math.min(3, itemsPerView)
    return itemsPerView
  }

  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView)

  useEffect(() => {
    const updateItemsPerView = () => {
      setResponsiveItemsPerView(getResponsiveItemsPerView())
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [itemsPerView])

  const slideWidth = 100 / responsiveItemsPerView
  const translateX = -(currentIndex * slideWidth)

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `${translateX}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ gap: `${gap}px`, x: dragX }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(${slideWidth}% - ${gap * (responsiveItemsPerView - 1) / responsiveItemsPerView}px)` }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      {showControls && totalItems > responsiveItemsPerView && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </motion.button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalItems > responsiveItemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}