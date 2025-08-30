"use client";

import { useState } from 'react';
import { useBillSplitter } from '@/contexts/bill-splitter-context';
import { summarizeExpenses } from '@/ai/flows/expense-summarization';
import type { SummarizeExpensesOutput } from '@/ai/flows/expense-summarization';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function AiSummary() {
  const { expenses, participants, currency, getParticipantName } = useBillSplitter();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeExpensesOutput | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (expenses.length === 0) {
      toast({
        title: "No expenses to summarize",
        description: "Add some expenses before using the AI summary.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);

    const expensesString = expenses.map(e => {
      const participantName = getParticipantName(e.paidById);
      return `${e.description}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(e.amount)} (Paid by: ${participantName})`;
    }).join('\n');

    try {
      const result = await summarizeExpenses({ expenses: expensesString });
      setSummary(result);
    } catch (error) {
      console.error("AI summarization failed", error);
      toast({
        title: "AI Summarization Failed",
        description: "Could not generate summary. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI Expense Summary
        </CardTitle>
        <CardDescription>
          Get AI-powered insights and advice on your group's spending habits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Expenses...
            </>
          ) : (
            'Generate Smart Summary'
          )}
        </Button>
        {summary && !isLoading && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold mb-2">Spending Insights:</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary.summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
