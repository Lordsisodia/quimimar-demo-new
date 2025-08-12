"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/lib/translations'

type Locale = 'es' | 'en'

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string) => any
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setCurrentLocale] = useState<Locale>('es')

  useEffect(() => {
    // Check browser language on mount
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('en')) {
      setCurrentLocale('en')
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    // Add animation class
    document.body.classList.add('language-changing')
    
    setCurrentLocale(newLocale)
    
    // Remove animation class after transition
    setTimeout(() => {
      document.body.classList.remove('language-changing')
    }, 300)
  }

  const t = (path: string) => {
    const keys = path.split('.')
    let value: any = translations[locale]
    
    for (const key of keys) {
      value = value?.[key]
    }
    
    return value || path
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}