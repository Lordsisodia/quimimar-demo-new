'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare,
  User,
  Building
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Dirección",
      content: "Calle Ejemplo, 123\n29001 Málaga, España",
      action: "Ver en Google Maps"
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Teléfono",
      content: "+34 XXX XXX XXX",
      action: "Llamar ahora"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      content: "info@quimimar.es",
      action: "Enviar email"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Horario",
      content: "Lunes a Viernes: 8:00 - 18:00\nSábados: 9:00 - 14:00",
      action: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contacta con <span className="text-blue-300">Nosotros</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Contacta con nuestro equipo de especialistas 
              para resolver tus dudas y encontrar las mejores soluciones para tu empresa.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Envíanos un Mensaje</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
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
                      placeholder="tu@email.com"
                      icon={<Mail className="w-5 h-5 text-gray-400" />}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa"
                      icon={<Building className="w-5 h-5 text-gray-400" />}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 XXX XXX XXX"
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="presupuesto">Solicitar Presupuesto</option>
                    <option value="productos">Consulta sobre Productos</option>
                    <option value="distribucion">Información de Distribución</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Información de Contacto
              </h2>
              <p className="text-gray-600">
                Ponte en contacto con nosotros a través de cualquiera de estos medios
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line mb-3">
                      {info.content}
                    </p>
                    {info.action && (
                      <Button variant="secondary" size="sm">
                        {info.action}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick Contact */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">
                ¿Necesitas Atención Inmediata?
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Para consultas urgentes, llámanos directamente o envía un WhatsApp
              </p>
              <div className="space-y-2">
                <Button size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Ahora
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestra Ubicación
            </h2>
            <p className="text-lg text-gray-600">
              Visítanos en nuestras instalaciones de Málaga
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Mapa interactivo</p>
              <p className="text-sm text-gray-500">Se integrará Google Maps aquí</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}