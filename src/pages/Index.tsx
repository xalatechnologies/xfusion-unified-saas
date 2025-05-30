
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Work Orders",
      description: "Streamline maintenance requests and execution",
      icon: "🔧"
    },
    {
      title: "Inventory",
      description: "Smart inventory management and tracking",
      icon: "📦"
    },
    {
      title: "Preventive Maintenance",
      description: "Automated scheduling and procedures",
      icon: "📅"
    },
    {
      title: "Purchase Orders",
      description: "Procurement workflow automation",
      icon: "💰"
    },
    {
      title: "Procedures",
      description: "Digital checklists and SOPs",
      icon: "📋"
    },
    {
      title: "Analytics",
      description: "Real-time insights and reporting",
      icon: "📊"
    }
  ];

  const benefits = [
    "Drive Continuous Improvement",
    "Task Standardization", 
    "Audit Compliance"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">X</div>
              <span className="text-xl font-semibold text-gray-900">SupplyMantix</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Unify Your Maintenance & <br />
            <span className="text-blue-600">Supply Chain Operations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Replace siloed legacy tools with a modern, cloud-native platform that streamlines 
            work orders, automates maintenance, and optimizes your entire supply chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600">
              Powerful modules that work together seamlessly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Incorporate Procedures into Work Orders?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit}
                </h3>
                <p className="text-gray-600">
                  {index === 0 && "Standardized processes enable continuous improvement and operational excellence"}
                  {index === 1 && "Ensure consistent execution across teams with digital procedures"}
                  {index === 2 && "Maintain compliance with automated documentation and audit trails"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of companies already using SupplyMantix to streamline their maintenance and supply chain operations.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-400">X</div>
              <span className="text-xl font-semibold">SupplyMantix</span>
            </div>
            <p className="text-gray-400">
              © 2024 SupplyMantix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
