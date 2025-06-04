
import { supabase } from '../integrations/supabase/client';
import { CustomerRecord } from '../types/Customer';

export interface DatabaseCustomerRecord {
  id: string;
  customer_id: number;
  customer_name: string;
  customer_type: 'Regular' | 'Temporary';
  wheat_weight: number;
  flour_type: 'Atta' | 'Besan' | 'Multigrain' | 'Other';
  rate_per_kg: number;
  total_price: number;
  payment_method: 'Cash' | 'Borrow';
  payment_status: 'Paid' | 'Pending';
  is_ready: boolean;
  created_at: string;
  updated_at: string;
}

const getExistingCustomerIdByName = async (customerName: string): Promise<number | null> => {
  const { data, error } = await supabase
    .from('customer_records')
    .select('customer_id')
    .ilike('customer_name', customerName)
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking existing customer:', error);
    return null;
  }

  return data?.customer_id || null;
};

const getNextCustomerId = async (): Promise<number> => {
  const { data, error } = await supabase
    .from('customer_records')
    .select('customer_id')
    .order('customer_id', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting next customer ID:', error);
    return 1;
  }

  return data ? data.customer_id + 1 : 1;
};

export const saveCustomerRecord = async (record: Omit<CustomerRecord, 'customerId'>): Promise<CustomerRecord> => {
  try {
    const existingId = await getExistingCustomerIdByName(record.customerName);
    const customerId = existingId || await getNextCustomerId();
    
    const newRecord = {
      customer_id: customerId,
      customer_name: record.customerName.trim(),
      customer_type: record.customerType,
      wheat_weight: parseFloat(record.wheatWeight.toString()) || 0,
      flour_type: record.flourType,
      rate_per_kg: 2, // Fixed rate
      total_price: (parseFloat(record.wheatWeight.toString()) || 0) * 2,
      payment_method: record.paymentMethod,
      payment_status: record.paymentMethod === 'Cash' ? 'Paid' as const : 'Pending' as const,
      is_ready: record.isReady,
    };

    const { data, error } = await supabase
      .from('customer_records')
      .insert([newRecord])
      .select()
      .single();

    if (error) {
      console.error('Error saving customer record:', error);
      throw new Error('Failed to save customer record');
    }

    return {
      customerId: data.customer_id,
      customerName: data.customer_name,
      customerType: data.customer_type as 'Regular' | 'Temporary',
      wheatWeight: data.wheat_weight,
      flourType: data.flour_type as 'Atta' | 'Besan' | 'Multigrain' | 'Other',
      ratePerKg: data.rate_per_kg,
      totalPrice: data.total_price,
      paymentMethod: data.payment_method as 'Cash' | 'Borrow',
      paymentStatus: data.payment_status as 'Paid' | 'Pending',
      isReady: data.is_ready,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error saving customer record:', error);
    throw new Error('Failed to save customer record');
  }
};

export const getAllCustomerRecords = async (): Promise<CustomerRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('customer_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading customer records:', error);
      return [];
    }

    return data.map((record: DatabaseCustomerRecord) => ({
      customerId: record.customer_id,
      customerName: record.customer_name,
      customerType: record.customer_type as 'Regular' | 'Temporary',
      wheatWeight: record.wheat_weight,
      flourType: record.flour_type as 'Atta' | 'Besan' | 'Multigrain' | 'Other',
      ratePerKg: record.rate_per_kg,
      totalPrice: record.total_price,
      paymentMethod: record.payment_method as 'Cash' | 'Borrow',
      paymentStatus: record.payment_status as 'Paid' | 'Pending',
      isReady: record.is_ready,
      createdAt: record.created_at,
    }));
  } catch (error) {
    console.error('Error loading customer records:', error);
    return [];
  }
};

export const getCustomerByNameOrId = async (searchTerm: string): Promise<CustomerRecord[]> => {
  try {
    const searchTermLower = searchTerm.toLowerCase().trim();
    const searchAsNumber = parseInt(searchTerm);

    let query = supabase.from('customer_records').select('*');

    if (!isNaN(searchAsNumber)) {
      query = query.or(`customer_id.eq.${searchAsNumber},customer_name.ilike.%${searchTermLower}%`);
    } else {
      query = query.ilike('customer_name', `%${searchTermLower}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching customer:', error);
      return [];
    }

    return data.map((record: DatabaseCustomerRecord) => ({
      customerId: record.customer_id,
      customerName: record.customer_name,
      customerType: record.customer_type as 'Regular' | 'Temporary',
      wheatWeight: record.wheat_weight,
      flourType: record.flour_type as 'Atta' | 'Besan' | 'Multigrain' | 'Other',
      ratePerKg: record.rate_per_kg,
      totalPrice: record.total_price,
      paymentMethod: record.payment_method as 'Cash' | 'Borrow',
      paymentStatus: record.payment_status as 'Paid' | 'Pending',
      isReady: record.is_ready,
      createdAt: record.created_at,
    }));
  } catch (error) {
    console.error('Error searching customer:', error);
    return [];
  }
};

export const updateCustomerRecord = async (customerId: number, updatedRecord: CustomerRecord): Promise<boolean> => {
  try {
    const recordWithFixedRate = {
      customer_name: updatedRecord.customerName,
      customer_type: updatedRecord.customerType,
      wheat_weight: updatedRecord.wheatWeight,
      flour_type: updatedRecord.flourType,
      rate_per_kg: 2,
      total_price: updatedRecord.wheatWeight * 2,
      payment_method: updatedRecord.paymentMethod,
      payment_status: updatedRecord.paymentStatus,
      is_ready: updatedRecord.isReady,
    };

    const { error } = await supabase
      .from('customer_records')
      .update(recordWithFixedRate)
      .eq('customer_id', customerId);

    if (error) {
      console.error('Error updating customer record:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating customer record:', error);
    return false;
  }
};

export const deleteCustomerRecord = async (customerId: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('customer_records')
      .delete()
      .eq('customer_id', customerId);

    if (error) {
      console.error('Error deleting customer record:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting customer record:', error);
    return false;
  }
};

export const getTotalRevenue = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('customer_records')
      .select('total_price');

    if (error) {
      console.error('Error calculating total revenue:', error);
      return 0;
    }

    return data.reduce((total, record) => total + record.total_price, 0);
  } catch (error) {
    console.error('Error calculating total revenue:', error);
    return 0;
  }
};
