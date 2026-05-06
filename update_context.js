const fs = require('fs');

// Data Context
let contextCode = fs.readFileSync('contexts/data-context.tsx', 'utf8');

if (!contextCode.includes('auditEngagements: AuditEngagement[]')) {
    contextCode = contextCode.replace(
      /ethicsApplications: EthicsApplication\[\];/,
      `ethicsApplications: EthicsApplication[];\n  auditEngagements: import('@/types').AuditEngagement[];`
    );
    contextCode = contextCode.replace(
      /updateTechnicalModule: \(id: string, updates: Partial<TechnicalModule>\) => void;/,
      `updateTechnicalModule: (id: string, updates: Partial<TechnicalModule>) => void;\n  addAuditEngagement: (engagement: Omit<import('@/types').AuditEngagement, 'id' | 'status'>) => void;`
    );
    contextCode = contextCode.replace(
      /const \[ethicsApplications, setEthicsApplications\] = useState<EthicsApplication\[\]>\(DEMO_ETHICS_APPLICATIONS\);/,
      `const [ethicsApplications, setEthicsApplications] = useState<EthicsApplication[]>(DEMO_ETHICS_APPLICATIONS);\n  const [auditEngagements, setAuditEngagements] = useState<import('@/types').AuditEngagement[]>([]);`
    );
    contextCode = contextCode.replace(
      /const updateTechnicalModule = \(id: string, updates: Partial<TechnicalModule>\) => \{[\s\S]*?\};/,
      `const updateTechnicalModule = (id: string, updates: Partial<TechnicalModule>) => {
    setTechnicalModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const addAuditEngagement = (engagement: Omit<import('@/types').AuditEngagement, 'id' | 'status'>) => {
    const newEngagement: import('@/types').AuditEngagement = { ...engagement, id: \`audit-\${Date.now()}\`, status: 'submitted' };
    setAuditEngagements(prev => [...prev, newEngagement]);
  };`
    );
    contextCode = contextCode.replace(
      /students, principal, practicalPeriods, technicalModules, skillRecords, ethicsProgress, ethicsModules, ethicsApplications,/,
      `students, principal, practicalPeriods, technicalModules, skillRecords, ethicsProgress, ethicsModules, ethicsApplications, auditEngagements,`
    );
    contextCode = contextCode.replace(
      /updateEthicsModule, updateEthicsProgress, updateTechnicalModule/,
      `updateEthicsModule, updateEthicsProgress, updateTechnicalModule, addAuditEngagement`
    );
    fs.writeFileSync('contexts/data-context.tsx', contextCode);
}

// Student Data
let hookCode = fs.readFileSync('hooks/use-student-data.ts', 'utf8');
if (!hookCode.includes('auditEngagements')) {
    hookCode = hookCode.replace(
      /ethicsApplications,/,
      `ethicsApplications,\n    auditEngagements,\n    addAuditEngagement,`
    );
    hookCode = hookCode.replace(
      /return \{[\s\S]*?student,/,
      `return {
    student,
    auditEngagements,
    addAuditEngagement,`
    );
    fs.writeFileSync('hooks/use-student-data.ts', hookCode);
}
