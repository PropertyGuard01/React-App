import { useState } from 'react'
import Auth from './components/Auth.jsx'
import PropertyDashboard from './components/PropertyDashboard.jsx'
import PropertySpecificDashboard from './components/PropertySpecificDashboard.jsx'
import AddPropertyModal from './components/AddPropertyModal.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('properties') // 'properties' or 'property-detail'
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)
  const [userProperties, setUserProperties] = useState([])

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('properties')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('properties')
    setSelectedProperty(null)
  }

  const handlePropertySelect = (property) => {
    setSelectedProperty(property)
    setCurrentView('property-detail')
  }

  const handleBackToProperties = () => {
    setCurrentView('properties')
    setSelectedProperty(null)
  }

  const handleAddProperty = () => {
    setShowAddPropertyModal(true)
  }

  const handleSaveProperty = (propertyData) => {
    const newProperty = {
      id: Date.now().toString(),
      name: propertyData.name,
      address: propertyData.address,
      type: propertyData.propertyType,
      description: propertyData.description,
      purchaseDate: propertyData.purchaseDate,
      status: 'New',
      documents: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      isDemo: false
    }
    
    setUserProperties(prev => [...prev, newProperty])
    setShowAddPropertyModal(false)
    
    // Automatically navigate to the new property
    setSelectedProperty(newProperty)
    setCurrentView('property-detail')
  }

  // If user is not logged in, show auth
  if (!user) {
    return <Auth onLogin={handleLogin} />
  }

  // Show property-specific dashboard
  if (currentView === 'property-detail' && selectedProperty) {
    return (
      <PropertySpecificDashboard
        property={selectedProperty}
        onBack={handleBackToProperties}
        isDemo={selectedProperty.isDemo}
      />
    )
  }

  // Show main property dashboard
  return (
    <>
      <PropertyDashboard
        user={user}
        onPropertySelect={handlePropertySelect}
        onAddProperty={handleAddProperty}
        onLogout={handleLogout}
        userProperties={userProperties}
      />
      
      <AddPropertyModal
        isOpen={showAddPropertyModal}
        onClose={() => setShowAddPropertyModal(false)}
        onSave={handleSaveProperty}
      />
    </>
  )
}

export default App

