import { Student, Principal, PracticalExperiencePeriod, TechnicalModule, SkillRecord, EthicsTrainingProgress, EthicsModule, EthicsApplication, AuditEngagement } from '@/types';
import { ETHICS_MODULES_SEED } from './constants';

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

export const DEMO_STATUTORY_AUDITS: AuditEngagement[] = [
  {
    id: "stat-a1",
    studentId: "stu-001",
    type: "statutory",
    firmName: "Omega Solution",
    principalName: "Sabbir Hosen FCA",
    clientName: "Alpha Manufacturing Ltd",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    role: "Audit Associate",
    areaOfWork: "Statutory Financial Audit",
    daysWorked: 50,
    status: "approved",
  },
  {
    id: "stat-a2",
    studentId: "stu-001",
    type: "statutory",
    firmName: "Omega Solution",
    principalName: "Sabbir Hosen FCA",
    clientName: "Beta Textile Group",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    role: "Audit Associate",
    areaOfWork: "Statutory Financial Audit",
    daysWorked: 60,
    status: "submitted",
  },
];

export const DEMO_OTHER_AUDITS: AuditEngagement[] = [
  {
    id: "other-a1",
    studentId: "stu-001",
    type: "other",
    firmName: "Omega Solution",
    principalName: "Sabbir Hosen FCA",
    clientName: "Gamma Services Ltd",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    role: "Audit Junior",
    areaOfWork: "Internal/Operational Audit",
    daysWorked: 39,
    status: "approved",
  },
  {
    id: "other-a2",
    studentId: "stu-001",
    type: "other",
    firmName: "Omega Solution",
    principalName: "Sabbir Hosen FCA",
    clientName: "Delta Trading PLC",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    role: "Audit Junior",
    areaOfWork: "Internal/Operational Audit",
    daysWorked: 40,
    status: "submitted",
  },
];

export const DEMO_AUDIT_ENGAGEMENTS: AuditEngagement[] = [
  ...DEMO_STATUTORY_AUDITS,
  ...DEMO_OTHER_AUDITS,
];

const AUDIT_ASSURANCE_QUESTIONS = [
  "Explain the objectives, elements, and phases of audit & assurance engagements.",
  "Apply International Standards on Auditing (SAs) or other relevant auditing standards, and laws and regulations applicable to an audit of financial statements.",
  "Assess the risks of material misstatement in the financial statements and consider the effect on the audit strategy.",
  "Apply appropriate audit procedures and automated tools and techniques.",
  "Identify relevant and reliable audit evidence to form judgments, make informed decisions, and reach well-reasoned conclusions.",
  "Explain how contradictory audit evidence may affect judgments, decisions, and conclusions.",
  "Evaluate whether sufficient and appropriate audit evidence has been obtained and documented.",
];

const FINANCIAL_MANAGEMENT_QUESTIONS = [
  "Compare the various sources of financing available to an organization, including bank financing, financial instruments, and bond, equity and treasury markets.",
  "Analyze an organization's cash flow and working capital requirements.",
  "Analyze the current and anticipated financial performance and position of an organization, using techniques including ratio analysis, trend analysis, cash flow analysis, and scenario analysis.",
  "Evaluate the appropriateness of the components used to calculate an organization's cost of capital.",
  "Evaluate capital investment decisions using capital budgeting techniques.",
  "Explain income, asset-based, and market valuation approaches used for investment decisions, business planning, and long-term financial management.",
];

const MANAGEMENT_ACCOUNTING_QUESTIONS = [
  "Prepare data and information to support management decision making, including setting metrics and targets, planning and budgeting, cost management, quality control, performance measurement, and comparative analysis.",
  "Apply appropriate technology and techniques to support management decision making, including product costing, variance analysis, inventory management, budgeting and forecasting, and value chain analysis.",
  "Apply appropriate technology and techniques to analyze cost behavior and the drivers of costs.",
  "Analyze data and information to consider alternatives and enable management to make informed decisions.",
  "Evaluate the performance of an organization and its business segments, products, and services against metrics and targets.",
];

const TAXATION_QUESTIONS = [
  "Explain national taxation compliance and filing requirements.",
  "Prepare direct and indirect tax calculations for individuals and organizations.",
  "Analyze the taxation issues associated with non-complex international transactions.",
  "Explain the differences between tax planning, tax avoidance, and tax evasion.",
];

