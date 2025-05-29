
export interface CustomerRecord {
  customerId: number;
  customerName: string;
  customerType: 'Regular' | 'Temporary';
  wheatWeight: number;
  flourType: 'Atta' | 'Besan' | 'Multigrain' | 'Other';
  ratePerKg: number;
  totalPrice: number;
  paymentMethod: 'Cash' | 'Borrow';
  paymentStatus: 'Paid' | 'Pending';
  isReady: boolean;
  createdAt: string;
}

export interface CustomerFormData {
  customerName: string;
  customerType: 'Regular' | 'Temporary';
  wheatWeight: string;
  flourType: 'Atta' | 'Besan' | 'Multigrain' | 'Other';
  paymentMethod: 'Cash' | 'Borrow';
  isReady: boolean;
}
