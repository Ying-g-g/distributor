import { Product, SalesAgent, Partner, PromoCampaign, Lead, Deal, DeliveryCase, Escalation } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Advanced Excel Training',
    category: 'IT',
    type: 'Single Course',
    basePrice: 2400,
    yourPrice: 2400,
    maxDiscount: 20,
    defaultCommission: 15,
    status: 'Active',
    description: 'Comprehensive Excel training for business professionals',
    deliveryRequirements: 'Online course, 8 weeks, 2 hours per week'
  },
  {
    id: '2',
    name: 'Leadership Development Package',
    category: 'Services',
    type: 'Package',
    basePrice: 5000,
    yourPrice: 4900,
    maxDiscount: 15,
    defaultCommission: 12,
    status: 'Active',
    description: 'Complete leadership skills development program',
    deliveryRequirements: 'In-person + online, 12 weeks'
  },
  {
    id: '3',
    name: 'Property Investment Consulting',
    category: 'Property',
    type: 'Consulting',
    basePrice: 3500,
    yourPrice: 3500,
    maxDiscount: 10,
    defaultCommission: 18,
    status: 'Active',
    description: 'One-on-one property investment consultation',
    deliveryRequirements: '1-on-1 consultation, flexible scheduling'
  },
  {
    id: '4',
    name: 'Digital Marketing Masterclass',
    category: 'IT',
    type: 'Package',
    basePrice: 2800,
    yourPrice: 2650,
    maxDiscount: 25,
    defaultCommission: 14,
    status: 'Active',
    description: 'Complete digital marketing course',
    deliveryRequirements: 'Online, 6 weeks, self-paced'
  },
  {
    id: '5',
    name: 'Healthcare Management System',
    category: 'Healthcare',
    type: 'Package',
    basePrice: 8000,
    yourPrice: 8000,
    maxDiscount: 12,
    defaultCommission: 10,
    status: 'Active',
    description: 'Cloud-based healthcare management platform',
    deliveryRequirements: 'Deployment + training, 4 weeks'
  },
  {
    id: '6',
    name: 'F&B Operations Course',
    category: 'F&B',
    type: 'Single Course',
    basePrice: 1500,
    yourPrice: 1500,
    maxDiscount: 30,
    defaultCommission: 16,
    status: 'Active',
    description: 'Food and beverage operations fundamentals',
    deliveryRequirements: 'Online, 4 weeks'
  },
  {
    id: '7',
    name: 'Manufacturing Process Optimization',
    category: 'Manufacturing',
    type: 'Package',
    basePrice: 6500,
    yourPrice: 6200,
    maxDiscount: 18,
    defaultCommission: 13,
    status: 'Active',
    description: 'Lean manufacturing and process improvement',
    deliveryRequirements: 'Onsite consultation + training, 8 weeks'
  },
  {
    id: '8',
    name: 'Financial Planning Essentials',
    category: 'Finance',
    type: 'Single Course',
    basePrice: 3200,
    yourPrice: 3000,
    maxDiscount: 22,
    defaultCommission: 17,
    status: 'Active',
    description: 'Personal and business financial planning',
    deliveryRequirements: 'Hybrid, 6 weeks, interactive sessions'
  },
  {
    id: '9',
    name: 'Retail Management Certification',
    category: 'Retail',
    type: 'Package',
    basePrice: 2900,
    yourPrice: 2750,
    maxDiscount: 24,
    defaultCommission: 15,
    status: 'Active',
    description: 'Complete retail management training program',
    deliveryRequirements: 'Online + hands-on, 10 weeks'
  },
  {
    id: '10',
    name: 'Educational Leadership Master',
    category: 'Education',
    type: 'Package',
    basePrice: 7200,
    yourPrice: 7000,
    maxDiscount: 14,
    defaultCommission: 11,
    status: 'Active',
    description: 'Advanced educational leadership program',
    deliveryRequirements: 'Blended learning, 16 weeks'
  },
  {
    id: '11',
    name: 'Cloud Infrastructure Bootcamp',
    category: 'IT',
    type: 'Package',
    basePrice: 4500,
    yourPrice: 4200,
    maxDiscount: 19,
    defaultCommission: 16,
    status: 'Active',
    description: 'AWS and cloud architecture training',
    deliveryRequirements: 'Online intensive, 4 weeks'
  },
  {
    id: '12',
    name: 'Medical Device Compliance',
    category: 'Healthcare',
    type: 'Consulting',
    basePrice: 9500,
    yourPrice: 9200,
    maxDiscount: 8,
    defaultCommission: 12,
    status: 'Active',
    description: 'Regulatory compliance for medical devices',
    deliveryRequirements: 'Expert consultation, 12 weeks'
  },
  {
    id: '13',
    name: 'Customer Service Excellence',
    category: 'Services',
    type: 'Single Course',
    basePrice: 1800,
    yourPrice: 1700,
    maxDiscount: 28,
    defaultCommission: 18,
    status: 'Active',
    description: 'Enhance customer service skills',
    deliveryRequirements: 'Online, 3 weeks, live sessions'
  },
  {
    id: '14',
    name: 'Real Estate Valuation Course',
    category: 'Property',
    type: 'Single Course',
    basePrice: 4000,
    yourPrice: 3800,
    maxDiscount: 12,
    defaultCommission: 19,
    status: 'Active',
    description: 'Professional real estate valuation methods',
    deliveryRequirements: 'Hybrid, 8 weeks'
  },
  {
    id: '15',
    name: 'Supply Chain Management',
    category: 'Manufacturing',
    type: 'Consulting',
    basePrice: 7800,
    yourPrice: 7500,
    maxDiscount: 15,
    defaultCommission: 14,
    status: 'Active',
    description: 'End-to-end supply chain optimization',
    deliveryRequirements: 'On-site + consulting, 10 weeks'
  }
];

