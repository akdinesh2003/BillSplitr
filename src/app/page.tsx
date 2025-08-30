"use client";

import { BillSplitterProvider } from "@/contexts/bill-splitter-context";
import { Header } from "@/components/header";
import { ParticipantsManager } from "@/components/participants-manager";
import { ExpenseForm } from "@/components/expense-form";
import { SummaryView } from "@/components/summary-view";
import { ExpensesList } from "@/components/expenses-list";
import { AiSummary } from "@/components/ai-summary";

function BillSplitrApp() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 flex flex-col gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <ParticipantsManager />
            <ExpenseForm />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
            <SummaryView />
            <AiSummary />
            <ExpensesList />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        BillSplitr: Split smart, stay friends.
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <BillSplitterProvider>
      <BillSplitrApp />
    </BillSplitterProvider>
  );
}
