"use client";

import { useState } from "react";
import { useBillSplitter } from "@/contexts/bill-splitter-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

export function ParticipantsManager() {
  const { participants, addParticipant, removeParticipant } = useBillSplitter();
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        addParticipant(name.trim());
        toast({ title: "Participant Added", description: `${name.trim()} has joined the group.` });
        setName("");
      } catch (error) {
        if (error instanceof Error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Participants</CardTitle>
        <CardDescription>Add or remove people from the group.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddParticipant} className="flex gap-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Jane Doe"
            aria-label="New participant name"
          />
          <Button type="submit" size="icon" aria-label="Add participant">
            <UserPlus className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          <AnimatePresence>
            {participants.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeParticipant(p.id)} aria-label={`Remove ${p.name}`}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          {participants.length === 0 && (
             <div className="text-center text-sm text-muted-foreground py-4">
                No participants yet. Add some to get started!
              </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
