export interface Product {
  id: string;
  name: string;
  category: 'F&B' | 'IT' | 'Property' | 'Manufacturing' | 'Services' | 'Education' | 'Healthcare' | 'Retail' | 'Finance' | 'Other';
  type: 'Single Course' | 'Package' | 'Consulting';
  basePrice: number;
  yourPrice: number;
  maxDiscount: number;
  defaultCommission: number;
  status: 'Active' | 'Inactive';
  description: string;
  deliveryRequirements: string;
}

export interface SalesAgent {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  leadsAssigned: number;
  dealsClosed: number;
  revenue: number;
  commissionEarned: number;
  conversionRate: number;
  monthlyTarget?: number;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  specializations: string[];
  status: 'Active' | 'Pending' | 'Suspended';
  activeCases: number;
  completedCases: number;
  performanceRating: number;
  completionRate: number;
}

export interface PromoCampaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Ended';
  codes: PromoCode[];
  totalRedemptions: number;
  revenue: number;
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  redemptions: number;
  usageLimit: number;
  applicableProducts: string[];
}

export interface DiscountApproval {
  id: string;
  customerId: string;
  productId: string;
  salesAgentId: string;
  requestedDiscount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  justification: string;
  dealAmount: number;
  requestDate: string;
}

export interface CommissionRecord {
  id: string;
  userId: string;
  amount: number;
  status: 'Earned' | 'Pending' | 'Paid';
  dealId: string;
  date: string;
}

export interface Lead {
  id: string;
  customerName: string;
  source: 'Webinar' | 'Referral' | 'Meta Ads' | 'TikTok' | 'Instagram' | 'Direct' | 'Other';
  status: 'New' | 'Contacted' | 'Qualified' | 'Customer' | 'Lost';
  assignedAgent: string;
  createdDate: string;
}

export interface Deal {
  id: string;
  customerId: string;
  productId: string;
  value: number;
  stage: 'Lead' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  salesAgent: string;
  createdDate: string;
}

export interface DeliveryCase {
  id: string;
  customerId: string;
  customer_name: string;
  productId: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  paymentDate: string;
  payment_date: string;
  expectedDeliveryDate: string;
  expected_delivery_date: string;
  actual_delivery_date?: string;
  assignedPartner?: string;
  partner_id?: string;
  satisfactionRating?: number;
  deal_value: number;
}

export interface Escalation {
  id: string;
  type: 'Discount' | 'Complaint' | 'Special Pricing' | 'Technical';
  customerId: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  requestDate: string;
  requestedBy: string;
}
