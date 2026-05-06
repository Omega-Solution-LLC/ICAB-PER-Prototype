const fs = require('fs');
let code = fs.readFileSync('types/index.ts', 'utf8');

code = code.replace(
  /export type AuditEngagement = \{[^}]*\};/,
  `export type AuditEngagement = {
  id: string;
  studentId?: string;
  type?: 'statutory' | 'other';
  clientName: string;
  startDate: string;
  endDate: string;
  role: string;
  areaOfWork: string;
  daysWorked: number;
  status?: RecordStatus;
};`
);

fs.writeFileSync('types/index.ts', code);
