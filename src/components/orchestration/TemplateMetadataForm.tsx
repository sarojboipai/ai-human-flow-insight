import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface TemplateMetadata {
  name: string;
  hiringType: "bulk" | "fast_track" | "niche";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  locationTier: "tier_1" | "tier_2" | "tier_3";
  industry: "hospital" | "diagnostic_lab" | "pharmaceuticals";
  defaultSLAProfile: string;
  defaultAICoverage: number;
  enterpriseOverrideAllowed: boolean;
  complianceRequired: boolean;
}

interface TemplateMetadataFormProps {
  metadata: TemplateMetadata;
  onChange: (updates: Partial<TemplateMetadata>) => void;
}

export function TemplateMetadataForm({ metadata, onChange }: TemplateMetadataFormProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between px-4 py-3 h-auto rounded-none hover:bg-muted/50"
        >
          <div className="flex items-center gap-4">
            <span className="font-medium text-sm">Template Configuration</span>
            {metadata.name && (
              <span className="text-sm text-muted-foreground">
                {metadata.name} • {metadata.profession} • Zone {metadata.jobZone} • {metadata.locationTier.replace("_", " ")} • {metadata.industry.replace("_", " ")}
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 py-4 bg-muted/30 border-t">
          <div className="grid grid-cols-8 gap-4">
            {/* Template Name */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="templateName">Template Name *</Label>
              <Input
                id="templateName"
                placeholder="e.g., Nurse Tier 1 Bulk Hiring"
                value={metadata.name}
                onChange={(e) => onChange({ name: e.target.value })}
              />
            </div>

            {/* Hiring Type */}
            <div className="space-y-2">
              <Label>Hiring Type *</Label>
              <Select
                value={metadata.hiringType}
                onValueChange={(v) => onChange({ hiringType: v as TemplateMetadata["hiringType"] })}
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

            {/* Profession */}
            <div className="space-y-2">
              <Label>Profession *</Label>
              <Select
                value={metadata.profession}
                onValueChange={(v) => onChange({ profession: v as TemplateMetadata["profession"] })}
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

            {/* Job Zone */}
            <div className="space-y-2">
              <Label>Job Zone *</Label>
              <Select
                value={String(metadata.jobZone)}
                onValueChange={(v) => onChange({ jobZone: parseInt(v) as TemplateMetadata["jobZone"] })}
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

            {/* Location Tier */}
            <div className="space-y-2">
              <Label>Location *</Label>
              <Select
                value={metadata.locationTier}
                onValueChange={(v) => onChange({ locationTier: v as TemplateMetadata["locationTier"] })}
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

            {/* Industry */}
            <div className="space-y-2">
              <Label>Industry *</Label>
              <Select
                value={metadata.industry}
                onValueChange={(v) => onChange({ industry: v as TemplateMetadata["industry"] })}
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

            {/* SLA Profile */}
            <div className="space-y-2">
              <Label>SLA Profile</Label>
              <Select
                value={metadata.defaultSLAProfile}
                onValueChange={(v) => onChange({ defaultSLAProfile: v })}
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

          {/* Second Row - Advanced Options */}
          <div className="grid grid-cols-6 gap-4 mt-4">
            {/* AI Coverage Target */}
            <div className="col-span-2 space-y-2">
              <Label>Default AI Coverage Target: {metadata.defaultAICoverage}%</Label>
              <Slider
                value={[metadata.defaultAICoverage]}
                onValueChange={([v]) => onChange({ defaultAICoverage: v })}
                min={0}
                max={100}
                step={5}
              />
            </div>

            {/* Toggles */}
            <div className="col-span-2 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={metadata.enterpriseOverrideAllowed}
                  onCheckedChange={(v) => onChange({ enterpriseOverrideAllowed: v })}
                />
                <Label className="text-sm font-normal cursor-pointer">
                  Enterprise Override
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={metadata.complianceRequired}
                  onCheckedChange={(v) => onChange({ complianceRequired: v })}
                />
                <Label className="text-sm font-normal cursor-pointer">
                  Compliance Required
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
