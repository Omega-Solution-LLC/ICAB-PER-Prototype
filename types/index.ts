export type UserRole = 'student' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
};

export type Student = User & {
  role: 'student';
  studentNumber: string;
  enrollmentDate: string;
  principalId: string;
  firmName: string;
  contractStartDate: string;
  contractEndDate: string;
};

export type Principal = User & {
  role: 'admin';
  firmName: string;
  designation: string;
};

export type RecordStatus = 'draft' | 'submitted' | 'approved' | 'changes-requested' | 'in-progress' | 'completed' | 'not-started' | 'assessment-pending' | 'active' | 'at-risk' | 'transferred';

export type AuditEngagement = {
  id: string;
  studentId?: string;
  type?: 'statutory' | 'other' | 'non-audit';
  firmName?: string;
  principalName?: string;
  clientName: string;
  startDate: string;
  endDate: string;
  role: string;
  areaOfWork: string;
  daysWorked: number;
  status?: RecordStatus;
};

export type PracticalExperiencePeriod = {
  id: string;
  studentId: string;
  label: string;
  startDate: string;
  endDate: string;
  daysWorked: number;
  daysStatAudit: number;
  auditEngagements?: AuditEngagement[]; // New field
  daysOtherAudit: number;
  daysNonAudit: number;
  status: RecordStatus;
  principalFeedback?: string;
  approvedAt?: string;
  submittedAt?: string;
};

export type TechnicalModule = {
  id: string;
  name: string;
  description: string;
  iesReference: string;
  status: RecordStatus;
  attempts: number;
  lastAttemptAt?: string;
  score?: number;
  responseQuestion?: string;
  studentResponse?: string;
  employerFeedback?: string;
  approvedAt?: string;
};

export type SkillArea = {
  id: string;
  name: string;
  iesReference: string;
  description: string;
};

export type GuidedQuestion = {
  id: string;
  label: string;
  description?: string;
  minLength?: number;
};

export type SkillRecord = {
  id: string;
  studentId: string;
  skillAreaId: string;
  periodLabel: string;
  guidedAnswers: Record<string, string>;
  status: RecordStatus;
  principalFeedback?: string;
  submittedAt?: string;
};

export type EthicsTrainingProgress = {
  studentId: string;
  modulesCompleted: string[];
  assessmentAttempts: number;
  certificateIssued: boolean;
  examBarWarning: boolean;
};

export type EthicsModule = {
  id: string;
  name: string;
  description: string;
  status: RecordStatus;
  attempts: number;
  lastAttemptAt?: string;
  score?: number;
  responseQuestion?: string;
  studentResponse?: string;
  employerFeedback?: string;
  approvedAt?: string;
};
export type EthicsApplication = {
  id: string;
  studentId: string;
  periodLabel: string;
  answers: Record<string, string>;
  status: RecordStatus;
  principalFeedback?: string;
  submittedAt?: string;
  approvedAt?: string;
};

export type ApprovalRecordType = 'practical' | 'skill' | 'ethics-module' | 'ethics-application';