export const mockSalesAgents: SalesAgent[] = [
  {
    id: 's1',
    name: 'Ahmad Hassan',
    email: 'ahmad@example.com',
    status: 'Active',
    leadsAssigned: 45,
    dealsClosed: 12,
    revenue: 48000,
    commissionEarned: 7200,
    conversionRate: 26.7,
    monthlyTarget: 50000
  },
  {
    id: 's2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    status: 'Active',
    leadsAssigned: 38,
    dealsClosed: 15,
    revenue: 62000,
    commissionEarned: 8900,
    conversionRate: 39.5,
    monthlyTarget: 50000
  },
  {
    id: 's3',
    name: 'Raj Patel',
    email: 'raj@example.com',
    status: 'Active',
    leadsAssigned: 52,
    dealsClosed: 8,
    revenue: 35000,
    commissionEarned: 4200,
    conversionRate: 15.4,
    monthlyTarget: 50000
  },
  {
    id: 's4',
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    status: 'Active',
    leadsAssigned: 28,
    dealsClosed: 10,
    revenue: 42000,
    commissionEarned: 6300,
    conversionRate: 35.7,
    monthlyTarget: 50000
  },
  {
    id: 's5',
    name: 'Michael Tan',
    email: 'michael@example.com',
    status: 'Inactive',
    leadsAssigned: 0,
    dealsClosed: 5,
    revenue: 18000,
    commissionEarned: 2700,
    conversionRate: 18.5,
    monthlyTarget: 50000
  },
  {
    id: 's6',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    status: 'Active',
    leadsAssigned: 41,
    dealsClosed: 14,
    revenue: 58500,
    commissionEarned: 8775,
    conversionRate: 34.1,
    monthlyTarget: 55000
  },
  {
    id: 's7',
    name: 'David Martinez',
    email: 'david@example.com',
    status: 'Active',
    leadsAssigned: 35,
    dealsClosed: 11,
    revenue: 45300,
    commissionEarned: 6795,
    conversionRate: 31.4,
    monthlyTarget: 50000
  },
  {
    id: 's8',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    status: 'Active',
    leadsAssigned: 29,
    dealsClosed: 18,
    revenue: 72000,
    commissionEarned: 10800,
    conversionRate: 62.1,
    monthlyTarget: 60000
  },
  {
    id: 's9',
    name: 'James Wilson',
    email: 'james@example.com',
    status: 'Active',
    leadsAssigned: 48,
    dealsClosed: 6,
    revenue: 28000,
    commissionEarned: 4200,
    conversionRate: 12.5,
    monthlyTarget: 50000
  },
  {
    id: 's10',
    name: 'Nina Khalid',
    email: 'nina@example.com',
    status: 'Active',
    leadsAssigned: 33,
    dealsClosed: 13,
    revenue: 54500,
    commissionEarned: 8175,
    conversionRate: 39.4,
    monthlyTarget: 52000
  }
];

