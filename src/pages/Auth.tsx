
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock, User, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-200/25 to-red-200/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-amber-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <img 
                  src="/lovable-uploads/c12f74b4-d4a0-4a17-9af3-8b2e94ed7dd5.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Khaata Chakki
                </h1>
                <p className="text-sm text-slate-600 font-medium">Premium Flour Mill Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Shield size={16} className="text-green-600" />
              <span>Secure Authentication</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="mb-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-4 transform hover:scale-110 transition-all duration-300 overflow-hidden">
                <img 
                  src="/lovable-uploads/c12f74b4-d4a0-4a17-9af3-8b2e94ed7dd5.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h2>
              <p className="text-slate-600 font-medium">Access your flour mill dashboard</p>
            </div>
          </div>

          <Card className="shadow-3xl border-0 bg-white/90 backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-slate-800">
                Get Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="login" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                  >
                    <LogIn size={16} />
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="login-email" className="text-slate-700 font-semibold flex items-center gap-2">
                        <Mail size={16} className="text-amber-600" />
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="border-2 border-slate-200 focus:border-amber-500 hover:border-amber-300 transition-all duration-300 rounded-xl h-12 pl-4 pr-4 group-hover:shadow-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="login-password" className="text-slate-700 font-semibold flex items-center gap-2">
                        <Lock size={16} className="text-amber-600" />
                        Password
                      </Label>
                      <div className="relative group">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="border-2 border-slate-200 focus:border-amber-500 hover:border-amber-300 transition-all duration-300 rounded-xl h-12 pl-4 pr-12 group-hover:shadow-md"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-amber-100 rounded-lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} className="text-slate-600" /> : <Eye size={16} className="text-slate-600" />}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Logging in...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <LogIn size={18} />
                          Login to Dashboard
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signup-name" className="text-slate-700 font-semibold flex items-center gap-2">
                        <User size={16} className="text-emerald-600" />
                        Full Name
                      </Label>
                      <div className="relative group">
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupData.fullName}
                          onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                          className="border-2 border-slate-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 rounded-xl h-12 pl-4 pr-4 group-hover:shadow-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-slate-700 font-semibold flex items-center gap-2">
                        <Mail size={16} className="text-emerald-600" />
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="border-2 border-slate-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 rounded-xl h-12 pl-4 pr-4 group-hover:shadow-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-slate-700 font-semibold flex items-center gap-2">
                        <Lock size={16} className="text-emerald-600" />
                        Password
                      </Label>
                      <div className="relative group">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password (min 6 characters)"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="border-2 border-slate-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 rounded-xl h-12 pl-4 pr-12 group-hover:shadow-md"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-emerald-100 rounded-lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} className="text-slate-600" /> : <Eye size={16} className="text-slate-600" />}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <UserPlus size={18} />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-8 space-y-3">
            <p className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-sm">
              🔒 Secure authentication powered by Supabase
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SSL Encrypted
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
