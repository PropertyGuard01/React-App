import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, FileText, Shield, Calendar, Settings, Upload, Search, Bell, AlertTriangle, Building } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import LiabilityDashboard from '@/components/LiabilityDashboard.jsx'
import ChatBot from '@/components/ChatBot.jsx'
import './App.css'

// Mock data for demonstration
const mockDocuments = [
  { id: 1, name: 'Home Insurance Policy', type: 'Insurance', category: 'General', uploadDate: '2024-01-15', expiryDate: '2025-01-15' },
  { id: 2, name: 'HVAC Warranty', type: 'Warranty', category: 'HVAC', uploadDate: '2023-06-10', expiryDate: '2025-06-10' },
  { id: 3, name: 'Electrical COC', type: 'COC', category: 'Electrical', uploadDate: '2024-03-20', expiryDate: '2029-03-20' },
  { id: 4, name: 'Kitchen Renovation Plans', type: 'Plans', category: 'Kitchen', uploadDate: '2024-02-05', expiryDate: null },
  { id: 5, name: 'Roof Inspection Report', type: 'Report', category: 'Exterior', uploadDate: '2024-05-12', expiryDate: '2025-05-12' }
]

const mockUpcomingExpirations = [
  { name: 'Home Insurance Policy', type: 'Insurance', expiryDate: '2025-01-15', daysLeft: 30 },
  { name: 'HVAC Warranty', type: 'Warranty', expiryDate: '2025-06-10', daysLeft: 165 }
]

const mockLiabilityStats = {
  totalProjects: 3,
  highRiskProjects: 1,
  insuranceGaps: 3,
  complianceIssues: 2
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Property Dashboard</h1>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDocuments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Expirations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUpcomingExpirations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockLiabilityStats.highRiskProjects + mockLiabilityStats.insuranceGaps}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents and Upcoming Expirations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Latest uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDocuments.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.category} • {doc.uploadDate}</p>
                  </div>
                  <Badge variant="outline">{doc.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg border-destructive bg-destructive/5">
                <div>
                  <p className="font-medium text-destructive">Insurance Gap Detected</p>
                  <p className="text-sm text-muted-foreground">ABC Roofing - Public Liability expires in 20 days</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg border-orange-200 bg-orange-50">
                <div>
                  <p className="font-medium text-orange-700">COC Renewal Due</p>
                  <p className="text-sm text-muted-foreground">Electrical COC expires in 45 days</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Documents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.type.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
            <TabsTrigger value="coc">COC</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{doc.name}</CardTitle>
                <Badge variant="outline">{doc.type}</Badge>
              </div>
              <CardDescription>{doc.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Uploaded: {doc.uploadDate}</p>
                {doc.expiryDate && (
                  <p>Expires: {doc.expiryDate}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Warranties() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Warranties & Policies</h1>
        <Button>Add New Warranty</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Warranties</CardTitle>
            <CardDescription>Current warranty coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDocuments.filter(doc => doc.type === 'Warranty').map((warranty) => (
                <div key={warranty.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{warranty.name}</p>
                    <p className="text-sm text-muted-foreground">Category: {warranty.category}</p>
                    <p className="text-sm text-muted-foreground">Expires: {warranty.expiryDate}</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Policies</CardTitle>
            <CardDescription>Current insurance coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDocuments.filter(doc => doc.type === 'Insurance').map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{policy.name}</p>
                    <p className="text-sm text-muted-foreground">Category: {policy.category}</p>
                    <p className="text-sm text-muted-foreground">Expires: {policy.expiryDate}</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'warranties', label: 'Warranties', icon: Shield },
    { id: 'liability', label: 'Liability & Risk', icon: AlertTriangle },
    { id: 'building', label: 'Building Elements', icon: Building },
    { id: 'maintenance', label: 'Maintenance', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-card border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">PropertyManager</h2>
        <p className="text-sm text-muted-foreground">Comprehensive property management</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'documents':
        return <Documents />
      case 'warranties':
        return <Warranties />
      case 'liability':
        return <LiabilityDashboard />
      case 'building':
        return <LiabilityDashboard />
      case 'maintenance':
        return <div className="p-8"><h1 className="text-3xl font-bold">Maintenance (Coming Soon)</h1></div>
      case 'settings':
        return <div className="p-8"><h1 className="text-3xl font-bold">Settings (Coming Soon)</h1></div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
      <ChatBot />
    </div>
  )
}

export default App

