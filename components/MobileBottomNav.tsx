"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, ShoppingBag, User, Menu } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export const MobileBottomNav = () => {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { 
      icon: Home, 
      label: t('nav.home'), 
      href: '/',
      color: 'text-blue-500'
    },
    { 
      icon: Search, 
      label: t('search.button'), 
      href: '/buscar',
      color: 'text-green-500'
    },
    { 
      icon: ShoppingBag, 
      label: 'Carrito', 
      href: '/carrito',
      color: 'text-purple-500',
      badge: 2
    },
    { 
      icon: User, 
      label: 'Cuenta', 
      href: '/cuenta',
      color: 'text-orange-500'
    },
    { 
      icon: Menu, 
      label: 'Menú', 
      action: () => setIsMenuOpen(!isMenuOpen),
      color: 'text-gray-500'
    }
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden"
      >
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            
            if (item.action) {
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="relative flex flex-col items-center justify-center py-2"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    <item.icon 
                      className={`w-5 h-5 ${isMenuOpen ? item.color : 'text-gray-400'}`} 
                    />
                  </motion.div>
                  <span className={`text-xs mt-1 ${isMenuOpen ? item.color : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-2"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <item.icon 
                    className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400'}`} 
                  />
                  
                  {/* Badge */}
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {item.badge}
                    </motion.span>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
                <span className={`text-xs mt-1 ${isActive ? item.color : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </motion.nav>

      {/* Slide-up Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-40 lg:hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                
                <h3 className="font-semibold text-lg mb-4">Menú Principal</h3>
                
                <nav className="space-y-2">
                  {[
                    { href: '/productos', label: t('nav.products'), icon: '🛍️' },
                    { href: '/empresas', label: t('nav.business'), icon: '🏢' },
                    { href: '/nosotros', label: t('nav.about'), icon: '📖' },
                    { href: '/contacto', label: t('nav.contact'), icon: '📞' },
                  ].map((link) => (
                    <motion.div key={link.href} whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Categorías Populares</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Hostelería', emoji: '🍽️' },
                      { label: 'Automoción', emoji: '🚗' },
                      { label: 'Sanitario', emoji: '🏥' },
                      { label: 'Ecológico', emoji: '🌱' }
                    ].map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <button className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary/90 transition-colors">
                    Solicitar Cuenta Empresa
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for bottom navigation */}
      <div className="h-16 lg:hidden" />
    </>
  )
}