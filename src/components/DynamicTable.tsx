import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Filter, X } from "lucide-react";

interface ColumnConfig {
    key: string;
    label: string;
}

interface DynamicTableProps {
    columns: ColumnConfig[];
    data: Record<string, any>[];
    allowAdd?: boolean;
    allowFilter?: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, allowAdd = false, allowFilter = false }) => {
    const [tableData, setTableData] = useState(data);
    const [newRow, setNewRow] = useState<Record<string, string>>({});
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const handleInputChange = (key: string, value: string) => {
        setNewRow(prev => ({ ...prev, [key]: value }));
    };

    const addNewRow = () => {
        if (Object.values(newRow).some(value => value !== '')) {
            setTableData(prev => [...prev, newRow]);
            setNewRow({});
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setIsFiltering(true);
    };

    const applyFilters = () => {
        const filteredData = data.filter(row =>
            Object.entries(filters).every(([key, value]) =>
                String(row[key]).toLowerCase().includes(value.toLowerCase())
            )
        );
        setTableData(filteredData);
    };

    const resetFilters = () => {
        setFilters({});
        setTableData(data);
        setIsFiltering(false);
    };

    const clearFilter = (key: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[key];
            return newFilters;
        });
        if (Object.keys(filters).length === 1) {
            setIsFiltering(false);
        }
    };

    return (
        <div className="p-4">
            <Table>
                {allowFilter && (
                    <TableHeader>
                        <TableRow>
                            {columns.map(column => (
                                <TableHead key={column.key} className="p-2">
                                    <div className="flex flex-col space-y-2">
                                        <span>{column.label}</span>
                                        <div className="relative">
                                            <Input
                                                placeholder={`Filter ${column.label}`}
                                                value={filters[column.key] || ''}
                                                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                                                className="max-w-xs pr-8"
                                            />
                                            {filters[column.key] && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0"
                                                    onClick={() => clearFilter(column.key)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                )}
                <TableHeader>
                    <TableRow>
                        {columns.map(column => (
                            <TableHead key={column.key}>{column.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map(column => (
                                <TableCell key={column.key}>{row[column.key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {allowAdd && (
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column.key}>
                                    <Input
                                        value={newRow[column.key] || ''}
                                        onChange={(e) => handleInputChange(column.key, e.target.value)}
                                        placeholder={column.label}
                                    />
                                </TableCell>
                            ))}
                            <TableCell>
                                <Button onClick={addNewRow} variant="ghost" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {allowFilter && isFiltering && (
                <div className="mt-4 flex justify-end">
                    <Button onClick={resetFilters} variant="outline">
                        Reset Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DynamicTable;