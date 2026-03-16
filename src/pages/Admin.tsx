import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, RefreshCw, Users, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/automate-e-logo.png";

const ADMIN_PASSWORD = "AutomateE2026!";

interface Lead {
  id: string;
  full_name: string;
  company_name: string;
  industry: string;
  employee_count: string;
  phone: string;
  email: string;
  annual_revenue: string | null;
  score: number | null;
  level: string | null;
  submitted_at: string;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const refresh = async () => {
    const { data } = await supabase.from("leads").select("*").order("submitted_at", { ascending: false });
    if (data) setLeads(data);
  };

  useEffect(() => {
    if (authenticated) refresh();
  }, [authenticated]);

  const downloadCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Full Name", "Company", "Industry", "Employees", "Phone", "Email", "Revenue", "Score", "Level", "Date"];
    const rows = leads.map((l) => [
      l.full_name, l.company_name, l.industry, l.employee_count, l.phone, l.email,
      l.annual_revenue || "", l.score?.toString() || "", l.level || "", l.submitted_at,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-card rounded-2xl shadow-elevated p-8 w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center gap-3 mb-2">
            <Lock className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Admin Access</h2>
          </div>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full hero-gradient text-primary-foreground">
            Unlock
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Automate E" className="h-8" />
            <h1 className="text-2xl font-bold text-foreground">Lead Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refresh} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button onClick={downloadCSV} className="gap-2 hero-gradient text-primary-foreground">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-4 md:p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">{leads.length} Total Leads</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Company", "Industry", "Employees", "Phone", "Email", "Score", "Level", "Date"].map((h) => (
                  <th key={h} className="text-left p-4 font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={9} className="p-8 text-center text-muted-foreground">No leads yet</td></tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium text-foreground whitespace-nowrap">{l.full_name}</td>
                    <td className="p-4 text-foreground whitespace-nowrap">{l.company_name}</td>
                    <td className="p-4 text-muted-foreground">{l.industry}</td>
                    <td className="p-4 text-muted-foreground">{l.employee_count}</td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">{l.phone}</td>
                    <td className="p-4 text-muted-foreground">{l.email}</td>
                    <td className="p-4 font-bold text-foreground">{l.score ?? "—"}</td>
                    <td className="p-4 text-foreground">{l.level ?? "—"}</td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">{new Date(l.submitted_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
