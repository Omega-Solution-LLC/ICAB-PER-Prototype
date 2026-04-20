import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from '@/types';
import { Building2, Calendar, UserCheck } from 'lucide-react';

export interface StudentBannerProps {
  student: Student;
  principalName?: string;
}

/**
 * StudentBanner — Welcome/identity banner for dashboards and details.
 */
export function StudentBanner({ student, principalName }: StudentBannerProps) {
  if (!student) return null; 

  const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <Card className="bg-gradient-to-r from-icab-red to-icab-wine text-white overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white/20">
          <AvatarImage src={student.avatarUrl} alt={student.name} />
          <AvatarFallback className="bg-white/10 text-xl font-bold text-white">{initials}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{student.name}</h2>
            <p className="text-white/80 font-medium mt-1">Student ID: {student.studentNumber}</p>
          </div>
          
          <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 opacity-70" />
              <span>{student.firmName}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 opacity-70" />
              <span>{principalName || "Principal assigned"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 opacity-70" />
              <span>{student.contractStartDate} — {student.contractEndDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
