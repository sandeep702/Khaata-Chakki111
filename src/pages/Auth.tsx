
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock, User, ArrowRight, Shield, Zap, Globe, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-indigo-100">
                <img 
                  src="/khaata.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Khaata Chakki
                </h1>
                <p className="text-slate-600 font-bold text-lg">Next-Gen Flour Mill Management</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-800 leading-tight">
                Revolutionize Your<br />
                <span className="text-indigo-600">Mill Operations</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Experience cutting-edge technology designed to streamline every aspect of your flour mill business.
              </p>
            </div>

            {/* Enhanced Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Lightning Fast</h3>
                  <p className="text-slate-600">Real-time processing and instant updates</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Bank-Level Security</h3>
                  <p className="text-slate-600">Your data is protected with enterprise encryption</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Cloud-Powered</h3>
                  <p className="text-slate-600">Access from anywhere, anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center mx-auto mb-4 border-4 border-indigo-100">
              <img 
                src="/khaata.png" 
                alt="Khaata Chakki Logo" 
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
              Khaata Chakki
            </h1>
            <p className="text-slate-600 font-bold">Next-Gen Flour Mill Management</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="text-3xl font-bold mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-indigo-100 text-lg">Sign in to continue your journey</p>
            </CardHeader>
            
            <CardContent className="p-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-2xl h-14">
                  <TabsTrigger 
                    value="login" 
                    className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 text-base font-semibold h-12"
                  >
                    <LogIn size={18} />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 text-base font-semibold h-12"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="login-email" className="text-slate-700 font-semibold flex items-center gap-2 text-base">
                        <Mail size={18} className="text-indigo-600" />
                        Email Address
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="h-14 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl text-base px-4 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="login-password" className="text-slate-700 font-semibold flex items-center gap-2 text-base">
                        <Lock size={18} className="text-indigo-600" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="h-14 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl pr-14 text-base px-4 transition-all duration-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-indigo-100 rounded-xl"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          Sign In
                          <ArrowRight size={20} />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signup-name" className="text-slate-700 font-semibold flex items-center gap-2 text-base">
                        <User size={18} className="text-purple-600" />
                        Full Name
                      </Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        className="h-14 border-2 border-slate-200 focus:border-purple-500 rounded-2xl text-base px-4 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-slate-700 font-semibold flex items-center gap-2 text-base">
                        <Mail size={18} className="text-purple-600" />
                        Email Address
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="h-14 border-2 border-slate-200 focus:border-purple-500 rounded-2xl text-base px-4 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-slate-700 font-semibold flex items-center gap-2 text-base">
                        <Lock size={18} className="text-purple-600" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a secure password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="h-14 border-2 border-slate-200 focus:border-purple-500 rounded-2xl pr-14 text-base px-4 transition-all duration-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-purple-100 rounded-xl"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          Create Account
                          <Star size={20} />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 space-y-4">
            <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
              <span className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Secure
              </span>
              <span className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                Fast
              </span>
              <span className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                Reliable
              </span>
            </div>
            <p className="text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl inline-block">
              🔐 Powered by Supabase Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
