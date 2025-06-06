
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock, User, ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', fullName: '' });
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else {
          toast.error(error.message || 'Login failed');
        }
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please try logging in instead.');
        } else {
          toast.error(error.message || 'Signup failed');
        }
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/khaata.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Khaata Chakki
                </h1>
                <p className="text-slate-600 font-semibold">Premium Flour Mill Management</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800">
                Transform Your Flour Mill Business
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Experience the future of flour mill management with our comprehensive platform designed for modern businesses.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Real-time Tracking</h3>
                  <p className="text-sm text-slate-600">Monitor your orders and inventory in real-time</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Secure & Reliable</h3>
                  <p className="text-sm text-slate-600">Enterprise-grade security for your data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Smart Analytics</h3>
                  <p className="text-sm text-slate-600">Get insights to grow your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img 
                src="/khaata.png" 
                alt="Khaata Chakki Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Khaata Chakki
            </h1>
            <p className="text-slate-600 font-medium">Premium Flour Mill Management</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800">
                Welcome
              </CardTitle>
              <p className="text-slate-600">Sign in to your account or create a new one</p>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100/80 p-1 rounded-2xl">
                  <TabsTrigger 
                    value="login" 
                    className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <LogIn size={16} />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-700 font-medium flex items-center gap-2">
                        <Mail size={16} className="text-blue-600" />
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-700 font-medium flex items-center gap-2">
                        <Lock size={16} className="text-blue-600" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl pr-12 transition-all duration-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-100 rounded-lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Sign In
                          <ArrowRight size={16} />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-slate-700 font-medium flex items-center gap-2">
                        <User size={16} className="text-green-600" />
                        Full Name
                      </Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 rounded-xl transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-700 font-medium flex items-center gap-2">
                        <Mail size={16} className="text-green-600" />
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 rounded-xl transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-700 font-medium flex items-center gap-2">
                        <Lock size={16} className="text-green-600" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a secure password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="h-12 border-2 border-slate-200 focus:border-green-500 rounded-xl pr-12 transition-all duration-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-green-100 rounded-lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Create Account
                          <ArrowRight size={16} />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 space-y-3">
            <p className="text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
              🔐 Powered by Supabase Authentication
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Secure
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                Fast
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                Reliable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
