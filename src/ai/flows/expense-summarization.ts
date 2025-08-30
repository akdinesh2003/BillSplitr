'use server';

/**
 * @fileOverview Summarizes user expenses and provides budgeting advice.
 *
 * - summarizeExpenses - A function that summarizes expenses and offers advice.
 * - SummarizeExpensesInput - The input type for the summarizeExpenses function.
 * - SummarizeExpensesOutput - The return type for the summarizeExpenses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeExpensesInputSchema = z.object({
  expenses: z
    .string()
    .describe(
      `A string containing a detailed list of expenses, including amounts, descriptions, and categories. For example: 'Food: $50 (Groceries), Travel: $100 (Gas), Rent: $1200 (Apartment)'`
    ),
});
export type SummarizeExpensesInput = z.infer<typeof SummarizeExpensesInputSchema>;

const SummarizeExpensesOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of spending habits, identification of overspending areas, and general budgeting advice.'
    ),
});
export type SummarizeExpensesOutput = z.infer<typeof SummarizeExpensesOutputSchema>;

export async function summarizeExpenses(input: SummarizeExpensesInput): Promise<SummarizeExpensesOutput> {
  return summarizeExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeExpensesPrompt',
  input: {schema: SummarizeExpensesInputSchema},
  output: {schema: SummarizeExpensesOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following expenses and provide a summary of spending habits, identify potential overspending areas, and offer general budgeting advice.

Expenses: {{{expenses}}}`,
});

const summarizeExpensesFlow = ai.defineFlow(
  {
    name: 'summarizeExpensesFlow',
    inputSchema: SummarizeExpensesInputSchema,
    outputSchema: SummarizeExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
