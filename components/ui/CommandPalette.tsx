"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  X, 
  Home, 
  Package, 
  Building2, 
  Phone, 
  ShoppingCart,
  ArrowRight,
  Command,
  History,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ElementType
  action: () => void
  category: 'navigation' | 'products' | 'actions' | 'recent'
  keywords?: string[]
  badge?: string
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  // Command items
  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'home',
      title: 'Inicio',
      description: 'Volver a la página principal',
      icon: Home,
      action: () => router.push('/'),
      category: 'navigation',
      keywords: ['home', 'inicio', 'principal']
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Ver todos los productos',
      icon: Package,
      action: () => router.push('/productos'),
      category: 'navigation',
      keywords: ['productos', 'catalogo', 'tienda']
    },
    {
      id: 'business',
      title: 'Empresas',
      description: 'Soluciones para empresas',
      icon: Building2,
      action: () => router.push('/empresas'),
      category: 'navigation',
      badge: 'Nuevo'
    },
    {
      id: 'contact',
      title: 'Contacto',
      description: 'Ponte en contacto con nosotros',
      icon: Phone,
      action: () => router.push('/contacto'),
      category: 'navigation'
    },
    // Products
    {
      id: 'eco-products',
      title: 'Productos Ecológicos',
      description: 'Línea eco-friendly',
      icon: Sparkles,
      action: () => router.push('/productos?category=eco-friendly'),
      category: 'products',
      keywords: ['eco', 'ecologico', 'verde', 'sostenible'],
      badge: 'Popular'
    },
    {
      id: 'industrial',
      title: 'Limpieza Industrial',
      description: 'Productos de alta potencia',
      icon: TrendingUp,
      action: () => router.push('/productos?category=industrial'),
      category: 'products'
    },
    // Actions
    {
      id: 'cart',
      title: 'Ver Carrito',
      description: 'Ir al carrito de compras',
      icon: ShoppingCart,
      action: () => router.push('/carrito'),
      category: 'actions'
    }
  ], [router])

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands

    return commands.filter(command => {
      const searchLower = search.toLowerCase()
      return (
        command.title.toLowerCase().includes(searchLower) ||
        command.description?.toLowerCase().includes(searchLower) ||
        command.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
      )
    })
  }, [search, commands])

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {
      navigation: [],
      products: [],
      actions: [],
      recent: []
    }

    filteredCommands.forEach(command => {
      groups[command.category].push(command)
    })

    return groups
  }, [filteredCommands])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }

      if (!isOpen) return

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
      }

      // Navigate with arrows
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
      }

      // Execute with Enter
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault()
        executeCommand(filteredCommands[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands])

  // Execute command
  const executeCommand = useCallback((command: CommandItem) => {
    // Add to recent searches
    if (search && !recentSearches.includes(search)) {
      setRecentSearches(prev => [search, ...prev].slice(0, 5))
    }

    // Execute action
    command.action()
    
    // Close palette
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }, [search, recentSearches])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  return (
    <>
      {/* Trigger Button (optional - mainly keyboard activated) */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden"
        aria-label="Open command palette"
      />

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {/* Search Header */}
              <div className="relative border-b border-gray-200">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos, páginas o acciones..."
                  className="w-full pl-12 pr-12 py-4 text-lg focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No se encontraron resultados para "{search}"
                  </div>
                ) : (
                  <div className="py-2">
                    {/* Navigation */}
                    {groupedCommands.navigation.length > 0 && (
                      <CommandGroup
                        title="Navegación"
                        commands={groupedCommands.navigation}
                        selectedIndex={selectedIndex}
                        onSelect={executeCommand}
                        startIndex={0}
                      />
                    )}

                    {/* Products */}
                    {groupedCommands.products.length > 0 && (
                      <CommandGroup
                        title="Productos"
                        commands={groupedCommands.products}
                        selectedIndex={selectedIndex}
                        onSelect={executeCommand}
                        startIndex={groupedCommands.navigation.length}
                      />
                    )}

                    {/* Actions */}
                    {groupedCommands.actions.length > 0 && (
                      <CommandGroup
                        title="Acciones"
                        commands={groupedCommands.actions}
                        selectedIndex={selectedIndex}
                        onSelect={executeCommand}
                        startIndex={
                          groupedCommands.navigation.length + 
                          groupedCommands.products.length
                        }
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Command className="w-3 h-3" />K para abrir
                    </span>
                    <span>↑↓ para navegar</span>
                    <span>↵ para seleccionar</span>
                    <span>ESC para cerrar</span>
                  </div>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={() => setRecentSearches([])}
                      className="hover:text-gray-700"
                    >
                      Limpiar historial
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Command Group Component
const CommandGroup = ({
  title,
  commands,
  selectedIndex,
  onSelect,
  startIndex
}: {
  title: string
  commands: CommandItem[]
  selectedIndex: number
  onSelect: (command: CommandItem) => void
  startIndex: number
}) => {
  return (
    <div className="px-2 py-2">
      <div className="px-3 py-2 text-xs font-medium text-gray-500">{title}</div>
      {commands.map((command, index) => {
        const globalIndex = startIndex + index
        const isSelected = selectedIndex === globalIndex

        return (
          <motion.button
            key={command.id}
            onClick={() => onSelect(command)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors",
              isSelected 
                ? "bg-primary text-white" 
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            <command.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              isSelected ? "text-white" : "text-gray-400"
            )} />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-medium">{command.title}</span>
                {command.badge && (
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    isSelected 
                      ? "bg-white/20 text-white" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {command.badge}
                  </span>
                )}
              </div>
              {command.description && (
                <p className={cn(
                  "text-sm",
                  isSelected ? "text-white/80" : "text-gray-500"
                )}>
                  {command.description}
                </p>
              )}
            </div>
            <ArrowRight className={cn(
              "w-4 h-4 flex-shrink-0",
              isSelected ? "text-white" : "text-gray-300"
            )} />
          </motion.button>
        )
      })}
    </div>
  )
}