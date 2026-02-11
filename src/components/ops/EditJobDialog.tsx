import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface EditJobDialogProps {
  job: { id: string; title: string; employer: string; employerTier: string; roleType: string; geography: string; status: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditJobDialog({ job, open, onOpenChange }: EditJobDialogProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: job.title,
    employer: job.employer,
    employer_tier: job.employerTier,
    role_type: job.roleType,
    geography: job.geography,
    status: job.status,
  });

  useEffect(() => {
    setForm({
      title: job.title,
      employer: job.employer,
      employer_tier: job.employerTier,
      role_type: job.roleType,
      geography: job.geography,
      status: job.status,
    });
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.employer || !form.geography) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("jobs")
      .update({
        title: form.title,
        employer: form.employer,
        employer_tier: form.employer_tier,
        role_type: form.role_type,
        geography: form.geography,
        status: form.status,
      })
      .eq("id", job.id);

    setLoading(false);

    if (error) {
      toast({ title: "Failed to update job", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Job updated successfully" });
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Employer *</Label>
            <Input value={form.employer} onChange={(e) => setForm({ ...form, employer: e.target.value })} />
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
            <Input value={form.geography} onChange={(e) => setForm({ ...form, geography: e.target.value })} />
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
