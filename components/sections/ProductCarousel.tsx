"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingCart, Eye, Star } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { QuickViewModal } from '@/components/ui/QuickViewModal'
import { Carousel } from '@/components/ui/Carousel'
import { sampleProducts } from '@/lib/sampleData'
import ScrambleText from '@/components/ui/ScrambleText'

export const ProductCarousel = () => {
  const { t } = useTranslation()
  const content = t('products')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  return (
    <section id="productos" className="py-16 md:py-20">
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
        
        {/* Products Carousel */}
        <Carousel
          itemsPerView={4}
          gap={24}
          autoPlay={true}
          autoPlayInterval={4000}
          showControls={true}
          showIndicators={true}
          className="px-12"
        >
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard 
                product={product} 
                content={content}
                isHovered={hoveredProduct === product.id}
                onHover={() => setHoveredProduct(product.id)}
                onLeave={() => setHoveredProduct(null)}
                onQuickView={() => {
                  setSelectedProduct(product)
                  setIsQuickViewOpen(true)
                }}
              />
            </motion.div>
          ))}
        </Carousel>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct}
      />
    </section>
  )
}

const ProductCard = ({ 
  product, 
  content,
  isHovered,
  onHover,
  onLeave,
  onQuickView
}: any) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsAddingToCart(false)
  }

  return (
    <Card 
      hoverable 
      className="h-full flex flex-col group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        
        {/* Quick Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onQuickView}
                className="p-2 bg-white rounded-full text-gray-700 hover:text-primary"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Name */}
        <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <ScrambleText
            text={product.name}
            trigger="hover"
            mode="letters"
            className="text-gray-900 group-hover:text-primary"
          />
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        {/* Price and Action */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-primary">
                €{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {content.vat.included}
              </span>
            </div>
          </div>
          
          <Button
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            loading={isAddingToCart}
            icon={!isAddingToCart && <ShoppingCart className="w-4 h-4" />}
            magnetic={true}
            magneticStrength={0.2}
          >
            {!product.inStock 
              ? content.outOfStock 
              : isAddingToCart 
              ? '' 
              : content.addToCart
            }
          </Button>
        </div>
      </div>
    </Card>
  )
}