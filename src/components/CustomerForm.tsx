
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';
import ItemReadySection from './ItemReadySection';

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
      <div className="transform hover:scale-[1.01] transition-transform duration-200">
        <ItemReadySection
          isReady={formData.isReady}
          setIsReady={(value: boolean) => setFormData({ ...formData, isReady: value })}
        />
      </div>

      <div className="transform hover:scale-[1.01] transition-transform duration-200">
        <CustomerDetailsSection
          customerName={formData.customerName}
          setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
          customerType={formData.customerType}
          setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
        />
      </div>

      <div className="transform hover:scale-[1.01] transition-transform duration-200">
        <WheatFlourSection
          wheatWeight={formData.wheatWeight}
          setWheatWeight={(value) => setFormData({ ...formData, wheatWeight: value })}
          flourType={formData.flourType}
          setFlourType={(value) => setFormData({ ...formData, flourType: value })}
          totalPrice={totalPrice}
        />
      </div>

      <div className="transform hover:scale-[1.01] transition-transform duration-200">
        <PaymentSection
          paymentMethod={formData.paymentMethod}
          setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="text-lg">💾</span>
          Save Customer Record
        </span>
      </Button>
    </form>
  );
};

export default CustomerForm;
