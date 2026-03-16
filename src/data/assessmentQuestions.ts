export interface Question {
  id: number;
  question: string;
  options: { label: string; text: string; score: number }[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "How does your company currently manage accounting records?",
    options: [
      { label: "A", text: "Paper records or spreadsheets", score: 1 },
      { label: "B", text: "Basic accounting software", score: 2 },
      { label: "C", text: "Integrated accounting system", score: 3 },
      { label: "D", text: "Fully automated ERP platform", score: 4 },
    ],
  },
  {
    id: 2,
    question: "How do you issue invoices to customers?",
    options: [
      { label: "A", text: "Manual invoices", score: 1 },
      { label: "B", text: "Excel or printed invoices", score: 2 },
      { label: "C", text: "Digital invoices using accounting software", score: 3 },
      { label: "D", text: "Smart invoicing integrated with tax systems", score: 4 },
    ],
  },
  {
    id: 3,
    question: "Does your business system integrate with Zambia Revenue Authority Smart Invoice requirements?",
    options: [
      { label: "A", text: "No integration", score: 1 },
      { label: "B", text: "We manually prepare reports", score: 2 },
      { label: "C", text: "Partial digital integration", score: 3 },
      { label: "D", text: "Fully integrated smart invoicing system", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How do you manage stock or inventory?",
    options: [
      { label: "A", text: "Manual counting", score: 1 },
      { label: "B", text: "Excel spreadsheets", score: 2 },
      { label: "C", text: "Inventory software", score: 3 },
      { label: "D", text: "Fully integrated inventory management system", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How do departments share business information?",
    options: [
      { label: "A", text: "Paper documents or messaging apps", score: 1 },
      { label: "B", text: "Emailing files between teams", score: 2 },
      { label: "C", text: "Shared cloud storage systems", score: 3 },
      { label: "D", text: "Fully integrated company management platform", score: 4 },
    ],
  },
  {
    id: 6,
    question: "Do you generate automated business reports?",
    options: [
      { label: "A", text: "No reporting tools", score: 1 },
      { label: "B", text: "Reports created manually", score: 2 },
      { label: "C", text: "Semi-automated reports", score: 3 },
      { label: "D", text: "Real-time automated dashboards", score: 4 },
    ],
  },
  {
    id: 7,
    question: "How easy is it to track your company's financial performance?",
    options: [
      { label: "A", text: "Very difficult", score: 1 },
      { label: "B", text: "Requires manual calculations", score: 2 },
      { label: "C", text: "Monthly reporting available", score: 3 },
      { label: "D", text: "Real-time financial dashboards", score: 4 },
    ],
  },
  {
    id: 8,
    question: "Are your business systems connected to each other?",
    options: [
      { label: "A", text: "No integration", score: 1 },
      { label: "B", text: "Limited integration", score: 2 },
      { label: "C", text: "Most systems connected", score: 3 },
      { label: "D", text: "Fully integrated business platform", score: 4 },
    ],
  },
  {
    id: 9,
    question: "How long does it take to prepare tax reports?",
    options: [
      { label: "A", text: "Several days", score: 1 },
      { label: "B", text: "Several hours", score: 2 },
      { label: "C", text: "Less than an hour", score: 3 },
      { label: "D", text: "Automatically generated", score: 4 },
    ],
  },
  {
    id: 10,
    question: "How prepared is your business for digital transformation?",
    options: [
      { label: "A", text: "Not prepared", score: 1 },
      { label: "B", text: "Exploring digital tools", score: 2 },
      { label: "C", text: "Currently implementing systems", score: 3 },
      { label: "D", text: "Fully digital organization", score: 4 },
    ],
  },
  {
    id: 11,
    question: "How do employees request leave, sick days, or other time off in your company?",
    options: [
      { label: "A", text: "Employees request leave verbally or using paper forms, and approvals are recorded manually", score: 1 },
      { label: "B", text: "Employees submit leave requests through email, messaging apps, or informal digital communication", score: 2 },
      { label: "C", text: "Employees request leave through a digital HR system or online form, but approvals and records may still require some manual processing", score: 3 },
      { label: "D", text: "Employees use a fully integrated employee self-service system where leave requests, approvals, and records are managed automatically within the company's management platform", score: 4 },
    ],
  },
  {
    id: 12,
    question: "How do employees check in and check out when reporting for work?",
    options: [
      { label: "A", text: "Attendance is recorded manually using paper registers or supervisors tracking employee arrival times", score: 1 },
      { label: "B", text: "Employees check in using spreadsheets or basic digital tools that require manual updates", score: 2 },
      { label: "C", text: "Employees use a digital attendance system such as biometric scanners, swipe cards, or attendance software, but the data is not fully integrated with payroll or HR systems", score: 3 },
      { label: "D", text: "Employees check in and out using an automated attendance system that is fully integrated with HR, payroll, and company management systems", score: 4 },
    ],
  },
];

export interface ResultLevel {
  level: number;
  title: string;
  scoreRange: [number, number];
  message: string;
  recommendation: string;
}

export const resultLevels: ResultLevel[] = [
  {
    level: 1,
    title: "Manual Business",
    scoreRange: [12, 21],
    message:
      "Your results suggest that most of your business processes are still handled manually or through basic tools such as paper records, spreadsheets, or disconnected systems. While this approach may work for smaller operations, it often creates operational bottlenecks as the company grows. Manual processes increase the likelihood of errors, slow down reporting, and make it difficult to maintain clear financial visibility.\n\nBusinesses at this level may also face compliance challenges as regulatory requirements increasingly require digital reporting and structured record keeping.",
    recommendation:
      "The next step is digitizing and centralizing your business operations. Implementing an integrated ERP platform such as Automate E can help streamline accounting, invoicing, inventory management, and reporting into one unified system. This transition reduces manual workload, minimizes errors, and gives leadership better visibility into the company's financial performance.",
  },
  {
    level: 2,
    title: "Basic Digital Business",
    scoreRange: [22, 30],
    message:
      "Your business has begun adopting digital tools, which is a positive step toward modernization. However, many of your systems may still operate independently, requiring manual data transfers between platforms. This fragmented structure often leads to duplicate work, inconsistent records, and slower decision-making.",
    recommendation:
      "Your organization would benefit from integrating these systems into a unified platform. A comprehensive ERP solution such as Automate E connects accounting, invoicing, inventory management, and reporting into one centralized environment, allowing data to flow automatically between departments.",
  },
  {
    level: 3,
    title: "Growing Digital Company",
    scoreRange: [31, 38],
    message:
      "Your company has already implemented several digital systems and is operating at a relatively advanced stage of technology adoption. Many of your operational processes are supported by software, and your organization likely benefits from structured reporting and improved visibility.\n\nHowever, there may still be opportunities to increase efficiency through deeper automation and stronger integration between systems.",
    recommendation:
      "To reach the next level of operational maturity, your business should focus on expanding automation and improving system integration. A fully integrated ERP platform like Automate E can unify workflows, generate real-time dashboards, and automate compliance reporting.",
  },
  {
    level: 4,
    title: "Smart Digital Enterprise",
    scoreRange: [39, 48],
    message:
      "Your business demonstrates a high level of digital maturity. Most of your operations appear to be supported by integrated systems, and your organization likely benefits from efficient workflows and strong reporting capabilities.\n\nCompanies operating at this level are well positioned for growth because they can make strategic decisions using accurate and timely data.",
    recommendation:
      "The next step for your organization is optimization and advanced analytics. By leveraging ERP platforms such as Automate E, companies can implement advanced dashboards, predictive analytics, and intelligent reporting systems that provide deeper insights into operational performance.",
  },
];

export function getResultLevel(score: number): ResultLevel {
  return resultLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  ) || resultLevels[0];
}