export const mockPartners: Partner[] = [
  {
    id: 'p1',
    name: 'Tech Training Hub',
    email: 'contact@techtraining.com',
    specializations: ['IT', 'Healthcare'],
    status: 'Active',
    activeCases: 8,
    completedCases: 24,
    performanceRating: 4.8,
    completionRate: 96
  },
  {
    id: 'p2',
    name: 'Business Consultants Malaysia',
    email: 'info@bcm.com',
    specializations: ['Services', 'Finance'],
    status: 'Active',
    activeCases: 5,
    completedCases: 18,
    performanceRating: 4.5,
    completionRate: 90
  },
  {
    id: 'p3',
    name: 'Property Expert Group',
    email: 'hello@propertyexperts.com',
    specializations: ['Property', 'Finance'],
    status: 'Active',
    activeCases: 3,
    completedCases: 12,
    performanceRating: 4.9,
    completionRate: 100
  },
  {
    id: 'p4',
    name: 'F&B Solutions Ltd',
    email: 'support@fbsolutions.com',
    specializations: ['F&B', 'Services'],
    status: 'Pending',
    activeCases: 0,
    completedCases: 0,
    performanceRating: 0,
    completionRate: 0
  },
  {
    id: 'p5',
    name: 'Manufacturing Excellence Partners',
    email: 'info@manufacturingex.com',
    specializations: ['Manufacturing', 'IT'],
    status: 'Active',
    activeCases: 6,
    completedCases: 20,
    performanceRating: 4.7,
    completionRate: 95
  },
  {
    id: 'p6',
    name: 'Healthcare Solutions Provider',
    email: 'support@healthcarepro.com',
    specializations: ['Healthcare', 'Education'],
    status: 'Active',
    activeCases: 4,
    completedCases: 15,
    performanceRating: 4.6,
    completionRate: 93
  },
  {
    id: 'p7',
    name: 'Retail Academy Network',
    email: 'hello@retailacademy.com',
    specializations: ['Retail', 'Services', 'Finance'],
    status: 'Active',
    activeCases: 2,
    completedCases: 8,
    performanceRating: 4.3,
    completionRate: 87
  },
  {
    id: 'p8',
    name: 'Education & Training Institute',
    email: 'contact@edutraining.com',
    specializations: ['Education', 'IT'],
    status: 'Active',
    activeCases: 7,
    completedCases: 22,
    performanceRating: 4.8,
    completionRate: 97
  },
  {
    id: 'p9',
    name: 'Global Consulting Group',
    email: 'info@globalconsulting.com',
    specializations: ['Services', 'Manufacturing'],
    status: 'Suspended',
    activeCases: 0,
    completedCases: 10,
    performanceRating: 3.8,
    completionRate: 78
  },
  {
    id: 'p10',
    name: 'Premium Finance Advisors',
    email: 'contact@premiumfinance.com',
    specializations: ['Finance', 'Property'],
    status: 'Active',
    activeCases: 4,
    completedCases: 16,
    performanceRating: 4.9,
    completionRate: 98
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'l1',
    customerName: 'ABC Manufacturing',
    source: 'Webinar',
    status: 'Qualified',
    assignedAgent: 's1',
    createdDate: '2024-02-10'
  },
  {
    id: 'l2',
    customerName: 'XYZ Retail',
    source: 'Referral',
    status: 'Contacted',
    assignedAgent: 's2',
    createdDate: '2024-02-15'
  },
  {
    id: 'l3',
    customerName: 'Tech Startup Inc',
    source: 'Meta Ads',
    status: 'Customer',
    assignedAgent: 's2',
    createdDate: '2024-01-20'
  },
  {
    id: 'l4',
    customerName: 'Global Corp',
    source: 'Direct',
    status: 'New',
    assignedAgent: 's3',
    createdDate: '2024-02-18'
  },
  {
    id: 'l5',
    customerName: 'Finance Plus',
    source: 'Webinar',
    status: 'Qualified',
    assignedAgent: 's1',
    createdDate: '2024-02-12'
  },
  {
    id: 'l6',
    customerName: 'Healthcare Solutions',
    source: 'Referral',
    status: 'Lost',
    assignedAgent: 's4',
    createdDate: '2024-01-15'
  },
  {
    id: 'l7',
    customerName: 'Education Plus',
    source: 'Instagram',
    status: 'New',
    assignedAgent: 's2',
    createdDate: '2024-02-19'
  },
  {
    id: 'l8',
    customerName: 'Restaurant Group',
    source: 'TikTok',
    status: 'Contacted',
    assignedAgent: 's1',
    createdDate: '2024-02-14'
  },
  {
    id: 'l9',
    customerName: 'Luxury Hotels Ltd',
    source: 'Webinar',
    status: 'New',
    assignedAgent: 's6',
    createdDate: '2024-02-20'
  },
  {
    id: 'l10',
    customerName: 'Smart City Projects',
    source: 'Meta Ads',
    status: 'Contacted',
    assignedAgent: 's3',
    createdDate: '2024-02-16'
  },
  {
    id: 'l11',
    customerName: 'Medical Research Corp',
    source: 'Referral',
    status: 'Qualified',
    assignedAgent: 's8',
    createdDate: '2024-02-11'
  },
  {
    id: 'l12',
    customerName: 'Fashion Retail Group',
    source: 'TikTok',
    status: 'Customer',
    assignedAgent: 's4',
    createdDate: '2024-02-05'
  },
  {
    id: 'l13',
    customerName: 'Industrial Automation',
    source: 'Direct',
    status: 'Qualified',
    assignedAgent: 's9',
    createdDate: '2024-02-13'
  },
  {
    id: 'l14',
    customerName: 'Organic Food Distributor',
    source: 'Instagram',
    status: 'Contacted',
    assignedAgent: 's7',
    createdDate: '2024-02-17'
  },
  {
    id: 'l15',
    customerName: 'Property Development Co',
    source: 'Webinar',
    status: 'New',
    assignedAgent: 's1',
    createdDate: '2024-02-21'
  },
  {
    id: 'l16',
    customerName: 'Software Solutions Inc',
    source: 'Referral',
    status: 'Lost',
    assignedAgent: 's5',
    createdDate: '2024-02-02'
  },
  {
    id: 'l17',
    customerName: 'Banking & Finance Ltd',
    source: 'Meta Ads',
    status: 'Qualified',
    assignedAgent: 's10',
    createdDate: '2024-02-08'
  },
  {
    id: 'l18',
    customerName: 'Manufacturing Giants',
    source: 'Direct',
    status: 'Contacted',
    assignedAgent: 's2',
    createdDate: '2024-02-19'
  },
  {
    id: 'l19',
    customerName: 'Healthcare Network',
    source: 'Webinar',
    status: 'Customer',
    assignedAgent: 's8',
    createdDate: '2024-01-25'
  },
  {
    id: 'l20',
    customerName: 'Retail Excellence',
    source: 'Instagram',
    status: 'New',
    assignedAgent: 's4',
    createdDate: '2024-02-20'
  },
  {
    id: 'l21',
    customerName: 'Education Pioneers',
    source: 'TikTok',
    status: 'Qualified',
    assignedAgent: 's6',
    createdDate: '2024-02-09'
  },
  {
    id: 'l22',
    customerName: 'Financial Services Group',
    source: 'Referral',
    status: 'Contacted',
    assignedAgent: 's7',
    createdDate: '2024-02-14'
  },
  {
    id: 'l23',
    customerName: 'Tech Innovation Labs',
    source: 'Direct',
    status: 'Lost',
    assignedAgent: 's3',
    createdDate: '2024-02-01'
  },
  {
    id: 'l24',
    customerName: 'Green Energy Solutions',
    source: 'Webinar',
    status: 'New',
    assignedAgent: 's10',
    createdDate: '2024-02-18'
  }
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    customerId: 'c1',
    productId: '1',
    value: 2400,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-02-01',
    salesAgent: 's2',
    createdDate: '2024-01-15'
  },
  {
    id: 'd2',
    customerId: 'c2',
    productId: '2',
    value: 4900,
    stage: 'Negotiation',
    probability: 75,
    expectedCloseDate: '2024-02-25',
    salesAgent: 's1',
    createdDate: '2024-02-01'
  },
  {
    id: 'd3',
    customerId: 'c3',
    productId: '3',
    value: 3500,
    stage: 'Proposal',
    probability: 60,
    expectedCloseDate: '2024-03-05',
    salesAgent: 's2',
    createdDate: '2024-01-25'
  },
  {
    id: 'd4',
    customerId: 'c4',
    productId: '4',
    value: 2650,
    stage: 'Qualification',
    probability: 40,
    expectedCloseDate: '2024-03-15',
    salesAgent: 's3',
    createdDate: '2024-02-05'
  },
  {
    id: 'd5',
    customerId: 'c5',
    productId: '5',
    value: 8000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-01-28',
    salesAgent: 's2',
    createdDate: '2024-01-10'
  },
  {
    id: 'd6',
    customerId: 'c6',
    productId: '7',
    value: 6200,
    stage: 'Lead',
    probability: 20,
    expectedCloseDate: '2024-03-20',
    salesAgent: 's6',
    createdDate: '2024-02-20'
  },
  {
    id: 'd7',
    customerId: 'c7',
    productId: '8',
    value: 3000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-02-05',
    salesAgent: 's8',
    createdDate: '2024-01-20'
  },
  {
    id: 'd8',
    customerId: 'c8',
    productId: '9',
    value: 2750,
    stage: 'Proposal',
    probability: 65,
    expectedCloseDate: '2024-02-28',
    salesAgent: 's4',
    createdDate: '2024-02-08'
  },
  {
    id: 'd9',
    customerId: 'c9',
    productId: '10',
    value: 7000,
    stage: 'Negotiation',
    probability: 80,
    expectedCloseDate: '2024-03-10',
    salesAgent: 's10',
    createdDate: '2024-02-10'
  },
  {
    id: 'd10',
    customerId: 'c10',
    productId: '11',
    value: 4200,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-01-31',
    salesAgent: 's1',
    createdDate: '2024-01-18'
  },
  {
    id: 'd11',
    customerId: 'c11',
    productId: '12',
    value: 9200,
    stage: 'Qualification',
    probability: 45,
    expectedCloseDate: '2024-03-25',
    salesAgent: 's7',
    createdDate: '2024-02-15'
  },
  {
    id: 'd12',
    customerId: 'c12',
    productId: '13',
    value: 1700,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-02-10',
    salesAgent: 's9',
    createdDate: '2024-02-02'
  },
  {
    id: 'd13',
    customerId: 'c13',
    productId: '14',
    value: 3800,
    stage: 'Proposal',
    probability: 70,
    expectedCloseDate: '2024-02-22',
    salesAgent: 's3',
    createdDate: '2024-02-05'
  },
  {
    id: 'd14',
    customerId: 'c14',
    productId: '15',
    value: 7500,
    stage: 'Negotiation',
    probability: 82,
    expectedCloseDate: '2024-03-08',
    salesAgent: 's6',
    createdDate: '2024-02-12'
  },
  {
    id: 'd15',
    customerId: 'c15',
    productId: '2',
    value: 4900,
    stage: 'Closed Lost',
    probability: 0,
    expectedCloseDate: '2024-02-08',
    salesAgent: 's4',
    createdDate: '2024-01-28'
  }
];

