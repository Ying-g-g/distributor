/*
  # Initial Sales Territory Management Schema

  ## New Tables
  
  ### Products Table
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `category` (text) - Product category (F&B, IT, Property, etc.)
  - `type` (text) - Single Course, Package, or Consulting
  - `base_price` (numeric) - HQ base price
  - `your_price` (numeric) - Your territory price
  - `max_discount` (numeric) - Maximum discount percentage allowed
  - `default_commission` (numeric) - Default commission percentage
  - `status` (text) - Active or Inactive
  - `description` (text) - Product description
  - `delivery_requirements` (text) - Delivery requirements
  - `brochure_url` (text) - URL to product brochure
  - `terms_url` (text) - URL to terms and conditions
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### Product Price History Table
  - `id` (uuid, primary key)
  - `product_id` (uuid, foreign key to products)
  - `old_price` (numeric) - Previous price
  - `new_price` (numeric) - New price
  - `effective_date` (date) - Date when price change becomes effective
  - `changed_by` (uuid) - User who made the change
  - `created_at` (timestamptz) - Timestamp of change

  ### Sales Agents Table
  - `id` (uuid, primary key)
  - `first_name` (text) - Agent first name
  - `last_name` (text) - Agent last name
  - `email` (text, unique) - Agent email
  - `role` (text) - Sales Agent, Manager, etc.
  - `status` (text) - Active or Inactive
  - `monthly_target` (numeric) - Monthly revenue target
  - `created_at` (timestamptz) - Creation timestamp

  ### Partners Table
  - `id` (uuid, primary key)
  - `name` (text) - Partner company name
  - `email` (text, unique) - Partner email
  - `specializations` (text[]) - Array of specialization tags
  - `territory` (text) - Assigned territory
  - `status` (text) - Active, Pending, or Suspended
  - `default_commission_rate` (numeric) - Default commission percentage
  - `created_at` (timestamptz) - Creation timestamp

  ### Partner Commission Overrides Table
  - `id` (uuid, primary key)
  - `partner_id` (uuid, foreign key to partners)
  - `product_id` (uuid, foreign key to products) - NULL means applies to all
  - `commission_rate` (numeric) - Override commission rate
  - `created_at` (timestamptz) - Creation timestamp

  ### Delivery Cases Table
  - `id` (uuid, primary key)
  - `customer_id` (uuid) - Customer reference
  - `customer_name` (text) - Customer name
  - `product_id` (uuid, foreign key to products)
  - `sales_agent_id` (uuid, foreign key to sales_agents)
  - `partner_id` (uuid, foreign key to partners, nullable)
  - `status` (text) - Pending, In Progress, Completed, Overdue
  - `payment_date` (date) - Date payment received
  - `expected_delivery_date` (date) - Expected delivery date
  - `actual_delivery_date` (date, nullable) - Actual delivery date
  - `satisfaction_rating` (numeric, nullable) - Customer satisfaction rating
  - `deal_value` (numeric) - Value of the deal
  - `created_at` (timestamptz) - Creation timestamp

  ### Promo Campaigns Table
  - `id` (uuid, primary key)
  - `name` (text) - Campaign name
  - `description` (text) - Campaign description
  - `start_date` (date) - Campaign start date
  - `end_date` (date) - Campaign end date
  - `status` (text) - Draft, Active, or Ended
  - `created_at` (timestamptz) - Creation timestamp

  ### Promo Codes Table
  - `id` (uuid, primary key)
  - `campaign_id` (uuid, foreign key to promo_campaigns)
  - `code` (text, unique) - Promo code
  - `discount_type` (text) - Percentage or Fixed
  - `discount_value` (numeric) - Discount amount
  - `usage_limit_per_customer` (integer) - Max uses per customer
  - `total_usage_cap` (integer) - Total usage cap for this code
  - `times_used` (integer) - Number of times redeemed
  - `applicable_products` (uuid[]) - Array of product IDs (empty = all)
  - `customer_segment` (text) - Customer segment tag (NULL = all)
  - `created_at` (timestamptz) - Creation timestamp

  ### Promo Code Redemptions Table
  - `id` (uuid, primary key)
  - `promo_code_id` (uuid, foreign key to promo_codes)
  - `customer_id` (uuid) - Customer who redeemed
  - `customer_name` (text) - Customer name
  - `product_id` (uuid, foreign key to products)
  - `order_value` (numeric) - Value of order
  - `discount_amount` (numeric) - Discount applied
  - `redeemed_at` (timestamptz) - Redemption timestamp

  ### Leads Table
  - `id` (uuid, primary key)
  - `customer_name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text) - Customer phone
  - `source` (text) - Lead source
  - `status` (text) - New, Contacted, Qualified, Customer, Lost
  - `assigned_agent_id` (uuid, foreign key to sales_agents)
  - `created_at` (timestamptz) - Creation timestamp

  ### Deals Table
  - `id` (uuid, primary key)
  - `customer_id` (uuid) - Customer reference
  - `customer_name` (text) - Customer name
  - `product_id` (uuid, foreign key to products)
  - `sales_agent_id` (uuid, foreign key to sales_agents)
  - `value` (numeric) - Deal value
  - `stage` (text) - Lead, Qualification, Proposal, Negotiation, Closed Won, Closed Lost
  - `probability` (numeric) - Probability percentage
  - `expected_close_date` (date) - Expected close date
  - `actual_close_date` (date, nullable) - Actual close date
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their territory data
*/

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  base_price numeric NOT NULL,
  your_price numeric NOT NULL,
  max_discount numeric NOT NULL,
  default_commission numeric NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  description text DEFAULT '',
  delivery_requirements text DEFAULT '',
  brochure_url text,
  terms_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product Price History Table
