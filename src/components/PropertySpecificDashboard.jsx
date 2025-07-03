import { useState } from 'react'
import { ArrowLeft, Home, FileText, Shield, Calendar, Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

function PropertySpecificDashboard({ property, onBack, isDemo = false }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [uploadedDocuments, setUploadedDocuments] = useState(0)
  const maxTrialDocuments = 3

  // Demo data for the demo property
  const demoData = {
    overview: {
      acquisitionDate: '2020-03-15',
      acquisitionMethod: 'Purchase',
      propertyValue: 'R2,850,000',
      lastValuation: '2024-01-15'
    },
    documents: [
      { id: 1, name: 'Home Insurance Policy', type: 'Insurance', date: '2024-01-15', status: 'Active' },
      { id: 2, name: 'HVAC Warranty', type: 'Warranty', date: '2023-06-10', status: 'Active' },
      { id: 3, name: 'Electrical COC', type: 'COC', date: '2024-03-20', status: 'Valid' },
      { id: 4, name: 'Architect Plans', type: 'Plans', date: '2020-02-01', status: 'Archived' },
      { id: 5, name: 'Property Deed', type: 'Legal', date: '2020-03-15', status: 'Valid' }
    ],
    insurance: [
      { 
        id: 1, 
        provider: 'Santam', 
        type: 'Home Insurance', 
        coverage: 'R3,500,000',
        premium: 'R2,450/month',
        expiry: '2024-12-31',
        status: 'Active'
      }
    ],
    warranties: [
      { 
        id: 1, 
        item: 'HVAC System', 
        provider: 'Climate Control SA',
        expiry: '2025-06-10',
        status: 'Active',
        coverage: 'Full system replacement'
      },
      { 
        id: 2, 
        item: 'Solar Panels', 
        provider: 'SolarTech',
        expiry: '2030-08-15',
        status: 'Active',
        coverage: '25-year performance warranty'
      }
    ]
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'ownership', label: 'Ownership Details', icon: FileText },
    { id: 'insurance', label: 'Insurance Policies', icon: Shield },
    { id: 'warranties', label: 'Warranties', icon: CheckCircle },
    { id: 'compliance', label: 'Compliance', icon: AlertTriangle },
    { id: 'documents', label: 'All Documents', icon: FileText }
  ]

  const handleDocumentUpload = () => {
    if (!isDemo && uploadedDocuments >= maxTrialDocuments) {
      alert('Trial limit reached! Upgrade to continue uploading documents.')
      return
    }
    
    // Simulate document upload
    if (!isDemo) {
      setUploadedDocuments(prev => prev + 1)
    }
    alert('Document upload functionality would be implemented here')
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Property Address</label>
            <p className="mt-1 text-sm text-gray-900">{property.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Property Type</label>
            <p className="mt-1 text-sm text-gray-900">{property.type || 'Residential'}</p>
          </div>
          {isDemo && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-500">Acquisition Date</label>
                <p className="mt-1 text-sm text-gray-900">{demoData.overview.acquisitionDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Acquisition Method</label>
                <p className="mt-1 text-sm text-gray-900">{demoData.overview.acquisitionMethod}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Current Value</label>
                <p className="mt-1 text-sm text-gray-900">{demoData.overview.propertyValue}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Valuation</label>
                <p className="mt-1 text-sm text-gray-900">{demoData.overview.lastValuation}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {isDemo ? demoData.documents.length : uploadedDocuments}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Insurance Policies</p>
              <p className="text-2xl font-bold text-gray-900">
                {isDemo ? demoData.insurance.length : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Warranties</p>
              <p className="text-2xl font-bold text-gray-900">
                {isDemo ? demoData.warranties.length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Documents</h3>
        <button
          onClick={handleDocumentUpload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </button>
      </div>

      {!isDemo && uploadedDocuments < maxTrialDocuments && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Trial Mode - {maxTrialDocuments - uploadedDocuments} uploads remaining
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Upload up to {maxTrialDocuments} documents to see how PropertyGuard analyzes and organizes your property information.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {isDemo ? (
            demoData.documents.map((doc) => (
              <div key={doc.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Active' ? 'bg-green-100 text-green-800' :
                    doc.status === 'Valid' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))
          ) : uploadedDocuments === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by uploading your first property document
              </p>
            </div>
          ) : (
            <div className="px-6 py-4">
              <p className="text-sm text-gray-500">
                {uploadedDocuments} document(s) uploaded
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderInsurance = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Insurance Policies</h3>
      
      {isDemo ? (
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200">
            {demoData.insurance.map((policy) => (
              <div key={policy.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{policy.type}</h4>
                    <p className="text-sm text-gray-500">{policy.provider}</p>
                    <p className="text-sm text-gray-500">Coverage: {policy.coverage}</p>
                    <p className="text-sm text-gray-500">Premium: {policy.premium}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {policy.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Expires: {policy.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No insurance policies</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload your insurance documents to get started
          </p>
        </div>
      )}
    </div>
  )

  const renderWarranties = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Warranties</h3>
      
      {isDemo ? (
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200">
            {demoData.warranties.map((warranty) => (
              <div key={warranty.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{warranty.item}</h4>
                    <p className="text-sm text-gray-500">{warranty.provider}</p>
                    <p className="text-sm text-gray-500">{warranty.coverage}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {warranty.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Expires: {warranty.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No warranties</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload warranty documents to track coverage
          </p>
        </div>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview()
      case 'documents':
        return renderDocuments()
      case 'insurance':
        return renderInsurance()
      case 'warranties':
        return renderWarranties()
      case 'ownership':
      case 'compliance':
        return (
          <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">
              This section will be available in the full version
            </p>
          </div>
        )
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Properties
            </button>
            <div className="flex items-center">
              <Home className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">{property.name}</h1>
              {isDemo && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Demo Property
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Property Management
                </h3>
              </div>
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium text-left ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySpecificDashboard

