"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/Button'
import { InteractiveMap } from '@/components/ui/InteractiveMap'

export const ContactSection = () => {
  const { t } = useTranslation()
  const content = t('contact')

  return (
    <section id="contacto" className="py-16 md:py-20 bg-gray-50">
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px] lg:h-full"
          >
            <InteractiveMap
              latitude={37.958889}
              longitude={-1.231111}
              companyName="Quimimar"
              address={`${content.address.line1}, ${content.address.line3}`}
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {content.mapTitle}
                  </h3>
                  <p className="text-gray-600">
                    {content.address.line1}<br />
                    {content.address.line2}<br />
                    {content.address.line3}<br />
                    {content.address.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              {/* Phone */}
              <motion.a
                href={`tel:+34${content.phone.value.replace(/\s/g, '')}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{content.phone.label}</p>
                  <p className="font-semibold">{content.phone.value}</p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/34${content.whatsapp.value.replace(/\s/g, '').replace('+34', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{content.whatsapp.label}</p>
                  <p className="font-semibold">{content.whatsapp.value}</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${content.email.value}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{content.email.label}</p>
                  <p className="font-semibold">{content.email.value}</p>
                </div>
              </motion.a>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3">
                    {content.hours.title}
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>{content.hours.weekdays}</p>
                    <p>{content.hours.saturday}</p>
                    <p>{content.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}