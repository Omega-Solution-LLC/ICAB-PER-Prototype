import { Student, Principal, PracticalExperiencePeriod, TechnicalModule, SkillRecord, EthicsTrainingProgress, EthicsScenario } from '@/types';
import { TECHNICAL_MODULES_SEED } from './constants';

export const DEMO_PRINCIPAL: Principal = {
  id: 'prin-001',
  name: 'M. Hasan FCA',
  email: 'hasan@aqasem.com',
  role: 'admin',
  firmName: 'A. Qasem & Co.',
  designation: 'Managing Partner'
};

export const DEMO_STUDENTS: Student[] = [
  {
    id: 'stu-001',
    name: 'Hasan Md. Rafiul Islam',
    email: 'hasan.r@student.icab.org',
    role: 'student',
    studentNumber: '31289',
    enrollmentDate: '2024-01-01',
    principalId: 'prin-001',
    firmName: 'A. Qasem & Co.',
    contractStartDate: '2024-01-01',
    contractEndDate: '2027-01-01',
    phone: '01711223344'
  },
  {
    id: 'stu-002',
    name: 'Nusrat Jahan',
    email: 'nusrat@student.icab.org',
    role: 'student',
    studentNumber: '31290',
    enrollmentDate: '2023-01-01',
    principalId: 'prin-001',
    firmName: 'A. Qasem & Co.',
    contractStartDate: '2023-01-01',
    contractEndDate: '2026-01-01',
  },
  {
    id: 'stu-003',
    name: 'Tanvir Ahmed',
    email: 'tanvir@student.icab.org',
    role: 'student',
    studentNumber: '31291',
    enrollmentDate: '2023-07-01',
    principalId: 'prin-001',
    firmName: 'A. Qasem & Co.',
    contractStartDate: '2023-07-01',
    contractEndDate: '2026-07-01',
  },
  {
    id: 'stu-004',
    name: 'Farhana Akter',
    email: 'farhana@student.icab.org',
    role: 'student',
    studentNumber: '31292',
    enrollmentDate: '2024-07-01',
    principalId: 'prin-001',
    firmName: 'A. Qasem & Co.',
    contractStartDate: '2024-07-01',
    contractEndDate: '2027-07-01',
  }
];

export const DEMO_PRACTICAL_PERIODS: PracticalExperiencePeriod[] = [
  {
    id: 'pe-1',
    studentId: 'stu-001',
    label: 'Year 1 - H1',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    daysWorked: 117,
    daysStatAudit: 50,
    daysOtherAudit: 39,
    daysNonAudit: 28,
    status: 'approved',
    principalFeedback: 'Good progress in initial months.',
    approvedAt: '2024-07-15',
    submittedAt: '2024-07-10'
  },
  {
    id: 'pe-2',
    studentId: 'stu-001',
    label: 'Year 1 - H2',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    daysWorked: 120,
    daysStatAudit: 60,
    daysOtherAudit: 40,
    daysNonAudit: 20,
    status: 'submitted',
    submittedAt: '2025-01-05'
  }
];

export const DEMO_TECHNICAL_MODULES: TechnicalModule[] = TECHNICAL_MODULES_SEED.map((m, i) => ({
  id: `tm-${i}`,
  ...m,
  status: i < 3 ? 'completed' : i < 5 ? 'in-progress' : 'not-started',
  attempts: i < 3 ? 1 : i < 5 ? 1 : 0,
  score: i < 3 ? 75 + i * 5 : undefined,
  lastAttemptAt: i < 5 ? '2024-05-10' : undefined,
}));

export const DEMO_SKILL_RECORDS: SkillRecord[] = [
  {
    id: 'sr-1',
    studentId: 'stu-001',
    skillAreaId: 'sk-1', // Intellectual
    periodLabel: 'Year 1 - H1',
    guidedAnswers: {
      situation: 'Complex revenue recognition issue',
      action: 'Researched IFRS 15 and proposed adjusting entries',
      result: 'Client accepted adjustments, audit partner commended the work'
    },
    status: 'approved',
    submittedAt: '2024-07-05'
  },
  {
    id: 'sr-2',
    studentId: 'stu-001',
    skillAreaId: 'sk-2', // Interpersonal
    periodLabel: 'Year 1 - H1',
    guidedAnswers: {
      situation: 'Client hesitant to provide requested documents',
      action: 'Held a brief meeting explaining the rationale and importance',
      result: 'Improved rapport and timely delivery'
    },
    status: 'approved',
    submittedAt: '2024-07-08'
  },
  {
    id: 'sr-3',
    studentId: 'stu-001',
    skillAreaId: 'sk-5', // IT
    periodLabel: 'Year 1 - H2',
    guidedAnswers: {
      situation: 'Large dataset sampling required',
      action: 'Used IDEA software to extract statistically valid samples',
      result: 'Saved 10 hours of manual effort'
    },
    status: 'submitted',
    submittedAt: '2025-01-10'
  }
];

export const DEMO_ETHICS_PROGRESS: EthicsTrainingProgress = {
  studentId: 'stu-001',
  modulesCompleted: ['mod-1', 'mod-2'],
  assessmentAttempts: 1,
  certificateIssued: false,
  examBarWarning: false,
};

export const DEMO_ETHICS_SCENARIOS: EthicsScenario[] = [
  {
    id: 'es-1',
    studentId: 'stu-001',
    periodLabel: 'Year 1 - H1',
    dilemma: 'Conflict of Interest Discovery',
    description: 'Found out a team member was related to the client CFO.',
    principlesApplied: ['Objectivity', 'Integrity'],
    actionsTaken: 'Reported to the engagement manager immediately.',
    reflection: 'Reaffirmed the importance of independence declarations.',
    justification: 'Necessary to maintain audit firm independence and comply with ICAB code.',
    status: 'approved',
    principalFeedback: 'Handled correctly according to firm policy.',
    submittedAt: '2024-07-12'
  },
  {
    id: 'es-2',
    studentId: 'stu-001',
    periodLabel: 'Year 1 - H2',
    dilemma: 'Client Gift Offer',
    description: 'Client offered expensive concert tickets during year-end audit.',
    principlesApplied: ['Objectivity', 'Professional Behavior'],
    actionsTaken: 'Politely declined the tickets citing firm policy.',
    reflection: 'Learned how to respectfully decline gifts without damaging client relations.',
    justification: 'Accepting could impair objectivity or appear to do so.',
    status: 'draft',
  }
];
