"use client";
import React, { useRef } from 'react'
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import InventoryTable from '@/components/InventoryTable';


const page = () => {
    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1 justify-center '>
            <InventoryTable />
        </div>
    )
}

export default page