export const mockDeliveryCases: DeliveryCase[] = [
  {
    id: 'del1',
    customerId: 'c1',
    customer_name: 'ABC Manufacturing',
    productId: '1',
    status: 'Completed',
    paymentDate: '2024-02-01',
    payment_date: '2024-02-01',
    expectedDeliveryDate: '2024-02-15',
    expected_delivery_date: '2024-02-15',
    actual_delivery_date: '2024-02-14',
    assignedPartner: 'p1',
    partner_id: 'p1',
    satisfactionRating: 5,
    deal_value: 2400
  },
  {
    id: 'del2',
    customerId: 'c3',
    productId: '3',
    status: 'In Progress',
    paymentDate: '2024-02-10',
    expectedDeliveryDate: '2024-03-05',
    assignedPartner: 'p3'
  },
  {
    id: 'del3',
    customerId: 'c5',
    productId: '5',
    status: 'Completed',
    paymentDate: '2024-01-28',
    expectedDeliveryDate: '2024-02-15',
    assignedPartner: 'p1',
    satisfactionRating: 4
  },
  {
    id: 'del4',
    customerId: 'c7',
    productId: '8',
    status: 'Completed',
    paymentDate: '2024-02-05',
    expectedDeliveryDate: '2024-02-18',
    assignedPartner: 'p2',
    satisfactionRating: 4.5
  },
  {
    id: 'del5',
    customerId: 'c10',
    productId: '11',
    status: 'In Progress',
    paymentDate: '2024-01-31',
    expectedDeliveryDate: '2024-02-20',
    assignedPartner: 'p1'
  },
  {
    id: 'del6',
    customerId: 'c12',
    productId: '13',
    status: 'Pending',
    paymentDate: '2024-02-10',
    expectedDeliveryDate: '2024-02-25',
    assignedPartner: 'p5'
  },
  {
    id: 'del7',
    customerId: 'c4',
    productId: '4',
    status: 'Overdue',
    paymentDate: '2024-01-15',
    expectedDeliveryDate: '2024-02-10',
    assignedPartner: 'p6'
  },
  {
    id: 'del8',
    customerId: 'c9',
    productId: '10',
    status: 'In Progress',
    paymentDate: '2024-02-08',
    expectedDeliveryDate: '2024-03-10',
    assignedPartner: 'p8'
  },
  {
    id: 'del9',
    customerId: 'c14',
    productId: '15',
    status: 'Completed',
    paymentDate: '2024-02-01',
    expectedDeliveryDate: '2024-02-17',
    assignedPartner: 'p5',
    satisfactionRating: 5
  },
  {
    id: 'del10',
    customerId: 'c11',
    productId: '12',
    status: 'Pending',
    paymentDate: '2024-02-15',
    expectedDeliveryDate: '2024-03-20',
    assignedPartner: 'p6'
  }
];

