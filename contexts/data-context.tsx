"use client";

import React, { createContext, useState } from "react";
import { 
  Student, Principal, PracticalExperiencePeriod, TechnicalModule, 
  SkillRecord, EthicsTrainingProgress, EthicsScenario 
} from "@/types";
import { 
  DEMO_STUDENTS, DEMO_PRINCIPAL, DEMO_PRACTICAL_PERIODS, 
  DEMO_TECHNICAL_MODULES, DEMO_SKILL_RECORDS, DEMO_ETHICS_PROGRESS, DEMO_ETHICS_SCENARIOS 
} from "@/lib/demo-data";

type DataContextType = {
  students: Student[];
  principal: Principal;
  practicalPeriods: PracticalExperiencePeriod[];
  technicalModules: TechnicalModule[];
  skillRecords: SkillRecord[];
  ethicsProgress: EthicsTrainingProgress;
  ethicsScenarios: EthicsScenario[];
  
  // Mutators
  addPracticalPeriod: (period: Omit<PracticalExperiencePeriod, 'id' | 'status'>) => void;
  updatePracticalPeriod: (id: string, updates: Partial<PracticalExperiencePeriod>) => void;
  addSkillRecord: (record: Omit<SkillRecord, 'id' | 'status'>) => void;
  updateSkillRecord: (id: string, updates: Partial<SkillRecord>) => void;
  addEthicsScenario: (scenario: Omit<EthicsScenario, 'id' | 'status'>) => void;
  updateEthicsScenario: (id: string, updates: Partial<EthicsScenario>) => void;
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
  const [ethicsScenarios, setEthicsScenarios] = useState<EthicsScenario[]>(DEMO_ETHICS_SCENARIOS);

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

  const addEthicsScenario = (scenario: Omit<EthicsScenario, 'id' | 'status'>) => {
    const newScenario: EthicsScenario = { ...scenario, id: `es-${Date.now()}`, status: 'submitted' };
    setEthicsScenarios(prev => [...prev, newScenario]);
  };

  const updateEthicsScenario = (id: string, updates: Partial<EthicsScenario>) => {
    setEthicsScenarios(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const updateEthicsProgress = (updates: Partial<EthicsTrainingProgress>) => {
    setEthicsProgress(prev => ({ ...prev, ...updates }));
  };

  const updateTechnicalModule = (id: string, updates: Partial<TechnicalModule>) => {
    setTechnicalModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  return (
    <DataContext.Provider value={{
      students, principal, practicalPeriods, technicalModules, skillRecords, ethicsProgress, ethicsScenarios,
      addPracticalPeriod, updatePracticalPeriod, addSkillRecord, updateSkillRecord, addEthicsScenario,
      updateEthicsScenario, updateEthicsProgress, updateTechnicalModule
    }}>
      {children}
    </DataContext.Provider>
  );
}
