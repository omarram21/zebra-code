"use client";
import React, { useRef } from 'react'
import DynamicTable from '@/components/DynamicTable';

const fullInventoryColumns = [
    { key: 'action', label: 'Action' },
    { key: 'user', label: 'user' },
    { key: 'ivanitTicket', label: 'ivanit ticket' },
    { key: 'item', label: 'Item' },
    { key: 'brand', label: 'Brand' },
    { key: 'type', label: 'Type' },
    { key: 'color', label: 'Color' },
    { key: 'status', label: 'Status' },
    { key: 'asset', label: 'Asset' },
    { key: 'serial', label: 'serial' },
    { key: 'qty', label: 'Qty' },
    { key: 'date', label: 'Date' },
];

const fullInventoryData = [
    {
        action: 'in',
        user: 'MBawazer',
        ivanitTicket: '-',
        item: 'Laptop',
        brand: 'HP',
        type: '-',
        color: 'Blue',
        status: 'New',
        asset: '32154',
        serial: 'S32D76',
        qty: '1',
        date: '8/12/2024',
    },
    // ... add other rows
];
const page = () => {
    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1 '>
            <div className="flex items-center flex-col">
                <h1>History</h1>
                <DynamicTable
                    columns={fullInventoryColumns}
                    data={fullInventoryData}
                    allowAdd={false}
                    allowFilter={true}
                />
            </div>

        </div>
    )
}

export default page
