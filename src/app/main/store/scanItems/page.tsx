"use client";
import React, { useRef } from 'react'
import DynamicTable2 from '@/components/DynamicTable2';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const inventoryColumns = [
    { key: 'Item ID', label: 'Item ID' },
    { key: 'Item', label: 'Item' },
    { key: 'Brand', label: 'Brand' },
    { key: 'Type', label: 'Type' },
    { key: 'Color', label: 'Color' },
    { key: 'Status', label: 'Status' },
    { key: 'Asset', label: 'Asset', editable: true },
    { key: 'serial', label: 'Serial', editable: true },
    { key: 'Qty', label: 'Qty' },
];

const inventoryData = [
    {
        'Item ID': '112021055',
        'Item': 'Laptop',
        'Brand': 'HP',
        'Type': '-',
        'Color': 'Blue',
        'Status': 'New',
        'Asset': '32154',
        'serial': 'S32D76',
        'Qty': '1',
    },
    {
        'Item ID': '112021054',
        'Item': 'Laptop',
        'Brand': 'HP',
        'Type': '-',
        'Color': 'Blue',
        'Status': 'New',
        'Asset': '',
        'serial': '',
        'Qty': '1',
    },
    {
        'Item ID': '222545456',
        'Item': 'Headset',
        'Brand': 'Jabra Speaker 510',
        'Type': 'Jabbra',
        'Color': 'Blue',
        'Status': 'New',
        'Asset': '-',
        'serial': '-',
        'Qty': '8',
    },
];
const page = () => {
    const handleSave = (updatedData: Record<string, any>[]) => {
        console.log('Updated data:', updatedData);
    };
    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1 flex-col'>
            <div className="flex-1">
                <h1>scanItems</h1>
                <DynamicTable2
                    columns={inventoryColumns}
                    data={inventoryData}
                    allowFilter={true}
                    onSave={handleSave}
                />
            </div>
            <div className='flex justify-between mb-10'>

                <Link
                    href='/main/store/inventory'
                    className={buttonVariants({
                        size: 'lg',
                    })}>
                    add to the store room
                </Link>
                <Link
                    href='/main/store/history'
                    className={buttonVariants({
                        size: 'lg',
                    })}>
                    link it with ticket
                </Link>
            </div>

        </div>
    )
}

export default page
