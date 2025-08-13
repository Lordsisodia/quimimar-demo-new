'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { sampleProducts } from '@/lib/sampleData'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ShoppingCart, 
  Download, 
  Star, 
  Check, 
  ArrowLeft,
  Plus,
  Minus,
  Share2
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const product = sampleProducts.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    notFound()
  }

  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-blue-600">Productos</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={product.image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.fullName || product.name}</h1>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              {product.badge && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                  {product.badge}
                </span>
              )}

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price and Stock */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 ml-2">/ {product.size}</span>
                </div>
                <div className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? `En stock (${product.stock} unidades)` : 'Sin stock'}
                </div>
              </div>

              {product.inStock && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Añadir al Carrito
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Comprar Ahora
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Applications */}
            {product.applications && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Aplicaciones</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                Características
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                Ficha Técnica
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                Ficha de Seguridad
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {product.features && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar Ficha Técnica
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar Ficha de Seguridad
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/productos/${relatedProduct.id}`}>
                    <div className="aspect-square relative">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          €{relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {relatedProduct.size}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}