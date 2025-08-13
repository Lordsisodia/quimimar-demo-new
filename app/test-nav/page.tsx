'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export default function TestNavPage() {
  const navigationLinks = [
    { href: '/', label: '🏠 Inicio', description: 'Página principal' },
    { href: '/productos', label: '📦 Productos', description: 'Catálogo de productos' },
    { href: '/productos/1', label: '🧪 Producto 1', description: 'Detalle de CLORSAN' },
    { href: '/productos/2', label: '🧪 Producto 2', description: 'Detalle de AMBIXEL' },
    { href: '/empresas', label: '🏢 Empresas', description: 'Soluciones empresariales' },
    { href: '/nosotros', label: 'ℹ️ Nosotros', description: 'Acerca de Quimimar' },
    { href: '/contacto', label: '📧 Contacto', description: 'Formulario de contacto' },
    { href: '/carrito', label: '🛒 Carrito', description: 'Carrito de compras' },
    { href: '/checkout', label: '💳 Checkout', description: 'Proceso de pago' },
    { href: '/account', label: '👤 Mi Cuenta', description: 'Login/Registro' },
    { href: '/admin', label: '⚙️ Admin', description: 'Panel de administración' },
  ]

  const deletedPages = [
    { href: '/products', label: '❌ /products', description: 'Versión en inglés (eliminada)' },
    { href: '/business', label: '❌ /business', description: 'Versión en inglés (eliminada)' },
    { href: '/about', label: '❌ /about', description: 'Versión en inglés (eliminada)' },
    { href: '/contact', label: '❌ /contact', description: 'Versión en inglés (eliminada)' },
    { href: '/demo', label: '❌ /demo', description: 'Página demo (eliminada)' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test de Navegación
          </h1>
          <p className="text-lg text-gray-600">
            Verifica que todos los enlaces funcionan correctamente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Working Pages */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              Páginas Activas
            </h2>
            
            <div className="space-y-4">
              {navigationLinks.map((link) => (
                <Card key={link.href} className="p-4 hover:shadow-lg transition-shadow">
                  <Link href={link.href} className="block">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {link.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {link.description}
                        </p>
                        <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {link.href}
                        </code>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Deleted Pages */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              Páginas Eliminadas
            </h2>
            
            <div className="space-y-4">
              {deletedPages.map((link) => (
                <Card key={link.href} className="p-4 bg-red-50 border-red-200">
                  <div className="opacity-60">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                    <code className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                      {link.href}
                    </code>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Si alguien intenta acceder a estas páginas eliminadas, 
                verán la página 404 personalizada.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}