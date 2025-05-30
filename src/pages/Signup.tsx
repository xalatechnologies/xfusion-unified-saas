
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

      {/* Left side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-md text-center text-white z-10">
          <div className="w-24 h-24 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-6">Transform Your Business</h3>
          <p className="text-emerald-100 text-lg leading-relaxed mb-8">
            Get real-time insights, automate workflows, and improve operational 
            efficiency with our comprehensive AI-powered platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-emerald-100">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-100">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-100">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                SupplyMantix
              </span>
            </Link>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Get started today
            </h2>
            <p className="mt-3 text-gray-600 text-lg">Create your account and start your free trial</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center font-bold text-gray-900">Create Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">First name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-700 font-medium">Company name</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Corporation"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
                  <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group">
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50 font-medium">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.5 12.5c0-6.9-5.6-12.5-12.5-12.5S-1.5 5.6-1.5 12.5 4.1 25 11 25c3.1 0 5.9-1.1 8.1-3l-3.3-2.5c-1.3 1.1-3 1.8-4.8 1.8-3.9 0-7.1-3.2-7.1-7.1s3.2-7.1 7.1-7.1c2 0 3.8.8 5.1 2.1l3.3-3.3C17.4 2.7 14.4 1.5 11 1.5 4.9 1.5 0 6.4 0 12.5S4.9 23.5 11 23.5c6.1 0 11-4.9 11-11z"/>
                    </svg>
                    Microsoft
                  </Button>
                </div>
              </div>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
