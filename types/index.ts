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

export type PracticalExperiencePeriod = {
  id: string;
  studentId: string;
  label: string;
  startDate: string;
  endDate: string;
  daysWorked: number;
  daysStatAudit: number;
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

export type EthicsScenario = {
  id: string;
  studentId: string;
  periodLabel: string;
  dilemma: string;
  description: string;
  principlesApplied: string[];
  actionsTaken: string;
  reflection: string;
  justification: string;
  status: RecordStatus;
  principalFeedback?: string;
  submittedAt?: string;
};

export type ApprovalRecordType = 'practical' | 'skill' | 'ethics-scenario';