const FINANCIAL_ACCOUNTING_QUESTIONS = [
  "Apply accounting principles to transactions and other events and conditions based on facts and circumstances.",
  "Apply International Financial Reporting Standards (IFRSs) or other relevant standards to transactions and other events and conditions based on facts and circumstances.",
  "Evaluate the appropriateness of policies used to prepare general purpose financial reports.",
  "Evaluate connected information when preparing general purpose financial reports.",
  "Prepare general purpose financial reports, including consolidated financial statements, in accordance with IFRSs or other relevant standards.",
  "Interpret general purpose financial reports.",
];

const GOVERNANCE_RISK_MGMT_CONTROL_QUESTIONS = [
  "Explain the principles of good governance, including the rights and responsibilities of owners, investors, and those charged with governance; and the role of stakeholders in governance, disclosure, and transparency requirements.",
  "Analyze the components of an organization's governance framework.",
  "Analyze an organization's risks and opportunities using a risk management framework.",
  "Analyze the components of internal control related to external reporting.",
  "Analyze the adequacy of systems, processes and controls for collecting, generating, storing, accessing, using, sharing, or reporting data and information.",
];

const BUSINESS_LAWS_AND_REGULATIONS_QUESTIONS = [
  "Explain the laws and regulations that govern the different forms of legal entities.",
  "Explain the laws and regulations applicable to the context in which professional accountants operate.",
  "Apply data protection and privacy regulations when collecting, generating, storing, accessing, using, sharing, or reporting data and information.",
];

const INFORMATION_COMMUNICATION_TECHNOLOGIES_QUESTIONS = [
  "Explain the impact of Information and Communications Technologies (ICT) developments on an organization's environment and business model.",
  "Explain how ICT supports data analysis and decision making.",
  "Explain how ICT supports the identification, reporting and management of risk in an organization.",
  "Use ICT to analyze data and information.",
  "Use ICT to enhance the efficiency and effectiveness of communication.",
  "Apply ICT to enhance the efficiency and effectiveness of an organization's systems.",
  "Analyze the adequacy of ICT processes and controls.",
  "Identify improvements to ICT processes and controls.",
];

const BUSINESS_AND_ORGANIZATIONAL_STRATEGY_QUESTIONS = [
  "Describe the context in which an organization operates, including the primary political, economic, sociocultural, technological, environmental, legal, and regulatory aspects.",
  "Analyze an organization's business model, including its value chain.",
  "Analyze geopolitical, economic, social, and other factors that affect international trade and finance.",
  "Identify the features of globalization, including the role of multinational organizations and emerging markets.",
  "Describe the effect of changes in macroeconomic indicators on business activity.",
  "Explain the purpose and importance of different types of functional and operational areas within organizations.",
  "Analyze the external and internal factors that affect an organization's business model, including its value chain, and its business strategy.",
];

