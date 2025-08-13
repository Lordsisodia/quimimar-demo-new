"use client"

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import ScrambleText from '@/components/ui/ScrambleText'

// Category images mapping
const categoryImages = {
  hospitality: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  automotive: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop',
  'food-industry': 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop',
  healthcare: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
  'eco-friendly': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
}

export const CategoryGrid = () => {
  const { t, locale } = useTranslation()
  const content = t('categories')
  
  return (
    <section id="categorías" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            <ScrambleText
              text={content.sectionTitle}
              trigger="scroll"
              mode="letters"
              className="text-gray-900"
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.sectionSubtitle}
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.categories.map((category: any, index: number) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard3D 
                {...category} 
                image={categoryImages[category.id as keyof typeof categoryImages]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CategoryCard3D = ({ 
  icon, 
  name, 
  description, 
  productCount,
  image,
  id
}: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D rotation values
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.set((x - width / 2) / width)
    mouseY.set((y - height / 2) / height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="h-full"
    >
      <Card 
        hoverable={false}
        clickable
        className="h-full group relative overflow-hidden"
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          {/* Icon with rotation */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl mb-4"
            style={{ transform: 'translateZ(20px)' }}
          >
            {icon}
          </motion.div>
          
          {/* Text content */}
          <div style={{ transform: 'translateZ(10px)' }}>
            <h3 className="text-xl font-semibold mb-2 font-heading">
              <ScrambleText
                text={name}
                trigger="hover"
                mode="letters"
                className="text-white"
              />
            </h3>
            <p className="text-white/80 mb-4 line-clamp-2">
              {description}
            </p>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">{productCount}</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                className="text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <motion.div
          className="absolute inset-0 bg-primary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transform: 'translateZ(5px)' }}
        />
      </Card>
    </motion.div>
  )
}