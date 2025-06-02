import { CustomerRecord } from '../types/Customer';

const STORAGE_KEY = 'wheatStore_customerRecords';

const getExistingCustomerIdByName = (customerName: string): number | null => {
  const records = getAllCustomerRecords();
  const existingCustomer = records.find(record => 
    record.customerName.toLowerCase() === customerName.toLowerCase()
  );
  return existingCustomer ? existingCustomer.customerId : null;
};

const getNextCustomerId = (): number => {
  const records = getAllCustomerRecords();
  if (records.length === 0) return 1;
  const maxId = Math.max(...records.map(record => record.customerId));
  return maxId + 1;
};

export const saveCustomerRecord = (record: Omit<CustomerRecord, 'customerId'>): CustomerRecord => {
  try {
    const existingRecords = getAllCustomerRecords();
    const existingId = getExistingCustomerIdByName(record.customerName);
    
    const newRecord: CustomerRecord = {
      ...record,
      customerId: existingId || getNextCustomerId(),
      ratePerKg: 2, // Fixed rate at ₹2
      totalPrice: (parseFloat(record.wheatWeight.toString()) || 0) * 2,
      createdAt: new Date().toISOString(), // Ensure date is always current
    };
    
    const updatedRecords = [...existingRecords, newRecord];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return newRecord;
  } catch (error) {
    console.error('Error saving customer record:', error);
    throw new Error('Failed to save customer record');
  }
};

export const getAllCustomerRecords = (): CustomerRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading customer records:', error);
    return [];
  }
};

export const getCustomerByNameOrId = (searchTerm: string): CustomerRecord[] => {
  try {
    const records = getAllCustomerRecords();
    const searchTermLower = searchTerm.toLowerCase().trim();
    const searchAsNumber = parseInt(searchTerm);
    
    return records.filter(record => {
      // Exact name match
      const nameMatch = record.customerName.toLowerCase() === searchTermLower;
      // Exact ID match
      const idMatch = !isNaN(searchAsNumber) && record.customerId === searchAsNumber;
      
      return nameMatch || idMatch;
    });
  } catch (error) {
    console.error('Error searching customer:', error);
    return [];
  }
};

export const updateCustomerRecord = (customerId: number, updatedRecord: CustomerRecord): boolean => {
  try {
    const records = getAllCustomerRecords();
    const index = records.findIndex(record => record.customerId === customerId);
    
    if (index !== -1) {
      // Ensure rate stays fixed at ₹2 and recalculate total
      const recordWithFixedRate = {
        ...updatedRecord,
        ratePerKg: 2,
        totalPrice: updatedRecord.wheatWeight * 2
      };
      records[index] = recordWithFixedRate;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating customer record:', error);
    return false;
  }
};

export const deleteCustomerRecord = (customerId: number): boolean => {
  try {
    const records = getAllCustomerRecords();
    const filteredRecords = records.filter(record => record.customerId !== customerId);
    
    if (filteredRecords.length === records.length) {
      return false; // Record not found
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
    return true;
  } catch (error) {
    console.error('Error deleting customer record:', error);
    return false;
  }
};

export const getTotalRevenue = (): number => {
  try {
    const records = getAllCustomerRecords();
    return records.reduce((total, record) => total + record.totalPrice, 0);
  } catch (error) {
    console.error('Error calculating total revenue:', error);
    return 0;
  }
};