export const mockEscalations: Escalation[] = [
  {
    id: 'e1',
    type: 'Discount',
    customerId: 'c2',
    description: 'Request 30% discount for bulk purchase',
    priority: 'High',
    status: 'Open',
    requestDate: '2024-02-18',
    requestedBy: 's1'
  },
  {
    id: 'e2',
    type: 'Complaint',
    customerId: 'c1',
    description: 'Delivery delayed by 2 days',
    priority: 'Medium',
    status: 'In Progress',
    requestDate: '2024-02-15',
    requestedBy: 'system'
  },
  {
    id: 'e3',
    type: 'Special Pricing',
    customerId: 'c6',
    description: 'Request for volume discount on manufacturing package',
    priority: 'High',
    status: 'Open',
    requestDate: '2024-02-20',
    requestedBy: 's6'
  },
  {
    id: 'e4',
    type: 'Technical',
    customerId: 'c5',
    description: 'Healthcare system integration issues',
    priority: 'High',
    status: 'In Progress',
    requestDate: '2024-02-17',
    requestedBy: 'system'
  },
  {
    id: 'e5',
    type: 'Complaint',
    customerId: 'c4',
    description: 'Poor course content quality',
    priority: 'Medium',
    status: 'Resolved',
    requestDate: '2024-02-10',
    requestedBy: 'system'
  },
  {
    id: 'e6',
    type: 'Special Pricing',
    customerId: 'c9',
    description: 'Multi-year contract discount negotiation',
    priority: 'Medium',
    status: 'Open',
    requestDate: '2024-02-19',
    requestedBy: 's10'
  },
  {
    id: 'e7',
    type: 'Discount',
    customerId: 'c12',
    description: 'Request 25% discount for early renewal',
    priority: 'Low',
    status: 'Open',
    requestDate: '2024-02-21',
    requestedBy: 's9'
  },
  {
    id: 'e8',
    type: 'Complaint',
    customerId: 'c8',
    description: 'Trainer scheduling conflict',
    priority: 'Low',
    status: 'Resolved',
    requestDate: '2024-02-08',
    requestedBy: 'system'
  },
  {
    id: 'e9',
    type: 'Technical',
    customerId: 'c14',
    description: 'Supply chain management system technical support',
    priority: 'High',
    status: 'Open',
    requestDate: '2024-02-16',
    requestedBy: 's6'
  },
  {
    id: 'e10',
    type: 'Special Pricing',
    customerId: 'c3',
    description: 'Partnership discount for property consulting',
    priority: 'Medium',
    status: 'In Progress',
    requestDate: '2024-02-12',
    requestedBy: 's2'
  }
];
