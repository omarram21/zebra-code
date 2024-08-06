import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, X, Save, Edit2 } from "lucide-react";

interface ColumnConfig {
    key: string;
    label: string;
    editable?: boolean;
}

interface DynamicTable2Props {
    columns: ColumnConfig[];
    data: Record<string, any>[];
    allowFilter?: boolean;
    onSave?: (updatedData: Record<string, any>[]) => void;
}

const DynamicTable2: React.FC<DynamicTable2Props> = ({ columns, data, allowFilter = false, onSave }) => {
    const [tableData, setTableData] = useState(data);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [isFiltering, setIsFiltering] = useState(false);
    const [editingState, setEditingState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        applyFilters();
    }, [filters]);

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

    const handleEdit = (id: string) => {
        setEditingState(prev => ({ ...prev, [id]: true }));
    };

    const handleSave = (id: string) => {
        setEditingState(prev => ({ ...prev, [id]: false }));
        if (onSave) {
            onSave(tableData);
        }
    };

    const handleInputChange = (id: string, key: string, value: string) => {
        setTableData(prev => prev.map(row =>
            row['Item ID'] === id ? { ...row, [key]: value } : row
        ));
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
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row['Item ID']}>
                            {columns.map(column => (
                                <TableCell key={column.key}>
                                    {column.editable && row.Qty === '1' && editingState[row['Item ID']] ? (
                                        <Input
                                            value={row[column.key] || ''}
                                            onChange={(e) => handleInputChange(row['Item ID'], column.key, e.target.value)}
                                        />
                                    ) : (
                                        row[column.key]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                {row.Qty === '1' && (
                                    editingState[row['Item ID']] ? (
                                        <Button onClick={() => handleSave(row['Item ID'])} variant="ghost" size="icon">
                                            <Save className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEdit(row['Item ID'])} variant="ghost" size="icon">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    )
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
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

export default DynamicTable2;