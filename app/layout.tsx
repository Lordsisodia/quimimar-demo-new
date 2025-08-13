import type { Metadata } from 'next'
import './globals.css'
import { TranslationProvider } from '@/hooks/useTranslation'
import { CartProvider } from '@/contexts/CartContext'
import { ScrollProgress } from '@/components/ScrollProgress'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import CursorTrail from '@/components/ui/CursorTrail'
import { CommandPalette } from '@/components/ui/CommandPalette'

export const metadata: Metadata = {
  title: 'Quimimar - Productos de Limpieza Profesional en Murcia',
  description: 'Distribuidor oficial de productos Quimxel. Más de 500 productos de limpieza profesional. Entrega 24-48h en Murcia. Precios especiales para empresas.',
  keywords: 'productos limpieza murcia, quimxel distribuidor, limpieza profesional, productos hostelería',
  openGraph: {
    title: 'Quimimar - Productos de Limpieza Profesional',
    description: 'Tu distribuidor de confianza en Murcia',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <TranslationProvider>
            <ScrollProgress />
            <CommandPalette />
            <CursorTrail 
              type="dots" 
              color="#60A5FA" 
              size={25} 
              length={15} 
              physics={true}
            />
            {children}
            <MobileBottomNav />
          </TranslationProvider>
        </CartProvider>
      </body>
    </html>
  )
}