CREATE TABLE IF NOT EXISTS product_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  old_price numeric NOT NULL,
  new_price numeric NOT NULL,
  effective_date date NOT NULL,
  changed_by uuid,
  created_at timestamptz DEFAULT now()
);

-- Sales Agents Table
CREATE TABLE IF NOT EXISTS sales_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'Sales Agent',
  status text NOT NULL DEFAULT 'Active',
  monthly_target numeric DEFAULT 50000,
  created_at timestamptz DEFAULT now()
);

-- Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  specializations text[] DEFAULT '{}',
  territory text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  default_commission_rate numeric DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Partner Commission Overrides Table
CREATE TABLE IF NOT EXISTS partner_commission_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  commission_rate numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Delivery Cases Table
CREATE TABLE IF NOT EXISTS delivery_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL,
  customer_name text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sales_agent_id uuid NOT NULL REFERENCES sales_agents(id) ON DELETE CASCADE,
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'Pending',
  payment_date date NOT NULL,
  expected_delivery_date date NOT NULL,
  actual_delivery_date date,
  satisfaction_rating numeric,
  deal_value numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Promo Campaigns Table
CREATE TABLE IF NOT EXISTS promo_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL DEFAULT 'Draft',
  created_at timestamptz DEFAULT now()
);

-- Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES promo_campaigns(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL,
  discount_value numeric NOT NULL,
  usage_limit_per_customer integer DEFAULT 1,
  total_usage_cap integer NOT NULL,
  times_used integer DEFAULT 0,
  applicable_products uuid[] DEFAULT '{}',
  customer_segment text,
  created_at timestamptz DEFAULT now()
);

-- Promo Code Redemptions Table
CREATE TABLE IF NOT EXISTS promo_code_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id uuid NOT NULL REFERENCES promo_codes(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL,
  customer_name text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_value numeric NOT NULL,
  discount_amount numeric NOT NULL,
  redeemed_at timestamptz DEFAULT now()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text,
  phone text,
  source text NOT NULL,
  status text NOT NULL DEFAULT 'New',
  assigned_agent_id uuid REFERENCES sales_agents(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Deals Table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL,
  customer_name text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sales_agent_id uuid NOT NULL REFERENCES sales_agents(id) ON DELETE CASCADE,
  value numeric NOT NULL,
  stage text NOT NULL DEFAULT 'Lead',
  probability numeric DEFAULT 20,
  expected_close_date date NOT NULL,
  actual_close_date date,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_commission_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_code_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (full access for now - refine based on roles later)
CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read price history"
  ON product_price_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert price history"
  ON product_price_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read sales agents"
  ON sales_agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage sales agents"
  ON sales_agents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read partners"
  ON partners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage partners"
  ON partners FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read commission overrides"
  ON partner_commission_overrides FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage commission overrides"
  ON partner_commission_overrides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read delivery cases"
  ON delivery_cases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage delivery cases"
  ON delivery_cases FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read promo campaigns"
  ON promo_campaigns FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage promo campaigns"
  ON promo_campaigns FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read promo codes"
  ON promo_codes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage promo codes"
  ON promo_codes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read promo redemptions"
  ON promo_code_redemptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert promo redemptions"
  ON promo_code_redemptions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage leads"
  ON leads FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read deals"
  ON deals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage deals"
  ON deals FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_price_history_product_id ON product_price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_delivery_cases_partner_id ON delivery_cases(partner_id);
CREATE INDEX IF NOT EXISTS idx_delivery_cases_status ON delivery_cases(status);
CREATE INDEX IF NOT EXISTS idx_promo_codes_campaign_id ON promo_codes(campaign_id);
CREATE INDEX IF NOT EXISTS idx_promo_redemptions_code_id ON promo_code_redemptions(promo_code_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_agent ON leads(assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_deals_sales_agent ON deals(sales_agent_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);