export const DEMO_TECHNICAL_MODULES: TechnicalModule[] = [
  ...AUDIT_ASSURANCE_QUESTIONS.map((question, i) => ({
    id: `tm-audit-assurance-${i + 1}`,
    name: "Audit & Assurance",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-06-30",
    approvedAt: "2024-07-05",
    studentResponse:
      "I applied audit planning, risk assessment, evidence gathering, and conclusion documentation in line with engagement objectives and applicable standards.",
    employerFeedback:
      "Good response. You demonstrated clear understanding of audit and assurance principles and practical application.",
  })),
  ...FINANCIAL_MANAGEMENT_QUESTIONS.map((question, i) => ({
    id: `tm-financial-management-${i + 1}`,
    name: "Financial Management",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-10",
    approvedAt: "2024-07-15",
    studentResponse:
      "I analyzed funding options, cash flow behavior, investment appraisal, and valuation methods to support practical financial management decisions.",
    employerFeedback:
      "Strong financial analysis and good linkage between financing, performance, and valuation decisions.",
  })),
  ...MANAGEMENT_ACCOUNTING_QUESTIONS.map((question, i) => ({
    id: `tm-management-accounting-${i + 1}`,
    name: "Management Accounting",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-20",
    approvedAt: "2024-07-25",
    studentResponse:
      "I used management accounting techniques to analyse performance, cost behaviour and decision support information for management reviews.",
    employerFeedback:
      "Good application of costing methods and decision-useful analysis. The response shows a solid understanding of management accounting information needs.",
  })),
  ...TAXATION_QUESTIONS.map((question, i) => ({
    id: `tm-taxation-${i + 1}`,
    name: "Taxation",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-30",
    approvedAt: "2024-08-02",
    studentResponse:
      "I completed taxation work demonstrating compliance, accurate calculation, and clear understanding of national and international tax issues.",
    employerFeedback:
      "Well presented taxation reasoning and awareness of compliance and planning distinctions. The answers reflect solid practical knowledge.",
  })),
  ...FINANCIAL_ACCOUNTING_QUESTIONS.map((question, i) => ({
    id: `tm-financial-accounting-${i + 1}`,
    name: "Financial accounting and report",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-08-05",
    approvedAt: "2024-08-10",
    studentResponse:
      "I prepared and interpreted financial reports using IFRS-based standards, ensuring clarity and compliance with reporting requirements.",
    employerFeedback:
      "Strong financial reporting understanding and practical application of accounting policies. Good explanation of reporting criteria and interpretation.",
  })),

  ...GOVERNANCE_RISK_MGMT_CONTROL_QUESTIONS.map((question, i) => ({
    id: `tm-governance-risk-${i + 1}`,
    name: "Governance, risk management and internal control",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-08-12",
    approvedAt: "2024-08-15",
    studentResponse:
      "I reviewed governance and risk controls, identifying key reporting safeguards and demonstrating understanding of governance frameworks.",
    employerFeedback:
      "Clear insight into governance and control structures. The response shows strong understanding of risk and reporting controls.",
  })),
  ...BUSINESS_LAWS_AND_REGULATIONS_QUESTIONS.map((question, i) => ({
    id: `tm-business-laws-${i + 1}`,
    name: "Business laws and regulations",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-08-18",
    approvedAt: "2024-08-20",
    studentResponse:
      "I analysed applicable legal entity rules and regulatory requirements, and applied data protection practices in professional engagements.",
    employerFeedback:
      "Good grasp of business law fundamentals and how they apply to accounting practice. Your response shows a practical approach to compliance and privacy.",
  })),
  ...INFORMATION_COMMUNICATION_TECHNOLOGIES_QUESTIONS.map((question, i) => ({
    id: `tm-ict-${i + 1}`,
    name: "Information and communication technologies",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-08-22",
    approvedAt: "2024-08-25",
    studentResponse:
      "I explained how ICT supports decision-making, risk management, controls, and operational efficiency in a practical organizational context.",
    employerFeedback:
      "Good understanding of ICT impacts and controls. The response demonstrates how technology supports analysis, reporting and business efficiency.",
  })),
  ...BUSINESS_AND_ORGANIZATIONAL_STRATEGY_QUESTIONS.map((question, i) => ({
    id: `tm-business-strategy-${i + 1}`,
    name: "Business and organizational strategy",
    description: "Professional development record",
    iesReference: "IES 2",
    responseQuestion: question,
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-08-28",
    approvedAt: "2024-08-30",
    studentResponse:
      "I assessed the organizational context, business model and external/internal factors to support strategic decision-making and global operations.",
    employerFeedback:
      "Strong strategic understanding and clear analysis of the business environment. The response shows good insight into organizational strategy and market factors.",
  })),
];

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
  modulesCompleted: [],
  assessmentAttempts: 0,
  certificateIssued: false,
  examBarWarning: false,
};

const ETHICS_RESPONSE_PROMPTS = [
  "Apply an inquiring mind when collecting and assessing data and information.",
  "Apply techniques to reduce bias when solving problems, forming judgments, making informed decisions, reaching well-reasoned conclusions, and communicating with a range of stakeholders.",
  "Apply critical thinking when identifying and evaluating alternatives to determine an appropriate course of action.",
];

