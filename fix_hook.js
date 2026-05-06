const fs = require('fs');

let hookCode = fs.readFileSync('hooks/use-student-data.ts', 'utf8');
hookCode = hookCode.replace(
  /const myEthicsApplications = dataContext.ethicsApplications.filter\(e => e.studentId === studentId\);/,
  `const myEthicsApplications = dataContext.ethicsApplications.filter(e => e.studentId === studentId);
  const myAuditEngagements = dataContext.auditEngagements?.filter(a => a.studentId === studentId) || [];`
);
hookCode = hookCode.replace(
  /auditEngagements,/,
  `auditEngagements: myAuditEngagements,`
);
hookCode = hookCode.replace(
  /addAuditEngagement,/,
  `addAuditEngagement: dataContext.addAuditEngagement,`
);

fs.writeFileSync('hooks/use-student-data.ts', hookCode);
