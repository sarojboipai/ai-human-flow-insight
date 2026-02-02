import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { CustomerJobFunnelTable } from "@/components/customer/CustomerJobFunnelTable";
import { jobs } from "@/lib/mockData";

export default function CustomerDashboard() {
  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your customer portal</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Active Jobs</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Total Candidates</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Interviews Scheduled</h3>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>
      </div>
      
      {/* Jobs Pipeline Table */}
      <div className="mt-6">
        <CustomerJobFunnelTable jobs={jobs} />
      </div>
    </CustomerLayout>
  );
}
