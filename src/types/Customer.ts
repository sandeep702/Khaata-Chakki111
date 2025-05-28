
export interface CustomerRecord {
  customerId: string;
  customerName: string;
  ownerName: string;
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
  customerId?: string;
  customerName: string;
  ownerName: string;
  wheatWeight: string;
  flourType: 'Atta' | 'Maida' | 'Besan' | 'Multigrain' | 'Other';
  ratePerKg: string;
  paymentMethod: 'Cash' | 'Borrow';
  isReady: boolean;
}
