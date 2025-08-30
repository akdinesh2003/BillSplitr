import type { Expense, Balance, Participant } from '@/types';

function convertToCSV(data: any[], headers: string[]): string {
  const headerRow = headers.join(',') + '\r\n';
  const rows = data.map(row => 
    headers.map(header => JSON.stringify(row[header.toLowerCase().replace(/ /g, '_')] || '')).join(',')
  ).join('\r\n');
  return headerRow + rows;
}

export function exportToCsv(
  participants: Participant[],
  expenses: Expense[],
  balances: Balance[],
  currency: string
) {
  const getParticipantName = (id: string) => participants.find(p => p.id === id)?.name || 'Unknown';

  const expensesData = expenses.map(e => ({
    description: e.description,
    amount: e.amount.toFixed(2),
    paid_by: getParticipantName(e.paidById),
    date: new Date(e.date).toLocaleString(),
    currency: currency,
  }));
  
  const expensesHeaders = ['Description', 'Amount', 'Paid By', 'Date', 'Currency'];
  const expensesCsv = convertToCSV(expensesData, expensesHeaders);

  const balancesData = balances.map(b => ({
    from: getParticipantName(b.from),
    to: getParticipantName(b.to),
    amount: b.amount.toFixed(2),
    currency: currency,
  }));

  const balancesHeaders = ['From', 'To', 'Amount', 'Currency'];
  const balancesCsv = convertToCSV(balancesData, balancesHeaders);

  const totalCsv = `Expenses\r\n${expensesCsv}\r\n\r\nSettlements\r\n${balancesCsv}`;

  const blob = new Blob([totalCsv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `BillSplitr_Summary_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
