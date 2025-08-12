"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

export const ValueProps = () => {
  const { t } = useTranslation()
  const content = t('valueProps')

  return (
    <section id="nosotros" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {content.sectionTitle}
          </h2>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.props.map((prop: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ValuePropCard {...prop} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ValuePropCard = ({ 
  icon, 
  title, 
  description 
}: {
  icon: string
  title: string
  description: string
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="text-center group"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center w-20 h-20 mb-4 text-4xl bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow"
      >
        {icon}
      </motion.div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 font-heading group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  )
}