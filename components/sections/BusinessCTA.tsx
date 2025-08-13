"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/Button'
import { BusinessAccountModal } from '@/components/ui/BusinessAccountModal'
import ScrambleText from '@/components/ui/ScrambleText'

// Floating particle component
const FloatingParticle = ({ index }: { index: number }) => {
  const randomDelay = index * 0.5
  const randomDuration = 15 + Math.random() * 10
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100

  return (
    <motion.div
      className="absolute w-2 h-2 bg-primary/20 rounded-full"
      initial={{ 
        x: `${randomX}%`, 
        y: `${randomY}%`,
        scale: 0
      }}
      animate={{ 
        x: [`${randomX}%`, `${randomX + 30}%`, `${randomX - 20}%`, `${randomX}%`],
        y: [`${randomY}%`, `${randomY - 40}%`, `${randomY + 20}%`, `${randomY}%`],
        scale: [0, 1, 0.5, 1, 0]
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Floating icon component
const FloatingIcon = ({ icon, delay, position }: any) => {
  return (
    <motion.div
      className={`absolute ${position} opacity-10`}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-6xl">{icon}</div>
    </motion.div>
  )
}

export const BusinessCTA = () => {
  const { t } = useTranslation()
  const content = t('business')
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <section id="empresas" className="py-16 md:py-20 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated Blobs */}
      <motion.div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon="🧹" delay={0} position="top-10 left-20" />
      <FloatingIcon icon="✨" delay={1} position="top-32 right-16" />
      <FloatingIcon icon="🏢" delay={2} position="bottom-20 left-16" />
      <FloatingIcon icon="💼" delay={3} position="bottom-32 right-20" />
      <FloatingIcon icon="🏆" delay={4} position="top-1/2 left-10" />
      <FloatingIcon icon="📦" delay={5} position="top-1/2 right-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content Card with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative group"
          >
            {/* Sparkle Effect on Hover */}
            <motion.div
              className="absolute -top-2 -right-2 text-yellow-400"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            {/* Header with Animated Underline */}
            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-center font-heading"
              >
                <ScrambleText
                  text={content.headline}
                  trigger="scroll"
                  mode="glitch"
                  gradient="#60A5FA, #8B5CF6, #EC4899"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"
                />
              </motion.h2>
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '200px' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 text-center mb-8 mt-6"
            >
              {content.subheadline}
            </motion.p>

            {/* Benefits Grid with Hover Effects */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {content.benefits.map((benefit: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 group/item cursor-pointer"
                >
                  <motion.div 
                    className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring" }}
                  >
                    <Check className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700 group-hover/item:text-primary transition-colors">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons with Enhanced Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="group relative overflow-hidden"
                  onClick={() => setIsModalOpen(true)}
                  magnetic={true}
                  magneticStrength={0.3}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {content.cta.primary}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "linear",
                      repeatDelay: 1
                    }}
                    style={{ width: '100%' }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  size="lg"
                  magnetic={true}
                  magneticStrength={0.25}
                >
                  {content.cta.secondary}
                </Button>
              </motion.div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/10 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/10 rounded-br-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Business Account Modal */}
      <BusinessAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}