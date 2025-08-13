"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Globe, Command } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export const Header = () => {
  const { locale, setLocale, t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/productos', label: t('nav.products') },
    { href: '/empresas', label: t('nav.business') },
    { href: '/nosotros', label: t('nav.about') },
    { href: '/contacto', label: t('nav.contact') },
  ]

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md" 
          : "bg-white shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Quimimar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  ctrlKey: true
                })
                window.dispatchEvent(event)
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Buscar</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">
                ⌘K
              </kbd>
            </button>

            {/* Search */}
            <div className="hidden md:hidden relative">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                {locale.toUpperCase()}
              </span>
            </button>

            {/* Cart */}
            <Link href="/carrito" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}