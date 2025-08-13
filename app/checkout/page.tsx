'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  Building,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [step, setStep] = useState(1) // 1: Info, 2: Shipping, 3: Payment
  const [userType, setUserType] = useState('business') // 'business' or 'individual'
  
  const [formData, setFormData] = useState({
    // Personal/Business Info
    name: '',
    email: '',
    phone: '',
    company: '',
    cif: '',
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingPostal: '',
    billingProvince: '',
    // Shipping Address
    shippingAddress: '',
    shippingCity: '',
    shippingPostal: '',
    shippingProvince: '',
    sameAsBilling: true,
    // Payment
    paymentMethod: 'card',
    notes: ''
  })

  const cartItems = [
    {
      id: 1,
      name: 'CLORSAN Desinfectante Clorado Sanitario',
      price: 8.91,
      size: '5L',
      quantity: 2,
      sku: '0290011'
    },
    {
      id: 2,
      name: 'AMBIXEL YOU Ambientador Concentrado',
      price: 12.50,
      size: '5L',
      quantity: 1,
      sku: '0290001'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.95
  const tax = subtotal * 0.21
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const steps = [
    { number: 1, title: 'Información', completed: step > 1 },
    { number: 2, title: 'Envío', completed: step > 2 },
    { number: 3, title: 'Pago', completed: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <Link href="/carrito" className="hover:text-blue-600">Carrito</Link>
            <span>/</span>
            <span className="text-gray-900">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  stepItem.completed 
                    ? 'bg-green-500 border-green-500 text-white'
                    : step === stepItem.number
                    ? 'border-blue-500 text-blue-500'
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {stepItem.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step === stepItem.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {step === 1 && 'Información de Contacto'}
                  {step === 2 && 'Información de Envío'}
                  {step === 3 && 'Método de Pago'}
                </h1>
                <Link href="/carrito">
                  <Button variant="secondary" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Carrito
                  </Button>
                </Link>
              </div>

              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* User Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de Cliente
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setUserType('business')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 ${
                          userType === 'business' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Building className="w-5 h-5" />
                        <span>Empresa</span>
                      </button>
                      <button
                        onClick={() => setUserType('individual')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 ${
                          userType === 'individual' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Particular</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        icon={<User className="w-5 h-5 text-gray-400" />}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        icon={<Mail className="w-5 h-5 text-gray-400" />}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        icon={<Phone className="w-5 h-5 text-gray-400" />}
                        required
                      />
                    </div>

                    {userType === 'business' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa *
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          icon={<Building className="w-5 h-5 text-gray-400" />}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {userType === 'business' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CIF/NIF *
                      </label>
                      <Input
                        type="text"
                        name="cif"
                        value={formData.cif}
                        onChange={handleInputChange}
                        placeholder="A12345678"
                        required
                      />
                    </div>
                  )}

                  <Button onClick={() => setStep(2)} className="w-full">
                    Continuar con el Envío
                  </Button>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Dirección de Facturación
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección *
                        </label>
                        <Input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          icon={<MapPin className="w-5 h-5 text-gray-400" />}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ciudad *
                        </label>
                        <Input
                          type="text"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código Postal *
                        </label>
                        <Input
                          type="text"
                          name="billingPostal"
                          value={formData.billingPostal}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sameAsBilling"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-700">
                      Usar la misma dirección para el envío
                    </label>
                  </div>

                  {!formData.sameAsBilling && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Dirección de Envío
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dirección *
                          </label>
                          <Input
                            type="text"
                            name="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleInputChange}
                            icon={<MapPin className="w-5 h-5 text-gray-400" />}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ciudad *
                          </label>
                          <Input
                            type="text"
                            name="shippingCity"
                            value={formData.shippingCity}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código Postal *
                          </label>
                          <Input
                            type="text"
                            name="shippingPostal"
                            value={formData.shippingPostal}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                      Volver
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continuar con el Pago
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Método de Pago
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                        <span className="font-medium">Tarjeta de Crédito/Débito</span>
                      </label>
                      
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          checked={formData.paymentMethod === 'transfer'}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Building className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                        <span className="font-medium">Transferencia Bancaria</span>
                      </label>
                      
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="quote"
                          checked={formData.paymentMethod === 'quote'}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Mail className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                        <span className="font-medium">Solicitar Presupuesto</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas del Pedido (Opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Instrucciones especiales para el envío..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">
                      Volver
                    </Button>
                    <Button className="flex-1">
                      <Shield className="w-4 h-4 mr-2" />
                      Finalizar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.quantity} x €{item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (21%)</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-sm text-green-700">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Compra 100% segura y protegida</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-sm text-blue-700">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>¡Envío gratuito incluido!</span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}