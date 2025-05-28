
import { CustomerRecord } from '../types/Customer';

const STORAGE_KEY = 'wheatStore_customerRecords';

export const saveCustomerRecord = (record: CustomerRecord): void => {
  try {
    const existingRecords = getAllCustomerRecords();
    const updatedRecords = [...existingRecords, record];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
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

export const getCustomerById = (customerId: string): CustomerRecord | null => {
  try {
    const records = getAllCustomerRecords();
    return records.find(record => record.customerId === customerId) || null;
  } catch (error) {
    console.error('Error searching customer:', error);
    return null;
  }
};

export const updateCustomerRecord = (customerId: string, updatedRecord: CustomerRecord): boolean => {
  try {
    const records = getAllCustomerRecords();
    const index = records.findIndex(record => record.customerId === customerId);
    
    if (index !== -1) {
      records[index] = updatedRecord;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating customer record:', error);
    return false;
  }
};

export const deleteCustomerRecord = (customerId: string): boolean => {
  try {
    const records = getAllCustomerRecords();
    const filteredRecords = records.filter(record => record.customerId !== customerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
    return true;
  } catch (error) {
    console.error('Error deleting customer record:', error);
    return false;
  }
};
