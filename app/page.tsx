"use client"

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoryGrid } from '@/components/sections/CategoryGrid'
import { ProductCarousel } from '@/components/sections/ProductCarousel'
import { ValueProps } from '@/components/sections/ValueProps'
import { BusinessCTA } from '@/components/sections/BusinessCTA'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <ProductCarousel />
      <ValueProps />
      <BusinessCTA />
      <ContactSection />
      <Footer />
    </main>
  )
}