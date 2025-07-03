import { useState } from 'react'
import { Plus, Home, MapPin, Calendar, FileText, Shield, Settings, User, LogOut } from 'lucide-react'

function PropertyDashboard({ user, onPropertySelect, onAddProperty, onLogout, userProperties }) {
  const [properties] = useState([
    {
      id: 'demo',
      name: 'Demo Property',
      address: '123 Demo Street, Cape Town',
      type: 'Residential',
      status: 'Complete',
      documents: 15,
      lastUpdated: '2024-01-15',
      isDemo: true
    },
    ...userProperties
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">PropertyGuard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Free Trial
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to PropertyGuard, {user?.firstName}!
          </h2>
          <p className="text-lg text-gray-600">
            Manage your properties, documents, and compliance in one secure platform.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Compliance Status</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming Renewals</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Your Properties</h3>
            <button
              onClick={onAddProperty}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Demo Property Card */}
            <div 
              onClick={() => onPropertySelect(properties[0])}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Demo Property</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Demo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    123 Demo Street, Cape Town
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-2" />
                    15 documents
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Updated 2024-01-15
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Explore our demo property to see how PropertyGuard works
                  </p>
                </div>
              </div>
            </div>

            {/* Add Property Card */}
            <div 
              onClick={onAddProperty}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400"
            >
              <div className="p-6 text-center">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Add Your Property</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Start protecting your property investment
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </button>
              </div>
            </div>

            {/* User Properties */}
            {userProperties.map(property => (
              <div 
                key={property.id}
                onClick={() => onPropertySelect(property)}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{property.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {property.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-4 w-4 mr-2" />
                      {property.documents} documents
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Updated {property.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trial Status */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-yellow-600" />
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-yellow-800">Free Trial Active</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You can upload up to 3 documents during your trial. 
                <a href="#" className="font-medium underline hover:text-yellow-800 ml-1">
                  Upgrade to continue
                </a> adding unlimited documents and properties.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PropertyDashboard

