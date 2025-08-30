import type { Participant, Expense, Balance } from '@/types';

export function calculateBalances(participants: Participant[], expenses: Expense[]): Balance[] {
  if (participants.length === 0 || expenses.length === 0) {
    return [];
  }

  const balances: { [key: string]: number } = {};
  participants.forEach(p => balances[p.id] = 0);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const share = totalSpent / participants.length;

  expenses.forEach(expense => {
    balances[expense.paidById] += expense.amount;
  });

  participants.forEach(p => {
    balances[p.id] -= share;
  });
  
  const debtors = Object.entries(balances)
    .filter(([, amount]) => amount < 0)
    .map(([id, amount]) => ({ id, amount: -amount }));

  const creditors = Object.entries(balances)
    .filter(([, amount]) => amount > 0)
    .map(([id, amount]) => ({ id, amount }));

  const settlements: Balance[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const amountToSettle = Math.min(debtor.amount, creditor.amount);

    if (amountToSettle > 0.005) { // Threshold to avoid tiny floating point settlements
        settlements.push({
            from: debtor.id,
            to: creditor.id,
            amount: amountToSettle,
        });
    }

    debtor.amount -= amountToSettle;
    creditor.amount -= amountToSettle;

    if (debtor.amount < 0.005) {
      debtorIndex++;
    }
    if (creditor.amount < 0.005) {
      creditorIndex++;
    }
  }

  return settlements;
}
