import { useState } from "react";
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
import { ArrowRight, FileText } from "lucide-react";
import { saveLeadData, type LeadData } from "@/lib/leadStorage";

interface Props {
  onSubmit: (leadId: string) => void;
}

const industries = [
  "Manufacturing", "Retail", "Construction", "Agriculture",
  "Mining", "Hospitality", "Healthcare", "Education",
  "Financial Services", "Transport & Logistics", "Technology", "Other",
];

const employeeRanges = ["1-10", "11-50", "51-200", "201-500", "500+"];
const revenueRanges = [
  "Under K500,000", "K500,000 - K2,000,000",
  "K2,000,000 - K10,000,000", "Over K10,000,000", "Prefer not to say",
];

export default function LeadCaptureForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    fullName: "", companyName: "", industry: "", employeeCount: "",
    phone: "", email: "", annualRevenue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.companyName.trim()) e.companyName = "Required";
    if (!form.industry) e.industry = "Required";
    if (!form.employeeCount) e.employeeCount = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const lead: LeadData = {
      id: crypto.randomUUID(),
      ...form,
      submittedAt: new Date().toISOString(),
    };
    const savedId = await saveLeadData(lead);
    setSubmitting(false);
    if (savedId) onSubmit(savedId);
  };

  const updateField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Free Digital Readiness Report
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Tell Us About Your Business
          </h2>
          <p className="text-muted-foreground">
            Complete the form below to receive your personalized digital readiness report after the assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 space-y-5">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="John Mwanza" className="mt-1.5" />
            {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input id="companyName" value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} placeholder="Acme Corp Ltd" className="mt-1.5" />
            {errors.companyName && <p className="text-destructive text-sm mt-1">{errors.companyName}</p>}
          </div>

          {/* Industry */}
          <div>
            <Label>Industry *</Label>
            <Select value={form.industry} onValueChange={(v) => updateField("industry", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select your industry" /></SelectTrigger>
              <SelectContent>
                {industries.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-destructive text-sm mt-1">{errors.industry}</p>}
          </div>

          {/* Employees */}
          <div>
            <Label>Number of Employees *</Label>
            <Select value={form.employeeCount} onValueChange={(v) => updateField("employeeCount", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select range" /></SelectTrigger>
              <SelectContent>
                {employeeRanges.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.employeeCount && <p className="text-destructive text-sm mt-1">{errors.employeeCount}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+260 97..." className="mt-1.5" />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@company.com" className="mt-1.5" />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Revenue */}
          <div>
            <Label>Annual Revenue Range (Optional)</Label>
            <Select value={form.annualRevenue} onValueChange={(v) => updateField("annualRevenue", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select range" /></SelectTrigger>
              <SelectContent>
                {revenueRanges.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="w-full accent-gradient text-foreground font-bold text-lg py-6 rounded-xl hover:scale-[1.02] transition-transform">
            Continue to Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </div>
    </section>
  );
}
