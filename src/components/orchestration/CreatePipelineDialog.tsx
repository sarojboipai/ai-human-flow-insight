import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PipelineMetadata {
  name: string;
  hiringType: "bulk" | "fast_track" | "niche";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  locationTier: "tier_1" | "tier_2" | "tier_3";
  industry: "hospital" | "diagnostic_lab" | "pharmaceuticals";
  defaultSLAProfile: string;
}

interface CreatePipelineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePipelineDialog({ open, onOpenChange }: CreatePipelineDialogProps) {
  const navigate = useNavigate();
  
  const [metadata, setMetadata] = useState<PipelineMetadata>({
    name: "",
    hiringType: "bulk",
    profession: "nurse",
    jobZone: 1,
    locationTier: "tier_1",
    industry: "hospital",
    defaultSLAProfile: "standard",
  });

  const handleCreate = () => {
    if (!metadata.name.trim()) {
      return;
    }
    
    // Navigate to builder with metadata in state
    navigate("/ops/template-builder", {
      state: { metadata }
    });
    
    onOpenChange(false);
    
    // Reset form for next time
    setMetadata({
      name: "",
      hiringType: "bulk",
      profession: "nurse",
      jobZone: 1,
      locationTier: "tier_1",
      industry: "hospital",
      defaultSLAProfile: "standard",
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setMetadata({
      name: "",
      hiringType: "bulk",
      profession: "nurse",
      jobZone: 1,
      locationTier: "tier_1",
      industry: "hospital",
      defaultSLAProfile: "standard",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Pipeline</DialogTitle>
          <DialogDescription>
            Configure the basic settings for your new pipeline template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Template Name */}
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name *</Label>
            <Input
              id="templateName"
              placeholder="e.g., Nurse Tier 1 Bulk Hiring"
              value={metadata.name}
              onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Row 1: Hiring Type, Profession, Job Zone */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Hiring Type *</Label>
              <Select
                value={metadata.hiringType}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, hiringType: v as PipelineMetadata["hiringType"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk">Bulk</SelectItem>
                  <SelectItem value="fast_track">Fast Track</SelectItem>
                  <SelectItem value="niche">Niche</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Profession *</Label>
              <Select
                value={metadata.profession}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, profession: v as PipelineMetadata["profession"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Zone *</Label>
              <Select
                value={String(metadata.jobZone)}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, jobZone: parseInt(v) as PipelineMetadata["jobZone"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Zone 1</SelectItem>
                  <SelectItem value="2">Zone 2</SelectItem>
                  <SelectItem value="3">Zone 3</SelectItem>
                  <SelectItem value="4">Zone 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Location, Industry, SLA Profile */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Location *</Label>
              <Select
                value={metadata.locationTier}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, locationTier: v as PipelineMetadata["locationTier"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tier_1">Tier 1 (Metro)</SelectItem>
                  <SelectItem value="tier_2">Tier 2 (Urban)</SelectItem>
                  <SelectItem value="tier_3">Tier 3 (Rural)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry *</Label>
              <Select
                value={metadata.industry}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, industry: v as PipelineMetadata["industry"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="diagnostic_lab">Diagnostic Lab</SelectItem>
                  <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>SLA Profile</Label>
              <Select
                value={metadata.defaultSLAProfile}
                onValueChange={(v) => setMetadata(prev => ({ ...prev, defaultSLAProfile: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!metadata.name.trim()}>
            Create Pipeline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
