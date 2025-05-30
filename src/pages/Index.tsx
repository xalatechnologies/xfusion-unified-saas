import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Hero } from "@/components/ui/animated-hero";

const Index = () => {
  const features = [
    {
      title: "Work Orders",
      description: "Streamline maintenance requests and execution with intelligent routing",
      icon: "🔧",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Smart Inventory",
      description: "AI-powered inventory management with auto-replenishment",
      icon: "📦",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Preventive Maintenance",
      description: "Automated scheduling with predictive analytics",
      icon: "📅",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Purchase Orders",
      description: "Streamlined procurement with vendor collaboration",
      icon: "💰",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Digital Procedures",
      description: "Interactive checklists with compliance tracking",
      icon: "📋",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Real-time Analytics",
      description: "Advanced insights with customizable dashboards",
      icon: "📊",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  const benefits = [
    {
      title: "Drive Continuous Improvement",
      description: "Leverage data-driven insights to optimize your operations and reduce downtime by up to 40%",
      icon: TrendingUp
    },
    {
      title: "Standardize Operations", 
      description: "Ensure consistent execution across teams with digital procedures and automated workflows",
      icon: Shield
    },
    {
      title: "Accelerate Performance",
      description: "Reduce MTTR and improve asset reliability with intelligent maintenance scheduling",
      icon: Zap
    }
  ];

  const stats = [
    { value: "40%", label: "Reduction in Downtime" },
    { value: "60%", label: "Faster Work Orders" },
    { value: "25%", label: "Cost Savings" },
    { value: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                SupplyMantix
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Now using animated hero */}
      <Hero />

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                In One Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful modules that work together seamlessly to optimize your entire operation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose SupplyMantix?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the future of maintenance and supply chain management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 100V0h100\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"0.5\" opacity=\"0.1\"/%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed">
            Join industry leaders who've already reduced downtime and increased efficiency with SupplyMantix
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-sm">
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-slate-700 pt-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">SupplyMantix</span>
            </div>
            <p className="text-slate-400">
              © 2024 SupplyMantix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
