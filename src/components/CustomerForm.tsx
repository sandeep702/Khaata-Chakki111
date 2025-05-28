
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';

interface CustomerFormProps {
  onSave: (record: Omit<CustomerRecord, 'customerId'>) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: '',
    customerType: 'Temporary',
    wheatWeight: '',
    flourType: 'Atta',
    ratePerKg: '',
    paymentMethod: 'Cash',
    isReady: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const weight = parseFloat(formData.wheatWeight) || 0;
    const rate = parseFloat(formData.ratePerKg) || 0;
    setTotalPrice(weight * rate);
  }, [formData.wheatWeight, formData.ratePerKg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.wheatWeight || !formData.ratePerKg) {
      alert('Please fill in all required fields');
      return;
    }

    const record: Omit<CustomerRecord, 'customerId'> = {
      customerName: formData.customerName.trim(),
      customerType: formData.customerType,
      wheatWeight: parseFloat(formData.wheatWeight),
      flourType: formData.flourType,
      ratePerKg: parseFloat(formData.ratePerKg),
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
      ratePerKg: '',
      paymentMethod: 'Cash',
      isReady: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomerDetailsSection
        customerName={formData.customerName}
        setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
        customerType={formData.customerType}
        setCustomerType={(value) => setFormData({ ...formData, customerType: value })}
      />

      <WheatFlourSection
        wheatWeight={formData.wheatWeight}
        setWheatWeight={(value) => setFormData({ ...formData, wheatWeight: value })}
        flourType={formData.flourType}
        setFlourType={(value) => setFormData({ ...formData, flourType: value })}
        ratePerKg={formData.ratePerKg}
        setRatePerKg={(value) => setFormData({ ...formData, ratePerKg: value })}
        totalPrice={totalPrice}
      />

      <PaymentSection
        paymentMethod={formData.paymentMethod}
        setPaymentMethod={(value) => setFormData({ ...formData, paymentMethod: value })}
        isReady={formData.isReady}
        setIsReady={(value) => setFormData({ ...formData, isReady: value })}
      />

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Save Customer Record
      </Button>
    </form>
  );
};

export default CustomerForm;
