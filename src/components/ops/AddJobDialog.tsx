import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export function AddJobDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    employer: "",
    employer_tier: "mid-market",
    role_type: "nurse",
    geography: "",
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.employer || !form.geography) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const id = `JOB-${String(Date.now()).slice(-6)}`;

    const { error } = await supabase.from("jobs" as any).insert({
      id,
      title: form.title,
      employer: form.employer,
      employer_tier: form.employer_tier,
      role_type: form.role_type,
      geography: form.geography,
      status: form.status,
      days_open: 0,
      ai_contribution: 0,
      human_contribution: 0,
      revenue: 0,
      cost: 0,
      margin: 0,
    } as any);

    setLoading(false);

    if (error) {
      toast({ title: "Failed to add job", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Job added successfully" });
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    setForm({ title: "", employer: "", employer_tier: "mid-market", role_type: "nurse", geography: "", status: "active" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Job</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Nurse" />
          </div>
          <div className="space-y-2">
            <Label>Employer *</Label>
            <Input value={form.employer} onChange={(e) => setForm({ ...form, employer: e.target.value })} placeholder="e.g. HealthFirst" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employer Tier</Label>
              <Select value={form.employer_tier} onValueChange={(v) => setForm({ ...form, employer_tier: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="mid-market">Mid-Market</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Role Type</Label>
              <Select value={form.role_type} onValueChange={(v) => setForm({ ...form, role_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="allied">Allied</SelectItem>
                  <SelectItem value="physician">Physician</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Geography *</Label>
            <Input value={form.geography} onChange={(e) => setForm({ ...form, geography: e.target.value })} placeholder="e.g. Texas" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
