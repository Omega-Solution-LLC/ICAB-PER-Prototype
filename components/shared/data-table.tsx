import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

export type ColumnDef<T> = {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
};

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

/**
 * DataTable — Standardized list view wrapper around shadcn Table.
 * @example
 *   <DataTable columns={columns} data={data} emptyState={<EmptyState />} />
 */
export function DataTable<T>({ columns, data, emptyState, onRowClick, className }: DataTableProps<T>) {
  return (
    <div className={cn("rounded-md border bg-white", className)}>
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((row, i) => (
              <TableRow 
                key={i} 
                className={cn(onRowClick && "cursor-pointer hover:bg-slate-50")}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} className={col.className}>
                    {col.cell ? col.cell(row) : col.accessorKey ? String(row[col.accessorKey] ?? '') : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 p-0">
                {emptyState || <div className="text-center py-6 text-slate-500">No results found.</div>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
