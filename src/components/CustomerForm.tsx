
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';
import ItemReadySection from './ItemReadySection';
import { Save, RotateCcw, Sparkles, CheckCircle, User, Package, CreditCard, Clock } from 'lucide-react';

interface CustomerFormProps {
  onSave: (record: Omit<CustomerRecord, 'customerId'>) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: '',
    customerType: 'Temporary',
    wheatWeight: '',
    flourType: 'Atta',
    paymentMethod: 'Cash',
    isReady: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const weight = parseFloat(formData.wheatWeight) || 0;
    const fixedRate = 2; // Fixed rate at ₹2
    setTotalPrice(weight * fixedRate);
  }, [formData.wheatWeight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.wheatWeight) {
      alert('Please fill in all required fields');
      return;
    }

    const record: Omit<CustomerRecord, 'customerId'> = {
      customerName: formData.customerName.trim(),
      customerType: formData.customerType,
      wheatWeight: parseFloat(formData.wheatWeight),
      flourType: formData.flourType,
      ratePerKg: 2, // Fixed rate
      totalPrice,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'Cash' ? 'Paid' : 'Pending',
      isReady: formData.isReady,
      createdAt: new Date().toISOString(),
    };

    onSave(record);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerType: 'Temporary',
      wheatWeight: '',
      flourType: 'Atta',
      paymentMethod: 'Cash',
      isReady: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mb-6 shadow-2xl">
            <User className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Add New Customer</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Create a comprehensive customer record with our streamlined form system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Customer Info</h3>
                    <p className="text-slate-500">Basic customer details</p>
                  </div>
                </div>
                <CustomerDetailsSection
                  customerName={formData.customerName}
                  setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
                  customerType={formData.customerType}
                  setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
                />
              </div>
            </div>

            {/* Wheat & Flour Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Product Details</h3>
                    <p className="text-slate-500">Wheat & flour specifications</p>
                  </div>
                </div>
                <WheatFlourSection
                  wheatWeight={formData.wheatWeight}
                  setWheatWeight={(value) => setFormData({ ...formData, wheatWeight: value })}
                  flourType={formData.flourType}
                  setFlourType={(value) => setFormData({ ...formData, flourType: value })}
                  totalPrice={totalPrice}
                />
              </div>
            </div>

            {/* Payment & Status Card */}
            <div className="lg:col-span-1 space-y-8">
              {/* Payment Section */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Payment</h3>
                    <p className="text-slate-500">Payment method</p>
                  </div>
                </div>
                <PaymentSection
                  paymentMethod={formData.paymentMethod}
                  setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
                />
              </div>

              {/* Order Status Section */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Order Status</h3>
                    <p className="text-slate-500">Ready for pickup?</p>
                  </div>
                </div>
                <ItemReadySection
                  isReady={formData.isReady}
                  setIsReady={(value: boolean) => setFormData({ ...formData, isReady: value })}
                />
              </div>
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-36 translate-y-36 blur-3xl"></div>
            </div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-white w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-white">Total Amount</h3>
              </div>
              <div className="text-6xl font-black text-white mb-2">₹{totalPrice.toFixed(2)}</div>
              <p className="text-indigo-100 text-lg">Including all charges and taxes</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg group"
            >
              <Save size={24} className="mr-3 group-hover:scale-110 transition-transform" />
              Save Customer Record
              <CheckCircle size={20} className="ml-3 animate-pulse" />
            </Button>
            
            <Button
              type="button"
              onClick={resetForm}
              variant="outline"
              className="bg-white/50 backdrop-blur-sm border-2 border-slate-300 hover:border-slate-400 hover:bg-white/70 transition-all duration-300 font-bold text-lg py-6 px-8 rounded-2xl hover:scale-105 text-slate-700"
            >
              <RotateCcw size={24} className="mr-3" />
              Reset Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
