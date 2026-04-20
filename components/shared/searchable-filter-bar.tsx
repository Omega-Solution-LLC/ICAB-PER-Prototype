import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef {
  id: string;
  placeholder: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface SearchableFilterBarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterDef[];
}

export function SearchableFilterBar({ searchPlaceholder = "Search...", searchValue, onSearchChange, filters = [] }: SearchableFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input 
          placeholder={searchPlaceholder} 
          className="pl-9" 
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {filters.length > 0 && (
        <div className="flex gap-2 shrink-0">
          {filters.map(filter => (
            <Select key={filter.id} value={filter.value} onValueChange={(val: string | null | undefined) => val && filter.onChange(val)}>
              <SelectTrigger className="w-[160px] bg-white">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.placeholder}</SelectItem>
                {filter.options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}
    </div>
  );
}
