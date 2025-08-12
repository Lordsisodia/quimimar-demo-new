"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X, Globe, Trash2 } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { sampleProducts } from '@/lib/sampleData'

export const Header = () => {
  const { locale, setLocale, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCartPreview, setShowCartPreview] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems] = useState([
    { id: 1, name: 'Ambixel You 5L', price: 12.50, quantity: 2 },
    { id: 2, name: 'Clorsan 5L', price: 8.75, quantity: 1 },
  ])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Search suggestions
  const searchSuggestions = searchQuery.length > 0 
    ? sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/productos', label: t('nav.products') },
    { href: '/empresas', label: t('nav.business') },
    { href: '/nosotros', label: t('nav.about') },
    { href: '/contacto', label: t('nav.contact') },
  ]

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md" 
          : "bg-white shadow-sm"
      )}
      animate={{
        padding: isScrolled ? "0.5rem 0" : "1rem 0"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/logo-quimimar.svg"
                alt="Quimimar - Productos de Limpieza Profesional"
                width={isScrolled ? 150 : 180}
                height={isScrolled ? 45 : 54}
                priority
                className="transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar with Suggestions */}
          <div className="hidden md:block relative">
            <motion.div
              animate={{ width: searchFocused ? 400 : 300 }}
              className="relative"
            >
              <Input
                type="search"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                icon={<Search className="w-5 h-5 text-gray-400" />}
                className="pr-10"
              />
              
              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {searchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="text-xs text-gray-500 px-3 py-1">{t('search.suggestions')}</p>
                      {searchSuggestions.map((product) => (
                        <motion.a
                          key={product.id}
                          href="#"
                          whileHover={{ backgroundColor: '#f3f4f6' }}
                          className="flex items-center gap-3 p-3 rounded-md cursor-pointer"
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">€{product.price.toFixed(2)}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <motion.div
                animate={{ rotateY: locale === 'es' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Globe className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">{locale.toUpperCase()}</span>
            </motion.button>

            {/* User Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* Cart Icon with Preview */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItems.length}
                </motion.span>
              </button>

              {/* Cart Preview Dropdown */}
              <AnimatePresence>
                {showCartPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">Tu Carrito</h3>
                      <div className="space-y-3 mb-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} x €{item.price.toFixed(2)}
                              </p>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 mb-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>€{cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
                      </div>
                      <div className="space-y-2">
                        <Button fullWidth size="sm">
                          Ver Carrito
                        </Button>
                        <Button fullWidth size="sm" variant="secondary">
                          Finalizar Compra
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder={t('search.placeholder')}
                  icon={<Search className="w-5 h-5 text-gray-400" />}
                />
              </div>

              {/* Mobile Nav */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Language Toggle */}
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    setLocale(locale === 'es' ? 'en' : 'es')
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Globe className="w-4 h-4" />
                  <span>{locale === 'es' ? 'English' : 'Español'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}