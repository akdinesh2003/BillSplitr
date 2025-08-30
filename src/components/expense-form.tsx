"use client";

import { useBillSplitter } from "@/contexts/bill-splitter-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const expenseFormSchema = z.object({
  description: z.string().min(1, { message: "Description is required." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  paidById: z.string().min(1, { message: "Please select who paid." }),
});

export function ExpenseForm() {
  const { participants, addExpense } = useBillSplitter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      description: "",
      amount: 0,
      paidById: "",
    },
  });

  function onSubmit(values: z.infer<typeof expenseFormSchema>) {
    addExpense(values.description, values.amount, values.paidById);
    toast({ title: "Expense Added", description: `${values.description} has been logged.` });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log an Expense</CardTitle>
        <CardDescription>Add a new expense to the group.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dinner, Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paidById"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid by</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={participants.length === 0}>
                        <SelectValue placeholder="Select who paid" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {participants.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={participants.length < 2}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
            {participants.length < 2 && (
              <p className="text-xs text-center text-muted-foreground pt-2">Add at least two participants to log an expense.</p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
