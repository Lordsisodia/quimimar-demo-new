'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Users, 
  Award, 
  Target, 
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Calidad",
      description: "Productos de máxima calidad respaldados por Quimxel, líder en el sector químico"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Experiencia",
      description: "Más de 15 años distribuyendo productos profesionales de limpieza e higiene"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Innovación",
      description: "Constantemente actualizamos nuestro catálogo con las últimas innovaciones"
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Compromiso",
      description: "Dedicados a la satisfacción del cliente y al cuidado del medio ambiente"
    }
  ]

  const milestones = [
    {
      year: "2008",
      title: "Fundación de Quimimar",
      description: "Iniciamos como distribuidores especializados en productos Quimxel"
    },
    {
      year: "2012",
      title: "Expansión Regional",
      description: "Ampliamos nuestra cobertura a toda Andalucía y Levante"
    },
    {
      year: "2018",
      title: "Certificación ISO",
      description: "Obtenemos certificación de calidad y gestión ambiental"
    },
    {
      year: "2023",
      title: "Transformación Digital",
      description: "Lanzamos nuestra plataforma e-commerce para mejor servicio"
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
              Sobre <span className="text-blue-300">Quimimar</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Distribuidores oficiales de Quimxel en España. Más de 15 años proporcionando 
              soluciones profesionales de limpieza e higiene a empresas de todos los sectores.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed">
                Proporcionar a nuestros clientes las mejores soluciones en productos químicos 
                profesionales, garantizando calidad, eficiencia y respeto al medio ambiente. 
                Nos comprometemos a ser el socio estratégico que ayude a las empresas a 
                optimizar sus procesos de limpieza e higiene.
              </p>
            </Card>
            
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
              <p className="text-gray-600 leading-relaxed">
                Ser la empresa de distribución líder en productos químicos profesionales, 
                reconocida por nuestra excelencia en el servicio, innovación constante y 
                compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia 
                nacional manteniendo los más altos estándares de calidad.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo diario y definen nuestra identidad empresarial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un recorrido de crecimiento constante y compromiso con la excelencia
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-600 font-semibold">{milestone.year}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                ¿Quieres Conocernos Mejor?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Estamos aquí para responder a todas tus preguntas y ayudarte 
                a encontrar las mejores soluciones para tu empresa.
              </p>
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Contactar Ahora
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-300 mr-4 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Dirección</div>
                  <div className="text-blue-100">Calle Ejemplo, 123 - 29001 Málaga</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-300 mr-4 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Teléfono</div>
                  <div className="text-blue-100">+34 XXX XXX XXX</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-300 mr-4 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-blue-100">info@quimimar.es</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}