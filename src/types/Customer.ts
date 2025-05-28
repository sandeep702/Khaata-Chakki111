
export interface CustomerRecord {
  customerId: number;
  customerName: string;
  customerType: 'Permanent' | 'Temporary';
  wheatWeight: number;
  flourType: 'Atta' | 'Maida' | 'Besan' | 'Multigrain' | 'Other';
  ratePerKg: number;
  totalPrice: number;
  paymentMethod: 'Cash' | 'Borrow';
  paymentStatus: 'Paid' | 'Pending';
  isReady: boolean;
  createdAt: string;
}

export interface CustomerFormData {
  customerName: string;
  customerType: 'Permanent' | 'Temporary';
  wheatWeight: string;
  flourType: 'Atta' | 'Maida' | 'Besan' | 'Multigrain' | 'Other';
  ratePerKg: string;
  paymentMethod: 'Cash' | 'Borrow';
  isReady: boolean;
}
