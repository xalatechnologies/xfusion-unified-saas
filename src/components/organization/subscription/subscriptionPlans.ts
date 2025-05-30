
import { Crown, Zap, Building } from "lucide-react";

export const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "per month",
    icon: Zap,
    maxUsers: 5,
    features: [
      "Up to 5 team members",
      "Up to 100 work orders per month",
      "Basic asset management",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$99",
    period: "per month",
    icon: Crown,
    maxUsers: 25,
    features: [
      "Up to 25 team members",
      "Unlimited work orders",
      "Advanced asset management",
      "Priority support",
      "Custom procedures",
      "Reporting & analytics",
      "API access",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$299",
    period: "per month",
    icon: Building,
    maxUsers: -1, // unlimited
    features: [
      "Unlimited team members",
      "Everything in Professional",
      "Advanced integrations",
      "Dedicated support",
      "Custom branding",
      "SSO authentication",
      "Advanced compliance",
    ],
  },
];
