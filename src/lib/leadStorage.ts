import { supabase } from "@/integrations/supabase/client";

export interface LeadData {
  id: string;
  fullName: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  phone: string;
  email: string;
  annualRevenue?: string;
  score?: number;
  level?: string;
  submittedAt: string;
}

export async function saveLeadData(lead: LeadData): Promise<string | null> {
  const { data, error } = await supabase.from("leads").insert({
    full_name: lead.fullName,
    company_name: lead.companyName,
    industry: lead.industry,
    employee_count: lead.employeeCount,
    phone: lead.phone,
    email: lead.email,
    annual_revenue: lead.annualRevenue || null,
  }).select("id").single();

  if (error) {
    console.error("Error saving lead:", error);
    return null;
  }
  return data.id;
}

export async function updateLeadScore(id: string, score: number, level: string) {
  const { error } = await supabase.from("leads").update({ score, level }).eq("id", id);
  if (error) console.error("Error updating lead score:", error);
}
