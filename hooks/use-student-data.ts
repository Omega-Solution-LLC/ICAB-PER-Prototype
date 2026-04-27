import { useContext } from 'react';
import { DataContext } from '@/contexts/data-context';
import { useSession } from './use-session';
import { Student } from '@/types';

export function useStudentData() {
  const authContext = useSession();
  const dataContext = useContext(DataContext);
  
  if (!dataContext) {
    throw new Error('useStudentData must be used within a DataProvider');
  }

  const studentId = authContext.user?.id;
  const student = dataContext.students.find(s => s.id === studentId) as Student | undefined;
  const principal = student ? dataContext.principal : undefined;

  const myPracticalPeriods = dataContext.practicalPeriods.filter(p => p.studentId === studentId);
  const myTechnicalModules = dataContext.technicalModules; // In prototype, modules are shared for the demo student
  const mySkillRecords = dataContext.skillRecords.filter(s => s.studentId === studentId);
  const myEthicsProgress = dataContext.ethicsProgress;
  const myEthicsModules = dataContext.ethicsModules;
  const myEthicsApplications = dataContext.ethicsApplications.filter(e => e.studentId === studentId);

  return {
    student,
    principalName: principal ? principal.name : '',
    firmName: student ? student.firmName : '',
    contractStartDate: student ? student.contractStartDate : '',
    contractEndDate: student ? student.contractEndDate : '',
    practicalPeriods: myPracticalPeriods,
    technicalModules: myTechnicalModules,
    skillRecords: mySkillRecords,
    ethicsProgress: myEthicsProgress,
    ethicsModules: myEthicsModules,
    ethicsApplications: myEthicsApplications,
    // Mutators
    addPracticalPeriod: dataContext.addPracticalPeriod,
    updatePracticalPeriod: dataContext.updatePracticalPeriod,
    addSkillRecord: dataContext.addSkillRecord,
    updateSkillRecord: dataContext.updateSkillRecord,
    addEthicsApplication: dataContext.addEthicsApplication,
    updateEthicsModule: dataContext.updateEthicsModule,
    updateEthicsProgress: dataContext.updateEthicsProgress,
    updateTechnicalModule: dataContext.updateTechnicalModule,
  };
}
