import { useContext } from 'react';
import { DataContext } from '@/contexts/data-context';
// Note: Admin authentication uses different logic

export function useAdminData() {
  const dataContext = useContext(DataContext);
  
  if (!dataContext) {
    throw new Error('useAdminData must be used within a DataProvider');
  }

  return {
    principal: dataContext.principal,
    students: dataContext.students,
    allPracticalPeriods: dataContext.practicalPeriods,
    allTechnicalModules: dataContext.technicalModules,
    allSkillRecords: dataContext.skillRecords,
    allEthicsModules: dataContext.ethicsModules,
    allEthicsApplications: dataContext.ethicsApplications,
    // Methods
    updatePracticalPeriod: dataContext.updatePracticalPeriod,
    updateSkillRecord: dataContext.updateSkillRecord,
    updateEthicsApplication: dataContext.updateEthicsApplication,
    updateEthicsModule: dataContext.updateEthicsModule,
  };
}
