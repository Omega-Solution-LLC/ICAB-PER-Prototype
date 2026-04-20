import React from 'react';
import { StatusBadge } from '../shared/status-badge';
import { RecordStatus } from '@/types';

export interface StudentStatusChipProps {
  status: RecordStatus;
}

export function StudentStatusChip({ status }: StudentStatusChipProps) {
  return <StatusBadge status={status} />;
}
