
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';
import ItemReadySection from './ItemReadySection';
import { Save, RotateCcw, Sparkles } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Status Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Order Status</h3>
        </div>
        <ItemReadySection
          isReady={formData.isReady}
          setIsReady={(value: boolean) => setFormData({ ...formData, isReady: value })}
        />
      </div>

      {/* Customer Information & Payment Details Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">✦</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Customer Information</h3>
          </div>
          <CustomerDetailsSection
            customerName={formData.customerName}
            setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
            customerType={formData.customerType}
            setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
          />
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💳</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Payment Details</h3>
          </div>
          <PaymentSection
            paymentMethod={formData.paymentMethod}
            setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
          />
        </div>
      </div>

      {/* Wheat & Flour Details Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🌾</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Wheat & Flour Details</h3>
        </div>
        <WheatFlourSection
          wheatWeight={formData.wheatWeight}
          setWheatWeight={(value) => setFormData({ ...formData, wheatWeight: value })}
          flourType={formData.flourType}
          setFlourType={(value) => setFormData({ ...formData, flourType: value })}
          totalPrice={totalPrice}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base"
        >
          <Save size={20} className="mr-2" />
          Save Customer Record
          <Sparkles size={16} className="ml-2" />
        </Button>
        
        <Button
          type="button"
          onClick={resetForm}
          variant="outline"
          className="px-6 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 font-bold text-base hover:bg-slate-50 hover:scale-105"
        >
          <RotateCcw size={20} className="mr-2" />
          Reset Form
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
