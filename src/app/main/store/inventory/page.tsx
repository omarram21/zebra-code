"use client";
import React, { useEffect, useRef, useState } from 'react'
import DynamicTable from '@/components/DynamicTable';

const inventoryColumns = [
    { key: 'item', label: 'Item' },
    { key: 'brand', label: 'Brand' },
    { key: 'type', label: 'Type' },
    { key: 'color', label: 'Color' },
    { key: 'asset', label: 'Asset' },
    { key: 'serial', label: 'Serial' },
    { key: 'storeroom', label: 'Storeroom' },
    { key: 'minimum_qty', label: 'Minimum Qty' },
];


const page = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                setInventoryData(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching inventory:', err);
                setError('Failed to load inventory. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (isLoading) {
        return <div>Loading inventory...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1'>
            <div className="flex items-center flex-col w-full">
                <h1 className="text-2xl font-bold mb-4">Inventory</h1>
                <DynamicTable
                    columns={inventoryColumns}
                    data={inventoryData}
                    allowAdd={false}
                    allowFilter={true}
                />
            </div>
        </div>
    )
}

export default page
