const fs = require('fs');

let pageCode = fs.readFileSync('app/student/practical-experience/page.tsx', 'utf8');
pageCode = pageCode.replace(/daysStatAudit: data\.daysStatAudit,( \/\/ Keeping for backward compatibility)?/g, 'daysStatAudit: 0,');
pageCode = pageCode.replace(/daysOtherAudit: data\.daysOtherAudit,/g, 'daysOtherAudit: 0,');
pageCode = pageCode.replace(/daysNonAudit: data\.daysNonAudit,/g, 'daysNonAudit: 0,');
fs.writeFileSync('app/student/practical-experience/page.tsx', pageCode);

let hookCode = fs.readFileSync('hooks/use-student-data.ts', 'utf8');
hookCode = hookCode.replace(/const \{[\s\S]*?\} = context;/g, function(match) {
    if (match.includes('auditEngagements')) return match;
    return match.replace(/ethicsApplications,/, 'ethicsApplications, auditEngagements, addAuditEngagement,');
});
fs.writeFileSync('hooks/use-student-data.ts', hookCode);
