"use client";

import { useBillSplitter } from "@/contexts/bill-splitter-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, Scale, Users } from "lucide-react";
import { exportToCsv } from "@/lib/csv";

export function SummaryView() {
  const { participants, expenses, balances, currency, setCurrency, getParticipantName, resetSession } = useBillSplitter();

  const handleExport = () => {
    exportToCsv(participants, expenses, balances, currency);
  };
  
  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Summary</CardTitle>
        <CardDescription>Who owes whom and total spending overview.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Total Participants</span>
            </div>
            <span className="font-bold text-lg">{participants.length}</span>
        </div>
         <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Total Spent</span>
            </div>
            <span className="font-bold text-lg">{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(totalSpent)}</span>
        </div>

        <div>
            <h4 className="font-semibold mb-2 mt-4">Settlements</h4>
            <div className="space-y-2">
            {balances.length > 0 ? (
                balances.map((balance, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg animate-in fade-in-0 duration-300">
                    <span className="font-medium text-sm">
                    {getParticipantName(balance.from)} owes {getParticipantName(balance.to)}
                    </span>
                    <span className="font-bold text-primary">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(balance.amount)}
                    </span>
                </div>
                ))
            ) : (
                <div className="text-center text-sm text-muted-foreground py-4">
                {participants.length > 1 ? "Everyone is settled up!" : "Add participants and expenses to see balances."}
                </div>
            )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
         <div className="flex w-full sm:w-auto gap-2">
            <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full sm:w-[120px]" aria-label="Select currency">
                    <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport} disabled={expenses.length === 0}>
                <FileDown className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>
        <Button variant="destructive" onClick={resetSession} className="w-full sm:w-auto sm:ml-auto">Reset Session</Button>
      </CardFooter>
    </Card>
  );
}
