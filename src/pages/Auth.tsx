
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock, User, ArrowRight, Shield, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(59,130,246,0.03)_1px,_transparent_1px),_linear-gradient(rgba(59,130,246,0.03)_1px,_transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 overflow-hidden border border-slate-200/50">
            <img 
              src="/khaata.png" 
              alt="Khaata Chakki Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Khaata Chakki
          </h1>
          <p className="text-slate-600 font-medium">Premium Flour Mill Management System</p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Welcome
            </CardTitle>
            <p className="text-slate-600">Access your flour mill dashboard</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <LogIn size={16} />
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <UserPlus size={16} />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-slate-700 font-medium flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" />
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="h-11 border-2 border-slate-200 focus:border-blue-500 rounded-lg transition-colors"
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
                        className="h-11 border-2 border-slate-200 focus:border-blue-500 rounded-lg pr-11 transition-colors"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-blue-100 rounded-md"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-4 h-4 border-2 border-white/30 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        </div>
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

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-slate-700 font-medium flex items-center gap-2">
                      <User size={16} className="text-green-600" />
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      className="h-11 border-2 border-slate-200 focus:border-green-500 rounded-lg transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-700 font-medium flex items-center gap-2">
                      <Mail size={16} className="text-green-600" />
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="h-11 border-2 border-slate-200 focus:border-green-500 rounded-lg transition-colors"
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
                        className="h-11 border-2 border-slate-200 focus:border-green-500 rounded-lg pr-11 transition-colors"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-green-100 rounded-md"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-4 h-4 border-2 border-white/30 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        </div>
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
          <p className="text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl inline-block border border-white/20">
            🔐 Secured by Supabase Authentication
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
  );
};

export default Auth;