export const DEMO_ETHICS_MODULES: EthicsModule[] = [
  {
    id: 'em-0',
    ...ETHICS_MODULES_SEED[0],
    responseQuestion: ETHICS_RESPONSE_PROMPTS[0],
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-06-15",
    approvedAt: "2024-06-20",
    studentResponse:
      "I used an inquiring mind to gather, evaluate, and verify information, ensuring that evidence was sufficient for decision-making.",
    employerFeedback:
      "Good demonstration of professional skepticism and judgement. Your evidence evaluation and inquiry process were strong.",
  },
  {
    id: 'em-1',
    ...ETHICS_MODULES_SEED[0],
    responseQuestion: ETHICS_RESPONSE_PROMPTS[1],
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-06-18",
    approvedAt: "2024-06-22",
    studentResponse:
      "I applied structured judgment techniques and bias reduction methods while evaluating alternatives and communicating with stakeholders.",
    employerFeedback:
      "Strong bias awareness and well-reasoned conclusions. The communication of judgments to stakeholders was clear and appropriate.",
  },
  {
    id: 'em-2',
    ...ETHICS_MODULES_SEED[0],
    responseQuestion: ETHICS_RESPONSE_PROMPTS[2],
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-06-20",
    approvedAt: "2024-06-24",
    studentResponse:
      "I critically evaluated available options, identified risks, and selected an appropriate course of action based on facts and professional standards.",
    employerFeedback:
      "Good critical thinking and evaluation of alternatives. The selected action showed sound professional judgement.",
  },
  {
    id: 'em-3',
    ...ETHICS_MODULES_SEED[1],
    responseQuestion: "Explain the importance of relevant ethical requirements to all professional activities.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-01",
    approvedAt: "2024-07-05",
    studentResponse:
      "I ensured ethical requirements were considered across all tasks, demonstrating how they support trust, accountability and public confidence.",
    employerFeedback:
      "Good overview of ethical requirements and their role in professional work. Well articulated.",
  },
  {
    id: 'em-4',
    ...ETHICS_MODULES_SEED[1],
    responseQuestion: "Apply relevant ethical requirements to all professional activities.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-03",
    approvedAt: "2024-07-07",
    studentResponse:
      "I applied the ethical framework consistently across client work, ensuring each activity met integrity, objectivity, and confidentiality standards.",
    employerFeedback:
      "Strong practical use of ethics in daily work. Nice application of requirements to real tasks.",
  },
  {
    id: 'em-5',
    ...ETHICS_MODULES_SEED[1],
    responseQuestion: "Apply fundamental principles of ethics when collecting, generating, storing, accessing, using, sharing, or reporting data and information.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-05",
    approvedAt: "2024-07-09",
    studentResponse:
      "I protected data confidentiality and used ethical safeguards throughout the information lifecycle, including secure sharing and access controls.",
    employerFeedback:
      "Good focus on ethical handling of data and clear application of principles.",
  },
  {
    id: 'em-6',
    ...ETHICS_MODULES_SEED[1],
    responseQuestion: "Identify threats to compliance with the fundamental principles of ethics.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-07",
    approvedAt: "2024-07-11",
    studentResponse:
      "I identified familiarity, self-interest and intimidation threats, and outlined safeguards to maintain ethical compliance.",
    employerFeedback:
      "Good threat identification and appropriate safeguard awareness.",
  },
  {
    id: 'em-7',
    ...ETHICS_MODULES_SEED[1],
    responseQuestion: "Evaluate the significance of threats to compliance with the fundamental principles of ethics and respond appropriately.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-09",
    approvedAt: "2024-07-13",
    studentResponse:
      "I evaluated the risk level of each ethical threat and applied safeguards or reporting protocols where needed to protect professional integrity.",
    employerFeedback:
      "Well evaluated ethical threats and sound safeguarding response.",
  },
  {
    id: 'em-8',
    ...ETHICS_MODULES_SEED[2],
    responseQuestion: "Explain the role and importance of ethics within the profession and in relation to the concept of social responsibility.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-15",
    approvedAt: "2024-07-19",
    studentResponse:
      "I described how ethical behaviour builds trust in the profession and supports broader social responsibility through accountable, transparent practice.",
    employerFeedback:
      "Good linkage of professional ethics to social responsibility. The response shows strong appreciation for public trust.",
  },
  {
    id: 'em-9',
    ...ETHICS_MODULES_SEED[2],
    responseQuestion: "Explain the role and importance of ethics in relation to business and good governance.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-17",
    approvedAt: "2024-07-21",
    studentResponse:
      "I explained how ethical standards underpin sound governance, support accountability, and help organizations operate responsibly.",
    employerFeedback:
      "Clear explanation of ethics in governance. Well connected to accountability and business integrity.",
  },
  {
    id: 'em-10',
    ...ETHICS_MODULES_SEED[2],
    responseQuestion: "Analyze the interrelationship of ethics and law, including the relationship between laws, regulations, and the public interest.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-19",
    approvedAt: "2024-07-23",
    studentResponse:
      "I analysed how ethical expectations and legal requirements overlap, and how both serve the public interest by protecting stakeholders.",
    employerFeedback:
      "Good analysis of ethics-law interplay. The response clearly shows how public interest is supported by both.",
  },
  {
    id: 'em-11',
    ...ETHICS_MODULES_SEED[2],
    responseQuestion: "Analyze the consequences of unethical behavior to the individual, the profession, and the public.",
    status: "approved",
    attempts: 1,
    lastAttemptAt: "2024-07-21",
    approvedAt: "2024-07-25",
    studentResponse:
      "I analysed the damage unethical actions can cause to reputation, professional credibility, and public confidence in the profession.",
    employerFeedback:
      "Strong understanding of the wider consequences of unethical behaviour. Good focus on reputation and public impact.",
  },
];

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
