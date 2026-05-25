import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

export interface UserAccount {
  name: string;
  checkingBalance: number;
  savingsBalance: number;
  creditBuilderBalance: number;
  transactions: Transaction[];
}

const INITIAL_DATA: UserAccount = {
  name: 'Alex Johnson',
  checkingBalance: 2450.75,
  savingsBalance: 5200.00,
  creditBuilderBalance: 125.50,
  transactions: [
    { id: '1', date: '2024-03-20', description: 'Grocery Store', amount: 85.20, type: 'debit', category: 'Food' },
    { id: '2', date: '2024-03-19', description: 'Employer Direct Deposit', amount: 1200.00, type: 'credit', category: 'Income' },
    { id: '3', date: '2024-03-18', description: 'Electric Bill', amount: 110.00, type: 'debit', category: 'Bills' },
    { id: '4', date: '2024-03-17', description: 'Coffee Shop', amount: 4.50, type: 'debit', category: 'Food' },
    { id: '5', date: '2024-03-15', description: 'Gas Station', amount: 45.00, type: 'debit', category: 'Transport' },
  ]
};

const STORAGE_KEY = 'chime_clone_user_data';

export const getStoredData = (): UserAccount => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(stored);
};

export const updateStoredData = (data: UserAccount) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const useUserAccount = () => {
  const [data, setData] = useState<UserAccount>(getStoredData());

  const refreshData = () => {
    setData(getStoredData());
  };

  const addTransaction = (desc: string, amount: number, type: 'credit' | 'debit', fromAccount: 'checking' | 'savings') => {
    const newData = { ...data };
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      description: desc,
      amount: amount,
      type: type,
      category: 'Transfer'
    };

    newData.transactions = [newTransaction, ...newData.transactions];
    
    if (fromAccount === 'checking') {
      newData.checkingBalance += type === 'credit' ? amount : -amount;
    } else {
      newData.savingsBalance += type === 'credit' ? amount : -amount;
    }

    updateStoredData(newData);
    setData(newData);
  };

  const transferBetweenAccounts = (amount: number, from: 'checking' | 'savings', to: 'checking' | 'savings') => {
    if (amount <= 0) return;
    
    const newData = { ...data };
    
    if (from === 'checking') {
      if (newData.checkingBalance < amount) return false;
      newData.checkingBalance -= amount;
      newData.savingsBalance += amount;
    } else {
      if (newData.savingsBalance < amount) return false;
      newData.savingsBalance -= amount;
      newData.checkingBalance += amount;
    }

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      description: `Transfer from ${from} to ${to}`,
      amount: amount,
      type: 'debit',
      category: 'Transfer'
    };

    newData.transactions = [transaction, ...newData.transactions];
    updateStoredData(newData);
    setData(newData);
    return true;
  };

  return { data, addTransaction, transferBetweenAccounts, refreshData };
};