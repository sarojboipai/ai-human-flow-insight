import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="dashboard-title">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your SHIP dashboard preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="chart-container">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="section-title">Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Display Name</p>
                  <p className="text-sm text-muted-foreground">Saroj - Product Lead</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">saroj@swaasajobs.com</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Role</p>
                  <p className="text-sm text-muted-foreground">Admin</p>
                </div>
                <span className="text-sm text-muted-foreground">Contact admin to change</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="chart-container">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="section-title">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Daily summary email", description: "Receive daily metrics digest", enabled: true },
                { label: "HITL queue alerts", description: "Get notified when queue exceeds threshold", enabled: true },
                { label: "SLA breach warnings", description: "Alert when approaching SLA limits", enabled: true },
                { label: "AI performance alerts", description: "Notify on significant AI metric changes", enabled: false },
                { label: "Weekly reports", description: "Receive weekly performance reports", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Data Settings */}
          <div className="chart-container">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="section-title">Data Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Refresh Rate</p>
                  <p className="text-sm text-muted-foreground">How often dashboard data updates</p>
                </div>
                <Button variant="outline" size="sm">Hourly</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Default Date Range</p>
                  <p className="text-sm text-muted-foreground">Default time period for charts</p>
                </div>
                <Button variant="outline" size="sm">Last 30 days</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export Format</p>
                  <p className="text-sm text-muted-foreground">Default export file format</p>
                </div>
                <Button variant="outline" size="sm">CSV</Button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="chart-container">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="section-title">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <Button variant="outline" size="sm">30 minutes</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Audit Logs</p>
                  <p className="text-sm text-muted-foreground">View activity history</p>
                </div>
                <Button variant="outline" size="sm">View Logs</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
