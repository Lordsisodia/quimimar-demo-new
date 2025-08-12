"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { Button } from './Button'
import { useTranslation } from '@/hooks/useTranslation'

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export const QuickViewModal = ({ isOpen, onClose, product }: QuickViewModalProps) => {
  const { t } = useTranslation()
  const [quantity, setQuantity] = React.useState(1)
  const [showVAT, setShowVAT] = React.useState(true)
  const [addedToCart, setAddedToCart] = React.useState(false)

  if (!product) return null

  const handleAddToCart = async () => {
    setAddedToCart(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setAddedToCart(false)
    setTimeout(() => onClose(), 500)
  }

  const price = showVAT ? product.price : product.price / 1.21
  const totalPrice = price * quantity

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-96 md:h-full bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 font-heading">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">
                    {product.description || t('products.descriptionPlaceholder')}
                  </p>
                </div>

                {/* Price Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">{t('products.price')}</span>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">IVA:</label>
                      <button
                        onClick={() => setShowVAT(!showVAT)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          showVAT ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: showVAT ? 24 : 0 }}
                          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    €{totalPrice.toFixed(2)}
                    <span className="text-sm text-gray-500 ml-2">
                      {showVAT ? t('products.vat.included') : t('products.vat.excluded')}
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="text-sm text-gray-600 block mb-2">
                    {t('products.quantity')}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:border-primary flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:border-primary flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      product.inStock ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className={`text-sm ${
                      product.inStock ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {product.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">{t('products.features')}</h3>
                    <ul className="space-y-1">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.4 }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.div>
                          <span>{t('products.addedToCart')}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{t('products.addToCart')}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                  <Button
                    fullWidth
                    variant="secondary"
                    size="lg"
                    onClick={onClose}
                  >
                    {t('products.continueShopping')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}