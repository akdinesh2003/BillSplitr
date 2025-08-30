"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { Participant, Expense, Balance } from '@/types';
import { calculateBalances } from '@/lib/calculator';

interface BillSplitterContextType {
  participants: Participant[];
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  expenses: Expense[];
  addExpense: (description: string, amount: number, paidById: string) => void;
  removeExpense: (id: string) => void;
  balances: Balance[];
  currency: string;
  setCurrency: (currency: string) => void;
  getParticipantName: (id: string) => string;
  resetSession: () => void;
  isLoaded: boolean;
}

const BillSplitterContext = createContext<BillSplitterContextType | undefined>(undefined);

export function BillSplitterProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    try {
      const savedParticipants = localStorage.getItem('bill-splitter-participants');
      const savedExpenses = localStorage.getItem('bill-splitter-expenses');
      const savedCurrency = localStorage.getItem('bill-splitter-currency');

      if (savedParticipants) setParticipants(JSON.parse(savedParticipants));
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedCurrency) setCurrency(JSON.parse(savedCurrency));
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('bill-splitter-participants', JSON.stringify(participants));
      localStorage.setItem('bill-splitter-expenses', JSON.stringify(expenses));
      localStorage.setItem('bill-splitter-currency', JSON.stringify(currency));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [participants, expenses, currency, isLoaded]);

  useEffect(() => {
    if (participants.length > 0) {
      const newBalances = calculateBalances(participants, expenses);
      setBalances(newBalances);
    } else {
      setBalances([]);
    }
  }, [participants, expenses, isLoaded]);

  const addParticipant = (name: string) => {
    if (participants.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        throw new Error("A participant with this name already exists.");
    }
    const newParticipant: Participant = { id: crypto.randomUUID(), name };
    setParticipants(prev => [...prev, newParticipant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
    setExpenses(prev => prev.filter(e => e.paidById !== id));
  };

  const addExpense = (description: string, amount: number, paidById: string) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount,
      paidById,
      date: new Date().toISOString(),
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || "Unknown";
  };
  
  const resetSession = () => {
    setParticipants([]);
    setExpenses([]);
    setBalances([]);
    setCurrency('USD');
  };

  const value = useMemo(() => ({
    participants,
    addParticipant,
    removeParticipant,
    expenses,
    addExpense,
    removeExpense,
    balances,
    currency,
    setCurrency,
    getParticipantName,
    resetSession,
    isLoaded,
  }), [participants, expenses, balances, currency, isLoaded]);

  return <BillSplitterContext.Provider value={value}>{isLoaded ? children : null}</BillSplitterContext.Provider>;
}

export const useBillSplitter = () => {
  const context = useContext(BillSplitterContext);
  if (!context) {
    throw new Error('useBillSplitter must be used within a BillSplitterProvider');
  }
  return context;
};
