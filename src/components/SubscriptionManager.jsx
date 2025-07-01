import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Crown, 
  Shield, 
  Zap, 
  Users, 
  Database, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  Gift,
  TrendingUp,
  Lock,
  Unlock
} from 'lucide-react'

const SubscriptionManager = ({ userId, onUpgrade }) => {
  const [subscription, setSubscription] = useState(null)
  const [plans, setPlans] = useState([])
  const [usage, setUsage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [couponCode, setCouponCode] = useState('')
  const [couponValid, setCouponValid] = useState(null)

  useEffect(() => {
    fetchSubscriptionData()
  }, [userId])

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true)
      
      // Fetch subscription plans
      const plansResponse = await fetch('/api/subscription/plans')
      const plansData = await plansResponse.json()
      if (plansData.success) {
        setPlans(plansData.plans)
      }

      // Fetch user subscription
      const subResponse = await fetch(`/api/subscription/user/${userId}/subscription`)
      const subData = await subResponse.json()
      if (subData.success) {
        setSubscription(subData.subscription)
      }

      // Fetch usage stats
      const usageResponse = await fetch(`/api/subscription/user/${userId}/usage`)
      const usageData = await usageResponse.json()
      if (usageData.success) {
        setUsage(usageData)
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateCoupon = async () => {
    if (!couponCode.trim()) return
    
    try {
      const response = await fetch('/api/subscription/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coupon_code: couponCode,
          user_id: userId,
          plan_code: selectedPlan?.plan_code
        })
      })
      
      const data = await response.json()
      setCouponValid(data.success ? data.coupon : null)
    } catch (error) {
      console.error('Error validating coupon:', error)
      setCouponValid(null)
    }
  }

  const startTrial = async (planCode) => {
    try {
      setUpgradeLoading(true)
      
      const response = await fetch(`/api/subscription/user/${userId}/start-trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_code: planCode })
      })
      
      const data = await response.json()
      if (data.success) {
        setSubscription(data.subscription)
        onUpgrade && onUpgrade(data.subscription)
      }
    } catch (error) {
      console.error('Error starting trial:', error)
    } finally {
      setUpgradeLoading(false)
    }
  }

  const upgradeToPaid = async () => {
    try {
      setUpgradeLoading(true)
      
      // In a real implementation, you would integrate with Stripe here
      const response = await fetch(`/api/subscription/user/${userId}/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_code: selectedPlan.plan_code,
          billing_cycle: billingCycle,
          payment_method_id: 'pm_mock_payment_method', // Mock payment method
          coupon_code: couponValid ? couponCode : null
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setSubscription(data.subscription)
        setSelectedPlan(null)
        onUpgrade && onUpgrade(data.subscription)
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error)
    } finally {
      setUpgradeLoading(false)
    }
  }

  const getUsagePercentage = (used, limit) => {
    if (!limit) return 0
    return Math.min((used / limit) * 100, 100)
  }

  const isFeatureBlocked = (feature) => {
    if (!subscription || !subscription.plan) return true
    
    // Check if subscription is active
    if (!subscription.is_trial_active && !subscription.is_subscription_active) {
      return true
    }
    
    // Check feature availability in plan
    return !subscription.plan[feature]
  }

  const isUsageLimitReached = (usageType) => {
    if (!usage || !usage.plan_limits) return false
    
    const current = usage.current_usage
    const limits = usage.plan_limits
    
    switch (usageType) {
      case 'properties':
        return limits.max_properties && current.properties >= limits.max_properties
      case 'documents':
        return limits.max_documents_per_property && current.documents >= limits.max_documents_per_property
      case 'storage':
        return limits.max_storage_gb && current.storage_gb >= limits.max_storage_gb
      case 'api_calls':
        return limits.max_api_calls && current.api_calls >= limits.max_api_calls
      default:
        return false
    }
  }

  const PaywallModal = ({ feature, onClose, onUpgrade }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <CardTitle>Upgrade Required</CardTitle>
          <CardDescription>
            This feature requires a paid subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Unlock {feature} and all premium features with PropertyGuard Pro
            </p>
            <div className="flex gap-2">
              <Button onClick={onUpgrade} className="flex-1">
                Upgrade Now
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Maybe Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {subscription && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {subscription.subscription_status === 'trial' ? (
                    <Clock className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Crown className="h-5 w-5 text-blue-600" />
                  )}
                  {subscription.plan?.plan_name || 'Current Plan'}
                </CardTitle>
                <CardDescription>
                  {subscription.subscription_status === 'trial' 
                    ? `Trial expires in ${subscription.days_until_expiry} days`
                    : `Next billing: ${subscription.next_billing_date}`
                  }
                </CardDescription>
              </div>
              <Badge variant={subscription.subscription_status === 'active' ? 'default' : 'secondary'}>
                {subscription.subscription_status}
              </Badge>
            </div>
          </CardHeader>
          
          {usage && (
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Properties</span>
                    <span>{usage.current_usage.properties}/{usage.plan_limits.max_properties || '∞'}</span>
                  </div>
                  <Progress value={getUsagePercentage(usage.current_usage.properties, usage.plan_limits.max_properties)} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{usage.current_usage.storage_gb.toFixed(1)}GB/{usage.plan_limits.max_storage_gb || '∞'}GB</span>
                  </div>
                  <Progress value={getUsagePercentage(usage.current_usage.storage_gb, usage.plan_limits.max_storage_gb)} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Documents</span>
                    <span>{usage.current_usage.documents}/{usage.plan_limits.max_documents_per_property || '∞'}</span>
                  </div>
                  <Progress value={getUsagePercentage(usage.current_usage.documents, usage.plan_limits.max_documents_per_property)} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Calls</span>
                    <span>{usage.current_usage.api_calls}/month</span>
                  </div>
                  <Progress value={getUsagePercentage(usage.current_usage.api_calls, 1000)} />
                </div>
              </div>
              
              {/* Usage Warnings */}
              {isUsageLimitReached('storage') && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You're approaching your storage limit. Consider upgrading to avoid service interruption.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Feature Access Status */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Access</CardTitle>
          <CardDescription>Your current plan includes these features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {isFeatureBlocked('policy_analysis') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('policy_analysis') ? 'text-gray-400' : ''}>
                Policy Analysis
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isFeatureBlocked('risk_assessment') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('risk_assessment') ? 'text-gray-400' : ''}>
                Risk Assessment
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isFeatureBlocked('property_transfer') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('property_transfer') ? 'text-gray-400' : ''}>
                Property Transfer
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isFeatureBlocked('api_access') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('api_access') ? 'text-gray-400' : ''}>
                API Access
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isFeatureBlocked('gap_insurance_marketplace') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('gap_insurance_marketplace') ? 'text-gray-400' : ''}>
                Insurance Marketplace
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isFeatureBlocked('priority_support') ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className={isFeatureBlocked('priority_support') ? 'text-gray-400' : ''}>
                Priority Support
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      {(!subscription || subscription.subscription_status === 'trial') && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>Choose the plan that fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className={`cursor-pointer transition-all ${
                  selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
                } ${plan.is_featured ? 'border-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan)}>
                  <CardHeader className="text-center">
                    {plan.is_featured && (
                      <Badge className="mb-2 bg-blue-100 text-blue-800">Most Popular</Badge>
                    )}
                    <CardTitle>{plan.plan_name}</CardTitle>
                    <div className="text-2xl font-bold">
                      ${billingCycle === 'annual' && plan.annual_price 
                        ? plan.annual_price 
                        : plan.monthly_price}
                      <span className="text-sm font-normal text-gray-600">
                        /{billingCycle === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && plan.annual_price && (
                      <div className="text-sm text-green-600">
                        Save ${(plan.monthly_price * 12 - plan.annual_price).toFixed(0)}/year
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {plan.max_properties || 'Unlimited'} Properties
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {plan.max_storage_gb || 'Unlimited'}GB Storage
                      </li>
                      {plan.policy_analysis && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Policy Analysis
                        </li>
                      )}
                      {plan.risk_assessment && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Risk Assessment
                        </li>
                      )}
                      {plan.api_access && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          API Access
                        </li>
                      )}
                      {plan.priority_support && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Priority Support
                        </li>
                      )}
                    </ul>
                    
                    {!subscription && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => startTrial(plan.plan_code)}
                        disabled={upgradeLoading}
                      >
                        Start Free Trial
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center mt-6">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === 'monthly' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === 'annual' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setBillingCycle('annual')}
                >
                  Annual (Save 20%)
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            {selectedPlan && subscription?.subscription_status === 'trial' && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Have a coupon code?</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Button variant="outline" onClick={validateCoupon}>
                    Apply
                  </Button>
                </div>
                {couponValid && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ Coupon applied: {couponValid.discount_value}% off
                  </div>
                )}
              </div>
            )}

            {/* Upgrade Button */}
            {selectedPlan && subscription?.subscription_status === 'trial' && (
              <div className="mt-6 text-center">
                <Button 
                  size="lg" 
                  onClick={upgradeToPaid}
                  disabled={upgradeLoading}
                  className="px-8"
                >
                  {upgradeLoading ? 'Processing...' : `Upgrade to ${selectedPlan.plan_name}`}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Secure payment powered by Stripe
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SubscriptionManager

