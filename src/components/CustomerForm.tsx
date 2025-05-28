
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import { generateCustomerId } from '../utils/idGenerator';
import CustomerIdSection from './CustomerIdSection';
import CustomerDetailsSection from './CustomerDetailsSection';
import WheatFlourSection from './WheatFlourSection';
import PaymentSection from './PaymentSection';

interface CustomerFormProps {
  onSave: (record: CustomerRecord) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerId: '',
    customerName: '',
    ownerName: '',
    wheatWeight: '',
    flourType: 'Atta',
    ratePerKg: '',
    paymentMethod: 'Cash',
    isReady: false,
  });

  const [useAutoId, setUseAutoId] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (useAutoId) {
      setFormData(prev => ({ ...prev, customerId: generateCustomerId() }));
    }
  }, [useAutoId]);

  useEffect(() => {
    const weight = parseFloat(formData.wheatWeight) || 0;
    const rate = parseFloat(formData.ratePerKg) || 0;
    setTotalPrice(weight * rate);
  }, [formData.wheatWeight, formData.ratePerKg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.ownerName.trim() || 
        !formData.wheatWeight || !formData.ratePerKg) {
      alert('Please fill in all required fields');
      return;
    }

    const customerId = useAutoId ? generateCustomerId() : formData.customerId || generateCustomerId();

    const record: CustomerRecord = {
      customerId,
      customerName: formData.customerName.trim(),
      ownerName: formData.ownerName.trim(),
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
      customerId: useAutoId ? generateCustomerId() : '',
      customerName: '',
      ownerName: '',
      wheatWeight: '',
      flourType: 'Atta',
      ratePerKg: '',
      paymentMethod: 'Cash',
      isReady: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomerIdSection
        useAutoId={useAutoId}
        setUseAutoId={setUseAutoId}
        customerId={formData.customerId || ''}
        setCustomerId={(value) => setFormData({ ...formData, customerId: value })}
      />

      <CustomerDetailsSection
        customerName={formData.customerName}
        setCustomerName={(value) => setFormData({ ...formData, customerName: value })}
        ownerName={formData.ownerName}
        setOwnerName={(value) => setFormData({ ...formData, ownerName: value })}
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
