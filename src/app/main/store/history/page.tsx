"use client";
import React, { useState, useEffect } from 'react'
import DynamicTable from '@/components/DynamicTable';

const inventoryActionColumns = [
    { key: 'action', label: 'Action' },
    { key: 'user', label: 'User' },
    { key: 'ivanit_ticket', label: 'Ivanit Ticket' },
    { key: 'item', label: 'Item' },
    { key: 'brand', label: 'Brand' },
    { key: 'type', label: 'Type' },
    { key: 'color', label: 'Color' },
    { key: 'status', label: 'Status' },
    { key: 'asset', label: 'Asset' },
    { key: 'serial', label: 'Serial' },
    { key: 'qty', label: 'Qty' },
    { key: 'date', label: 'Date' },
];

const page = () => {
    const [actionsData, setActionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventoryActions = async () => {
            try {
                const response = await fetch('/api/inventory-actions');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory actions');
                }
                const data = await response.json();
                setActionsData(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching inventory actions:', err);
                setError('Failed to load inventory actions. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchInventoryActions();
    }, []);

    if (isLoading) {
        return <div>Loading inventory actions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1'>
            <div className="flex items-center flex-col w-full">
                <h1 className="text-2xl font-bold mb-4">Inventory Actions</h1>
                <DynamicTable
                    columns={inventoryActionColumns}
                    data={actionsData}
                    allowAdd={false}
                    allowFilter={true}
                />
            </div>
        </div>
    )
}

export default page;
