import { useState } from 'react'
import { Plus, Home, MapPin, Calendar, FileText, Shield, Settings, User } from 'lucide-react'

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
              <h1 className="ml-2 text-xl font-bold text-gray-900">PropertyGuard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.firstName} {user?.lastName}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to PropertyGuard, {user?.firstName}!
          </h2>
          <p className="text-gray-600">
            Manage your properties, documents, and compliance in one secure platform.
          </p>
        </div>

        {/* Stats Cards */}
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
                <p className="text-2xl font-bold text-gray-900">
                  {properties.reduce((sum, prop) => sum + prop.documents, 0)}
                </p>
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
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Your Properties</h3>
              <button
                onClick={onAddProperty}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {properties.map((property) => (
              <div
                key={property.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onPropertySelect(property)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Home className="h-10 w-10 text-gray-400" />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">{property.name}</h4>
                        {property.isDemo && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Demo
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.address}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {property.documents} documents
                    </div>
                    <div className="text-sm text-gray-500">
                      Updated {property.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Property Card */}
            <div
              className="px-6 py-8 hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-300"
              onClick={onAddProperty}
            >
              <div className="text-center">
                <Plus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Add Your Property</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start protecting your property investment
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Free Trial Active
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You can upload up to 3 documents during your trial. 
                  <a href="#" className="font-medium underline hover:text-yellow-600">
                    Upgrade to continue
                  </a> adding unlimited documents and properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PropertyDashboard

