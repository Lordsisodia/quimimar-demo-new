"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Building, User, Mail, Phone, MapPin, FileText, Check } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { useTranslation } from '@/hooks/useTranslation'

interface BusinessAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BusinessAccountModal = ({ isOpen, onClose }: BusinessAccountModalProps) => {
  const { t, locale } = useTranslation()
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset and close after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        taxId: '',
        message: ''
      })
      onClose()
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const formLabels = {
    es: {
      title: 'Solicitar Cuenta Empresa',
      subtitle: 'Complete el formulario y nos pondremos en contacto en 24 horas',
      companyName: 'Nombre de la Empresa',
      contactName: 'Persona de Contacto',
      email: 'Email Corporativo',
      phone: 'Teléfono',
      address: 'Dirección',
      taxId: 'CIF/NIF',
      message: 'Mensaje (opcional)',
      messagePlaceholder: 'Cuéntanos sobre tu negocio y tus necesidades...',
      submit: 'Enviar Solicitud',
      submitting: 'Enviando...',
      success: '¡Solicitud enviada con éxito!',
      successMessage: 'Nos pondremos en contacto contigo pronto.'
    },
    en: {
      title: 'Request Business Account',
      subtitle: 'Complete the form and we will contact you within 24 hours',
      companyName: 'Company Name',
      contactName: 'Contact Person',
      email: 'Corporate Email',
      phone: 'Phone',
      address: 'Address',
      taxId: 'Tax ID',
      message: 'Message (optional)',
      messagePlaceholder: 'Tell us about your business and needs...',
      submit: 'Submit Request',
      submitting: 'Sending...',
      success: 'Request sent successfully!',
      successMessage: 'We will contact you soon.'
    }
  }

  const labels = formLabels[locale]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-heading">{labels.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{labels.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{labels.success}</h3>
                  <p className="text-gray-600">{labels.successMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {labels.companyName}
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      icon={<Building className="w-5 h-5" />}
                      required
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {labels.contactName}
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      icon={<User className="w-5 h-5" />}
                      required
                    />
                  </div>

                  {/* Two columns */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {labels.email}
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="w-5 h-5" />}
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {labels.phone}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<Phone className="w-5 h-5" />}
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {labels.address}
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      icon={<MapPin className="w-5 h-5" />}
                      required
                    />
                  </div>

                  {/* Tax ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {labels.taxId}
                    </label>
                    <Input
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      icon={<FileText className="w-5 h-5" />}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {labels.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={labels.messagePlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? labels.submitting : labels.submit}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}