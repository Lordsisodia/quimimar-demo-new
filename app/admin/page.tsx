'use client'

import { useState } from 'react'
import { dashboardMetrics, recentOrders, topSellingProducts, sampleProducts } from '@/lib/sampleData'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Euro, 
  Package, 
  AlertTriangle, 
  Users, 
  ShoppingCart, 
  Eye,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? (title.includes('Sales') ? `€${value.toFixed(2)}` : value) : value}
        </p>
        <div className={`flex items-center mt-1 text-xs ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
          {change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : change < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
          {change !== 0 && `${change > 0 ? '+' : ''}${change}% from yesterday`}
        </div>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </Card>
)

const OrderRow = ({ order }: any) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
      <td className="px-4 py-3 text-sm text-gray-900">€{order.total.toFixed(2)}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
          {order.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  )
}

const ProductRow = ({ product }: any) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <td className="px-4 py-3">
      <div className="flex items-center">
        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-600">{product.sku}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
    <td className="px-4 py-3 text-sm text-gray-900">€{product.price.toFixed(2)}</td>
    <td className="px-4 py-3">
      <span className={`text-sm ${product.stock > 20 ? 'text-green-600' : product.stock > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
        {product.stock}
      </span>
    </td>
    <td className="px-4 py-3">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </span>
    </td>
    <td className="px-4 py-3">
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </td>
  </tr>
)

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'products', name: 'Products', icon: '🧽' },
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'reports', name: 'Reports', icon: '📈' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="ml-4 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Quimimar
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Today's Sales"
                value={dashboardMetrics.todaysSales.value}
                change={dashboardMetrics.todaysSales.change}
                icon={Euro}
                color="bg-green-500"
              />
              <MetricCard
                title="Pending Orders"
                value={dashboardMetrics.pendingOrders.value}
                change={dashboardMetrics.pendingOrders.change}
                icon={Package}
                color="bg-yellow-500"
              />
              <MetricCard
                title="Low Stock Alerts"
                value={dashboardMetrics.lowStock.value}
                change={dashboardMetrics.lowStock.change}
                icon={AlertTriangle}
                color="bg-red-500"
              />
              <MetricCard
                title="New Customers"
                value={dashboardMetrics.newCustomers.value}
                change={dashboardMetrics.newCustomers.change}
                icon={Users}
                color="bg-blue-500"
              />
              <MetricCard
                title="Active Carts"
                value={dashboardMetrics.activeShoppingCarts.value}
                change={dashboardMetrics.activeShoppingCarts.change}
                icon={ShoppingCart}
                color="bg-purple-500"
              />
              <MetricCard
                title="Visitors Online"
                value={dashboardMetrics.websiteVisitors.value}
                change={dashboardMetrics.websiteVisitors.change}
                icon={Eye}
                color="bg-indigo-500"
              />
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">€{order.total.toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-3">
                  {topSellingProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900">€{product.revenue.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <Button variant="secondary" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <Button variant="secondary" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <ProductRow key={product.id} product={product} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Management</h3>
            <p className="text-gray-600">Customer management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-gray-600">Advanced reporting dashboard coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}