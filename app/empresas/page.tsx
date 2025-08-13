'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle,
  ArrowRight,
  Quote
} from 'lucide-react'

export default function BusinessPage() {
  const benefits = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: "Precios Mayoristas",
      description: "Descuentos especiales por volumen y condiciones preferenciales para empresas"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Gestor Comercial Dedicado",
      description: "Un especialista asignado para asesorarte en productos y optimizar tus compras"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Facturación Mensual",
      description: "Flexibilidad de pago con crédito empresarial y facturación consolidada"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Formación Técnica",
      description: "Capacitación de tu equipo en el uso correcto de productos químicos"
    }
  ]

  const sectors = [
    "Hoteles y Hospitales",
    "Restaurantes y Bares", 
    "Centros Sanitarios",
    "Oficinas y Coworkings",
    "Centros Educativos",
    "Industria Alimentaria",
    "Talleres y Garajes",
    "Empresas de Limpieza"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Soluciones para <span className="text-blue-300">Tu Empresa</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Productos profesionales de limpieza e higiene con condiciones especiales 
                para empresas. Optimiza tus costes y mejora la eficiencia de tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Solicitar Presupuesto
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Ver Catálogo
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/api/placeholder/600/400" 
                alt="Productos empresariales"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ventajas para Tu Empresa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diseñamos soluciones adaptadas a las necesidades específicas de cada sector empresarial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sectores que Atendemos
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Más de 15 años proporcionando soluciones de limpieza e higiene 
                profesional a empresas de todos los sectores.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {sectors.map((sector, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{sector}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-start mb-6">
                <Quote className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 italic mb-4">
                    "Quimimar nos ha ayudado a reducir un 30% nuestros costes de limpieza 
                    manteniendo la máxima calidad. Su asesoramiento técnico es excepcional."
                  </p>
                  <div className="font-semibold text-gray-900">Hotel Mediterráneo</div>
                  <div className="text-sm text-gray-600">Director de Operaciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Optimizar tu Negocio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contacta con nuestro equipo comercial y descubre cómo podemos 
            ayudarte a reducir costes y mejorar la eficiencia de tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              Llamar Ahora: +34 XXX XXX XXX
            </Button>
            <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-blue-900">
              Enviar Email
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}