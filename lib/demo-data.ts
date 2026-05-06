import { Student, Principal, PracticalExperiencePeriod, TechnicalModule, SkillRecord, EthicsTrainingProgress, EthicsModule, EthicsApplication } from '@/types';
import { TECHNICAL_MODULES_SEED, ETHICS_MODULES_SEED } from './constants';

export const DEMO_PRINCIPAL: Principal = {
  id: 'prin-001',
  name: 'Sabbir Hosen FCA',
  email: 'sabbir@omegasolution.com',
  role: 'admin',
  firmName: 'Omega Solution',
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
    firmName: 'Omega Solution',
    contractStartDate: '2024-01-01',
    contractEndDate: '2026-12-31',
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
    firmName: 'Omega Solution',
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
    firmName: 'Omega Solution',
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
    firmName: 'Omega Solution',
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
    daysStatAudit: 60,    auditEngagements: [
      {
        id: "a1",
        clientName: "Alpha Corp Ltd",
        startDate: "2023-01-10",
        endDate: "2023-02-15",
        role: "Audit Junior",
        areaOfWork: "Inventory & Cash",
        daysWorked: 25
      },
      {
        id: "a2",
        clientName: "Beta Holdings Inc",
        startDate: "2023-03-01",
        endDate: "2023-04-10",
        role: "Audit Junior",
        areaOfWork: "Revenue & Receivables",
        daysWorked: 25
      }
    ],    daysOtherAudit: 40,
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
  }
];

export const DEMO_ETHICS_PROGRESS: EthicsTrainingProgress = {
  studentId: 'stu-001',
  modulesCompleted: ['mod-1', 'mod-2'],
  assessmentAttempts: 1,
  certificateIssued: false,
  examBarWarning: false,
};

export const DEMO_ETHICS_MODULES: EthicsModule[] = ETHICS_MODULES_SEED.map((m, i) => ({
  id: `em-${i}`,
  ...m,
  status: i < 2 ? 'completed' : i === 2 ? 'in-progress' : 'not-started',
  attempts: i < 2 ? 1 : i === 2 ? 1 : 0,
  score: i < 2 ? 80 + i * 5 : undefined,
  lastAttemptAt: i < 3 ? '2024-06-15' : undefined,
}));

export const DEMO_ETHICS_APPLICATIONS: EthicsApplication[] = [
  {
    id: 'ea-1',
    studentId: 'stu-001',
    periodLabel: 'Year 1 - H1',
    answers: {
      q1: 'During the year-end audit, I discovered a potential conflict of interest regarding a senior manager. I immediately reported it to the engagement partner.',
      q2: 'I maintained independence by refusing a valuable gift from a client, politely explaining our firm\'s strict policies regarding objectivity.',
      q3: 'I identified a discrepancy in the client\'s revenue recognition policy and questioned management until I received sufficient appropriate audit evidence.'
    },
    status: 'approved',
    submittedAt: '2024-07-15',
    approvedAt: '2024-07-20',
  }
];
