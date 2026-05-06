import {
  GuidedQuestion,
  RecordStatus,
  SkillArea,
  TechnicalModule,
  EthicsModule,
} from "@/types";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  FileBarChart,
  FileText,
  Home,
  UserCircle,
  Users,
} from "lucide-react";

export const ICAB_PALETTE = {
  red: "#9e0b0f",
  blush: "#f0d9d9",
  slate: "#4c4c4e",
  rose: "#d18a8c",
  crimson: "#b44346",
  petal: "#e0b0b1",
  clay: "#bd5b5e",
  wine: "#a82427",
};

export const PILLARS = [
  {
    id: "practical",
    label: "Work Experience",
    icon: Briefcase,
    route: "/student/practical-experience",
  },
  {
    id: "technical",
    label: "Technical Development",
    icon: BookOpen,
    route: "/student/technical-development",
  },
  {
    id: "skills",
    label: "Professional Skill Development",
    icon: Award,
    route: "/student/skills-development",
  },
];

export const TECHNICAL_MODULES_SEED: Omit<
  TechnicalModule,
  "status" | "attempts" | "id"
>[] = [
  {
    name: "Financial Accounting",
    description: "Advanced financial reporting",
    iesReference: "IES 2",
  },
  {
    name: "Management Accounting",
    description: "Costing and performance management",
    iesReference: "IES 2",
  },
  {
    name: "Auditing and Assurance",
    description: "Statutory audit principles",
    iesReference: "IES 2",
  },
  {
    name: "Taxation",
    description: "Corporate and personal tax",
    iesReference: "IES 2",
  },
  {
    name: "Business Laws",
    description: "Corporate law context",
    iesReference: "IES 2",
  },
  {
    name: "IT Systems and Controls",
    description: "IT audit and controls",
    iesReference: "IES 2",
  },
  {
    name: "Economics",
    description: "Macro and micro economics",
    iesReference: "IES 2",
  },
  {
    name: "Quantitative Methods",
    description: "Statistical analysis",
    iesReference: "IES 2",
  },
  {
    name: "Financial Management",
    description: "Corporate finance",
    iesReference: "IES 2",
  },
  {
    name: "Strategic Business Management",
    description: "Business strategy formulation",
    iesReference: "IES 2",
  },
  {
    name: "Ethics and Professional Skills",
    description: "Ethical judgment in practice",
    iesReference: "IES 2",
  },
];

export const SKILL_AREAS_SEED: SkillArea[] = [
  {
    id: "sk-1",
    name: "Intellectual Skills",
    iesReference: "IES 3",
    description: "Problem-solving and decision making",
  },
  {
    id: "sk-2",
    name: "Interpersonal",
    iesReference: "IES 3",
    description: "Teamwork and effective communication",
  },
  {
    id: "sk-3",
    name: "Personal Skills",
    iesReference: "IES 3",
    description: "Self-management and continuous learning",
  },
  {
    id: "sk-4",
    name: "Organizational Skills",
    iesReference: "IES 3",
    description: "Leadership and resource management",
  },
];

export const ETHICS_MODULES_SEED: Omit<
  EthicsModule,
  "status" | "attempts" | "id"
>[] = [
  {
    name: "Professional skepticism and judgment",
    description: "Apply a questioning mindset and make balanced professional judgments.",
    responseQuestion: "Apply an inquiring mind when collecting and assessing data and information.",
  },
  {
    name: "Ethical principles",
    description: "Uphold ethical standards and professional conduct in practice.",
    responseQuestion: "Apply techniques to reduce bias when solving problems, forming judgments, making informed decisions, reaching well-reasoned conclusions, and communicating with a range of stakeholders.",
  },
  {
    name: "Commitment to the public interest",
    description: "Act in the public interest and protect stakeholder trust.",
    responseQuestion: "Apply critical thinking when identifying and evaluating alternatives to determine an appropriate course of action.",
  },
];

export const ETHICS_GUIDED_QUESTIONS: GuidedQuestion[] = [
  {
    id: "actions",
    label: "Actions Taken",
    description: "What steps did you take to resolve the dilemma?",
    minLength: 50,
  },
  {
    id: "reflection",
    label: "Reflection",
    description: "What did you learn from this scenario?",
    minLength: 50,
  },
  {
    id: "justification",
    label: "Justification",
    description: "Why were your actions appropriate in this context?",
    minLength: 50,
  },
];

export const SKILL_GUIDED_QUESTIONS: GuidedQuestion[] = [
  {
    id: "situation",
    label: "Situation / Task",
    description: "Describe the context and your specific problem.",
  },
  {
    id: "action",
    label: "Action",
    description: "What specific actions did you take?",
  },
  {
    id: "result",
    label: "Result",
    description: "What was the outcome and what did you learn?",
  },
];

export const STATUS_VARIANTS: Record<
  RecordStatus,
  { label: string; colorClass: string }
> = {
  approved: { label: "Approved", colorClass: "bg-green-600 text-white" },
  completed: { label: "Completed", colorClass: "bg-green-600 text-white" },
  submitted: { label: "Submitted", colorClass: "bg-icab-clay text-white" },
  "assessment-pending": {
    label: "Assessment Pending",
    colorClass: "bg-icab-clay text-white",
  },
  draft: { label: "Draft", colorClass: "bg-icab-petal text-icab-slate" },
  "not-started": {
    label: "Not Started",
    colorClass: "bg-icab-petal text-icab-slate",
  },
  "changes-requested": {
    label: "Changes Requested",
    colorClass: "bg-icab-wine text-white",
  },
  "in-progress": {
    label: "In Progress",
    colorClass: "bg-icab-crimson text-white",
  },
  active: { label: "Active", colorClass: "bg-green-100 text-green-800" },
  "at-risk": { label: "At Risk", colorClass: "bg-amber-100 text-amber-800" },
  transferred: {
    label: "Transferred",
    colorClass: "bg-slate-200 text-slate-800",
  },
};

export const STUDENT_NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/student/dashboard",
  },
  {
    title: "Work Experience",
    icon: Briefcase,
    href: "/student/practical-experience",
  },
  {
    title: "Technical Development",
    icon: BookOpen,
    href: "/student/technical-development",
  },
  { title: "Professional Skill Development", icon: Award, href: "/student/skills-development" },
  {
    title: "Ethics Training",
    icon: CheckCircle,
    href: "/student/ethics-training",
  },
  {
    title: "Ethics Application",
    icon: FileBarChart,
    href: "/student/ethics-application",
  },
  { title: "Profile", icon: UserCircle, href: "/student/profile" },
];

export const ADMIN_NAV_ITEMS = [
  { title: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { title: "Students Overview", icon: Users, href: "/admin/students" },
  { title: "Approvals", icon: CheckCircle, href: "/admin/approvals" },
  { title: "Reports", icon: FileText, href: "/admin/reports" },
  { title: "Profile", icon: UserCircle, href: "/admin/profile" },
];
