"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Loader2 } from 'lucide-react'

interface InteractiveMapProps {
  latitude: number
  longitude: number
  companyName: string
  address: string
}

export const InteractiveMap = ({ 
  latitude, 
  longitude, 
  companyName, 
  address 
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Custom map styles for Quimimar branding
  const mapStyles = `
    [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f5f5"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#c9c9c9"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9e9e9e"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#696969"}]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#616161"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#e5e5e5"}]
      },
      {
        "featureType": "poi.business",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#c9c9c9"}]
      }
    ]
  `

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-100 rounded-xl overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
            <p className="text-gray-500">Cargando mapa...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Custom Map Controls */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Open in Google Maps
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
              '_blank'
            )
          }}
          className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow"
        >
          <Navigation className="w-5 h-5 text-primary" />
        </motion.button>
      </div>

      {/* Map Overlay with Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">{companyName}</h3>
            <p className="text-sm text-gray-600 mt-1">{address}</p>
          </div>
        </div>
      </motion.div>

      {/* Custom Logo Marker */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.8, 
          type: "spring",
          stiffness: 200
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Marker Pin */}
          <div className="relative">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-primary" />
            <div className="bg-white rounded-lg shadow-xl p-2 border-2 border-primary">
              <img 
                src="/logo-quimimar.svg" 
                alt={companyName}
                className="w-24 h-8 object-contain"
              />
            </div>
          </div>
          
          {/* Pulsing circle */}
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2"
            animate={{ scale: [0, 2], opacity: [1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <div className="w-4 h-4 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Embedded Google Map as fallback */}
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.8!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU0JzAwLjAiTiAxwrAxMicwMC4wIlc!5e0!3m2!1sen!2ses!4v1234567890`}
        width="100%"
        height="100%"
        style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoading(false)}
        title={`${companyName} Location`}
      />

      {/* Custom Marker Style */}
      <style jsx>{`
        .custom-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -100%); }
          50% { transform: translate(-50%, -110%); }
        }
      `}</style>
    </div>
  )
}