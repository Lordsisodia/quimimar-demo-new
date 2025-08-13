'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'CLORSAN',
      fullName: 'CLORSAN Desinfectante Clorado Sanitario',
      price: 8.91,
      size: '5L',
      image: '/api/placeholder/200/200',
      quantity: 2,
      sku: '0290011'
    },
    {
      id: 2,
      name: 'AMBIXEL YOU',
      fullName: 'AMBIXEL YOU Ambientador Concentrado',
      price: 12.50,
      size: '5L',
      image: '/api/placeholder/200/200',
      quantity: 1,
      sku: '0290001'
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.95
  const tax = subtotal * 0.21 // 21% IVA
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explora nuestro catálogo y añade productos a tu carrito
            </p>
            <Link href="/productos">
              <Button size="lg">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900">Carrito</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
          <Link href="/productos">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Seguir Comprando
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.fullName}</h3>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (21%)</span>
                  <span className="font-medium">€{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <Truck className="w-4 h-4 inline mr-1" />
                    Envío gratis en pedidos superiores a €50
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Checkout
                  </Button>
                </Link>
                
                <Button variant="secondary" className="w-full">
                  Solicitar Presupuesto
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1" />
                Compra 100% segura
              </div>
            </Card>

            {/* Promo Code */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Código Promocional</h3>
              <div className="flex space-x-2">
                <Input placeholder="Introduce tu código" className="flex-1" />
                <Button variant="secondary">Aplicar</Button>
              </div>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Ventajas Quimimar</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  Garantía de calidad
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-green-500 mr-2" />
                  Entrega en 24-48h
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-green-500 mr-2" />
                  Pago seguro
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}