export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  icon: React.ElementType;
  maxUsers: number;
  features: string[];
  popular?: boolean;
}

export interface Subscription {
  id: string;
  plan_id: string;
  plan_name: string;
  price_monthly: number;
  price_yearly: number;
  max_users: number;
  features: string[];
  status?: string;
  billing_cycle?: string;
  current_period_start?: string;
  current_period_end?: string;
  created_at?: string;
  trial_end?: string;
} 