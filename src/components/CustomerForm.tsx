
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';
import ItemReadySection from './ItemReadySection';
import { Save, RotateCcw, Sparkles, CheckCircle } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Item Ready Section - Enhanced */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/80 backdrop-blur-sm border-2 border-emerald-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Order Status</h3>
          </div>
          <ItemReadySection
            isReady={formData.isReady}
            setIsReady={(value: boolean) => setFormData({ ...formData, isReady: value })}
          />
        </div>
      </div>

      {/* Main Form Sections Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Details */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Customer Information</h3>
            </div>
            <CustomerDetailsSection
              customerName={formData.customerName}
              setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
              customerType={formData.customerType}
              setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-lg">💳</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800">Payment Details</h3>
            </div>
            <PaymentSection
              paymentMethod={formData.paymentMethod}
              setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
            />
          </div>
        </div>
      </div>

      {/* Wheat & Flour Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-lg">🌾</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800">Wheat & Flour Details</h3>
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
        >
          <Save size={24} className="mr-3" />
          Save Customer Record
          <Sparkles size={20} className="ml-3 animate-pulse" />
        </Button>
        
        <Button
          type="button"
          onClick={resetForm}
          variant="outline"
          className="px-8 py-6 rounded-2xl border-3 border-slate-300 hover:border-slate-400 transition-all duration-300 font-black text-lg hover:bg-slate-50 hover:scale-105"
        >
          <RotateCcw size={24} className="mr-3" />
          Reset Form
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
