'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-gray-200">404</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Página no encontrada
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg">
                  <Home className="w-5 h-5 mr-2" />
                  Ir al Inicio
                </Button>
              </Link>
              
              <Link href="/productos">
                <Button variant="secondary" size="lg">
                  <Search className="w-5 h-5 mr-2" />
                  Ver Productos
                </Button>
              </Link>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                ¿Necesitas ayuda? <Link href="/contacto" className="text-blue-600 hover:underline">Contáctanos</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}