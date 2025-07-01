import { useState, useEffect } from 'react'
import { AlertTriangle, Shield, Clock, CheckCircle, XCircle, Users, FileText, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: 'Roof Replacement',
    type: 'Roofing',
    status: 'Completed',
    riskLevel: 'Medium',
    stakeholders: 5,
    complianceItems: 3,
    insuranceGaps: 1
  },
  {
    id: 2,
    name: 'Kitchen Renovation',
    type: 'Interior',
    status: 'In Progress',
    riskLevel: 'High',
    stakeholders: 8,
    complianceItems: 5,
    insuranceGaps: 2
  },
  {
    id: 3,
    name: 'Exterior Painting',
    type: 'Painting',
    status: 'Planning',
    riskLevel: 'Low',
    stakeholders: 2,
    complianceItems: 1,
    insuranceGaps: 0
  }
]

const mockLiabilityOverview = {
  totalProjects: 3,
  highRiskProjects: 1,
  insuranceGaps: 3,
  complianceIssues: 2,
  expiringSoon: 4
}

const mockExpiringItems = [
  {
    type: 'compliance',
    name: 'Electrical COC - Kitchen',
    category: 'Electrical',
    expiryDate: '2025-02-15',
    daysLeft: 45,
    severity: 'medium',
    projectId: 2
  },
  {
    type: 'insurance',
    name: 'Public Liability - ABC Roofing',
    category: 'Public Liability',
    expiryDate: '2025-01-30',
    daysLeft: 30,
    severity: 'high',
    projectId: 1
  },
  {
    type: 'compliance',
    name: 'Paint Warranty - Exterior',
    category: 'Warranty',
    expiryDate: '2025-03-10',
    daysLeft: 68,
    severity: 'medium',
    projectId: 3
  },
  {
    type: 'insurance',
    name: 'Product Liability - XYZ Paints',
    category: 'Product Liability',
    expiryDate: '2025-01-20',
    daysLeft: 20,
    severity: 'high',
    projectId: 3
  }
]

const mockBuildingElements = [
  {
    id: 1,
    name: 'Roof Structure',
    category: 'Structural',
    lastInspection: '2024-03-15',
    nextInspection: '2025-03-15',
    warrantyExpiry: '2029-03-15',
    maintenanceRequired: false,
    complianceStatus: 'Compliant',
    riskLevel: 'Low'
  },
  {
    id: 2,
    name: 'Exterior Paint',
    category: 'Finishes',
    lastInspection: '2024-06-01',
    nextInspection: '2025-06-01',
    warrantyExpiry: '2029-06-01',
    maintenanceRequired: true,
    complianceStatus: 'Attention Required',
    riskLevel: 'Medium'
  },
  {
    id: 3,
    name: 'Electrical System',
    category: 'Electrical',
    lastInspection: '2024-01-10',
    nextInspection: '2025-01-10',
    warrantyExpiry: '2026-01-10',
    maintenanceRequired: false,
    complianceStatus: 'Expiring Soon',
    riskLevel: 'High'
  },
  {
    id: 4,
    name: 'HVAC System',
    category: 'HVAC',
    lastInspection: '2024-05-20',
    nextInspection: '2025-05-20',
    warrantyExpiry: '2027-05-20',
    maintenanceRequired: true,
    complianceStatus: 'Compliant',
    riskLevel: 'Low'
  }
]

function LiabilityOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLiabilityOverview.totalProjects}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockLiabilityOverview.highRiskProjects}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Gaps</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{mockLiabilityOverview.insuranceGaps}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockLiabilityOverview.complianceIssues}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{mockLiabilityOverview.expiringSoon}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Risk Overview</CardTitle>
            <CardDescription>Current projects and their risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.type} • {project.stakeholders} stakeholders • {project.complianceItems} compliance items
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.riskLevel === 'High' ? 'destructive' : project.riskLevel === 'Medium' ? 'secondary' : 'outline'}>
                      {project.riskLevel} Risk
                    </Badge>
                    {project.insuranceGaps > 0 && (
                      <Badge variant="outline" className="text-orange-500 border-orange-500">
                        {project.insuranceGaps} Gap{project.insuranceGaps > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockExpiringItems.filter(item => item.severity === 'high').map((item, index) => (
                <Alert key={index} className="border-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{item.name}</AlertTitle>
                  <AlertDescription>
                    Expires in {item.daysLeft} days ({item.expiryDate})
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BuildingElements() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'text-green-600'
      case 'Attention Required': return 'text-orange-600'
      case 'Expiring Soon': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBadgeVariant = (risk) => {
    switch (risk) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Building Elements</h2>
          <p className="text-muted-foreground">Track warranties, maintenance, and compliance for all building components</p>
        </div>
        <Button>Add Building Element</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBuildingElements.map((element) => (
          <Card key={element.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{element.name}</CardTitle>
                <Badge variant={getRiskBadgeVariant(element.riskLevel)}>
                  {element.riskLevel}
                </Badge>
              </div>
              <CardDescription>{element.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Compliance Status:</span>
                <span className={`font-medium ${getStatusColor(element.complianceStatus)}`}>
                  {element.complianceStatus}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Last Inspection:</span>
                  <span>{element.lastInspection}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Inspection:</span>
                  <span>{element.nextInspection}</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty Expires:</span>
                  <span>{element.warrantyExpiry}</span>
                </div>
              </div>

              {element.maintenanceRequired && (
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertDescription>
                    Maintenance required to maintain warranty
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ComplianceTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Tracking</h2>
          <p className="text-muted-foreground">Monitor all certificates, inspections, and regulatory requirements</p>
        </div>
        <Button>Add Compliance Item</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expiring Items</CardTitle>
            <CardDescription>Certificates and warranties expiring soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockExpiringItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • Expires: {item.expiryDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.severity === 'high' ? 'destructive' : 'secondary'}>
                      {item.daysLeft} days
                    </Badge>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Required maintenance to keep warranties valid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBuildingElements.filter(el => el.maintenanceRequired).map((element) => (
                <div key={element.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{element.name} Maintenance</p>
                    <p className="text-sm text-muted-foreground">
                      {element.category} • Due: {element.nextInspection}
                    </p>
                  </div>
                  <Badge variant="secondary">Required</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LiabilityDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Liability & Compliance Management</h1>
        <Button>Generate Risk Report</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="elements">Building Elements</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <LiabilityOverview />
        </TabsContent>
        
        <TabsContent value="elements">
          <BuildingElements />
        </TabsContent>
        
        <TabsContent value="compliance">
          <ComplianceTracking />
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Project Management</h3>
            <p className="text-muted-foreground">Detailed project tracking coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

