"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Send, Facebook, Instagram, Linkedin, Twitter, CreditCard } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import ScrambleText from '@/components/ui/ScrambleText'

// Payment method icons as SVG components
const PaymentIcons = {
  Visa: () => (
    <svg className="h-8" viewBox="0 0 48 32" fill="currentColor">
      <path d="M44 0H4C1.79 0 0 1.79 0 4v24c0 2.21 1.79 4 4 4h40c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM20.94 22.66h-3.49l2.18-13.48h3.49l-2.18 13.48zm11.36-8.57l-1.39 5.14-.16-.82-.5-2.57s-.06-.76-.7-.76h-4.62l-.06.14s1.41.3 3.08 1.31l2.56 9.86h3.08l4.71-12.3h-3.1l-.9 5zm-13.86-4.91l-3.24 9.22-.35-1.78-1.18-6.06s-.14-1.38-1.64-1.38H6.58l-.05.12s1.66.35 3.61 1.52c1.95 1.18 1.86 1.11 1.86 1.11l3.08 11.88h3.1l5.02-13.48h-3.1l-1.66 4.85z" className="text-blue-600"/>
    </svg>
  ),
  Mastercard: () => (
    <svg className="h-8" viewBox="0 0 48 32" fill="currentColor">
      <rect width="48" height="32" rx="4" className="text-gray-200"/>
      <circle cx="19" cy="16" r="10" className="text-red-500"/>
      <circle cx="29" cy="16" r="10" className="text-yellow-500"/>
    </svg>
  ),
  PayPal: () => (
    <svg className="h-8" viewBox="0 0 48 32" fill="currentColor">
      <rect width="48" height="32" rx="4" className="text-blue-500"/>
      <path d="M20 10h4c2 0 3 1 3 3s-1 3-3 3h-2l-1 6h-3l3-12zm6 0h3c3 0 5 2 5 5s-2 5-5 5h-2l-1 6h-3l3-12z" className="text-white"/>
    </svg>
  ),
  BankTransfer: () => (
    <svg className="h-8" viewBox="0 0 48 32" fill="currentColor">
      <rect width="48" height="32" rx="4" className="text-gray-300"/>
      <path d="M12 10h24v2H12zm0 4h24v2H12zm0 4h16v2H12z" className="text-gray-600"/>
    </svg>
  )
}

export const Footer = () => {
  const { t } = useTranslation()
  const content = t('footer')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEmail('')
    setIsSubscribing(false)
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/quimimar', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/quimimar', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/quimimar', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/quimimar', label: 'Twitter' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-2">
              <ScrambleText
                text={content.newsletter.title}
                trigger="scroll"
                mode="letters"
                className="text-white"
              />
            </h3>
            <p className="mb-6 opacity-90">
              {content.newsletter.subtitle}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={content.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-gray-900"
                required
              />
              <Button 
                type="submit"
                loading={isSubscribing}
                icon={!isSubscribing && <Send className="w-4 h-4" />}
                className="bg-white text-primary hover:bg-gray-100"
                magnetic={true}
                magneticStrength={0.3}
              >
                {content.newsletter.button}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <ScrambleText
                  text="QUIMIMAR"
                  trigger="hover"
                  mode="letters"
                  className="text-white"
                />
              </h3>
              <p className="text-gray-400 mb-4">
                Tu distribuidor de confianza de productos de limpieza profesional en Murcia.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {[
                  { href: '/productos', label: 'Productos' },
                  { href: '/empresas', label: 'Empresas' },
                  { href: '/nosotros', label: 'Sobre Nosotros' },
                  { href: '/contacto', label: 'Contacto' }
                ].map((link) => (
                  <motion.li key={link.href} whileHover={{ x: 5 }}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2">
                {[
                  { href: '/productos/hosteleria', label: 'Hostelería' },
                  { href: '/productos/automocion', label: 'Automoción' },
                  { href: '/productos/industria-alimentaria', label: 'Industria Alimentaria' },
                  { href: '/productos/eco-friendly', label: 'Línea Ecológica' }
                ].map((link) => (
                  <motion.li key={link.href} whileHover={{ x: 5 }}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Legal & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2">
                {[
                  { href: '/aviso-legal', label: 'Aviso Legal' },
                  { href: '/privacidad', label: 'Política de Privacidad' },
                  { href: '/cookies', label: 'Política de Cookies' },
                  { href: '/terminos', label: 'Términos y Condiciones' }
                ].map((link) => (
                  <motion.li key={link.href} whileHover={{ x: 5 }}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">
                  <strong>Teléfono:</strong> 968 88 22 04<br />
                  <strong>Email:</strong> info@quimimar.es
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {content.copyright}
            </p>
            <div className="flex items-center gap-6">
              {/* Payment Methods */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Métodos de pago:</span>
                <div className="flex gap-2 items-center">
                  <PaymentIcons.Visa />
                  <PaymentIcons.Mastercard />
                  <PaymentIcons.PayPal />
                  <PaymentIcons.BankTransfer />
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-green-500">🔒</span> Pago 100% Seguro
              </span>
              <span className="flex items-center gap-1">
                <span className="text-blue-500">🚚</span> Envío 24-48h
              </span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span> +1000 Clientes Satisfechos
              </span>
              <span className="flex items-center gap-1">
                <span className="text-purple-500">🏆</span> Distribuidor Oficial Quimxel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}