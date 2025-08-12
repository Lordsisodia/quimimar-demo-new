"use client"

import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
        style={{ transformOrigin: "0%" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-primary"
            style={{
              pathLength: scrollYProgress,
              strokeDasharray: "125.6",
              strokeDashoffset: 0
            }}
          />
        </svg>
        
        {/* Scroll to top button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute inset-0 flex items-center justify-center text-primary hover:text-secondary transition-colors"
        >
          <svg 
            className="w-6 h-6 rotate-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 11l5-5m0 0l5 5m-5-5v12" 
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Parallax Scroll Indicators */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          {['Hero', 'Categorías', 'Productos', 'Nosotros', 'Empresas', 'Contacto'].map((section, index) => (
            <motion.div
              key={section}
              className="relative"
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer"
                whileHover={{ scale: 1.5 }}
                onClick={() => {
                  const element = document.getElementById(section.toLowerCase())
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
              <motion.span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
              >
                {section}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}