"use client";

import { useBillSplitter } from "@/contexts/bill-splitter-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ExpensesList() {
  const { expenses, removeExpense, getParticipantName, currency } = useBillSplitter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
        <CardDescription>A list of all logged expenses for this session.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Paid by</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getParticipantName(expense.paidById)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(expense.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                             <Button variant="ghost" size="icon" onClick={() => removeExpense(expense.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Delete expense</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Expense</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                    No expenses logged yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
