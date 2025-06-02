
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';
import ItemReadySection from './ItemReadySection';
import { Save, RotateCcw } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50">
        <ItemReadySection
          isReady={formData.isReady}
          setIsReady={(value: boolean) => setFormData({ ...formData, isReady: value })}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
          <CustomerDetailsSection
            customerName={formData.customerName}
            setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
            customerType={formData.customerType}
            setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
          />
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
          <PaymentSection
            paymentMethod={formData.paymentMethod}
            setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
        <WheatFlourSection
          wheatWeight={formData.wheatWeight}
          setWheatWeight={(value) => setFormData({ ...formData, wheatWeight: value })}
          flourType={formData.flourType}
          setFlourType={(value) => setFormData({ ...formData, flourType: value })}
          totalPrice={totalPrice}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Save size={20} className="mr-2" />
          Save Customer Record
        </Button>
        
        <Button
          type="button"
          onClick={resetForm}
          variant="outline"
          className="px-6 py-4 rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300"
        >
          <RotateCcw size={20} className="mr-2" />
          Reset
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
