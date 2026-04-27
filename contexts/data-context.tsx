"use client";

import React, { createContext, useState } from "react";
import { 
  Student, Principal, PracticalExperiencePeriod, TechnicalModule, 
  SkillRecord, EthicsTrainingProgress, EthicsModule, EthicsApplication 
} from "@/types";
import { 
  DEMO_STUDENTS, DEMO_PRINCIPAL, DEMO_PRACTICAL_PERIODS, 
  DEMO_TECHNICAL_MODULES, DEMO_SKILL_RECORDS, DEMO_ETHICS_PROGRESS, DEMO_ETHICS_MODULES, DEMO_ETHICS_APPLICATIONS 
} from "@/lib/demo-data";

type DataContextType = {
  students: Student[];
  principal: Principal;
  practicalPeriods: PracticalExperiencePeriod[];
  technicalModules: TechnicalModule[];
  skillRecords: SkillRecord[];
  ethicsProgress: EthicsTrainingProgress;
  ethicsModules: EthicsModule[];
  ethicsApplications: EthicsApplication[];
  
  // Mutators
  addPracticalPeriod: (period: Omit<PracticalExperiencePeriod, 'id' | 'status'>) => void;
  updatePracticalPeriod: (id: string, updates: Partial<PracticalExperiencePeriod>) => void;
  addSkillRecord: (record: Omit<SkillRecord, 'id' | 'status'>) => void;
  updateSkillRecord: (id: string, updates: Partial<SkillRecord>) => void;
  addEthicsApplication: (app: Omit<EthicsApplication, 'id' | 'status'>) => void;
  updateEthicsApplication: (id: string, updates: Partial<EthicsApplication>) => void;
  updateEthicsModule: (id: string, updates: Partial<EthicsModule>) => void;
  updateEthicsProgress: (updates: Partial<EthicsTrainingProgress>) => void;
  updateTechnicalModule: (id: string, updates: Partial<TechnicalModule>) => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [students] = useState<Student[]>(DEMO_STUDENTS);
  const [principal] = useState<Principal>(DEMO_PRINCIPAL);
  const [practicalPeriods, setPracticalPeriods] = useState<PracticalExperiencePeriod[]>(DEMO_PRACTICAL_PERIODS);
  const [technicalModules, setTechnicalModules] = useState<TechnicalModule[]>(DEMO_TECHNICAL_MODULES);
  const [skillRecords, setSkillRecords] = useState<SkillRecord[]>(DEMO_SKILL_RECORDS);
  const [ethicsProgress, setEthicsProgress] = useState<EthicsTrainingProgress>(DEMO_ETHICS_PROGRESS);
  const [ethicsModules, setEthicsModules] = useState<EthicsModule[]>(DEMO_ETHICS_MODULES);
  const [ethicsApplications, setEthicsApplications] = useState<EthicsApplication[]>(DEMO_ETHICS_APPLICATIONS);

  const addPracticalPeriod = (period: Omit<PracticalExperiencePeriod, 'id' | 'status'>) => {
    const newPeriod: PracticalExperiencePeriod = { ...period, id: `pe-${Date.now()}`, status: 'submitted' };
    setPracticalPeriods(prev => [...prev, newPeriod]);
  };

  const updatePracticalPeriod = (id: string, updates: Partial<PracticalExperiencePeriod>) => {
    setPracticalPeriods(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addSkillRecord = (record: Omit<SkillRecord, 'id' | 'status'>) => {
    const newRecord: SkillRecord = { ...record, id: `sr-${Date.now()}`, status: 'submitted' };
    setSkillRecords(prev => [...prev, newRecord]);
  };

  const updateSkillRecord = (id: string, updates: Partial<SkillRecord>) => {
    setSkillRecords(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addEthicsApplication = (app: Omit<EthicsApplication, 'id' | 'status'>) => {
    const newApp: EthicsApplication = { ...app, id: `ea-${Date.now()}`, status: 'submitted' };
    setEthicsApplications(prev => [...prev, newApp]);
  };

  const updateEthicsApplication = (id: string, updates: Partial<EthicsApplication>) => {
    setEthicsApplications(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const updateEthicsModule = (id: string, updates: Partial<EthicsModule>) => {
    setEthicsModules(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const updateEthicsProgress = (updates: Partial<EthicsTrainingProgress>) => {
    setEthicsProgress(prev => ({ ...prev, ...updates }));
  };

  const updateTechnicalModule = (id: string, updates: Partial<TechnicalModule>) => {
    setTechnicalModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  return (
    <DataContext.Provider value={{
      students, principal, practicalPeriods, technicalModules, skillRecords, ethicsProgress, ethicsModules, ethicsApplications,
      addPracticalPeriod, updatePracticalPeriod, addSkillRecord, updateSkillRecord, addEthicsApplication, updateEthicsApplication,
      updateEthicsModule, updateEthicsProgress, updateTechnicalModule
    }}>
      {children}
    </DataContext.Provider>
  );
}
