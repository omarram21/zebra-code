"use client";
import React, { useRef } from 'react'
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';


const page = () => {
    const searchParams = useSearchParams()
    return (
        <div className='bg-slate-50 grainy-light px-32 pt-12 flex flex-1 '>
            <div className="flex justify-between flex flex-1 items-center flex-col">
                <h1 className='font-bold'>{searchParams.get('name')}</h1>
                <div className="center flex flex-col gap-5 mx-5 justify-center flex-1">
                    <Link
                        href='/main/store/scanItems'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        Scan items
                    </Link>
                    <Link
                        href='/main/store/inventory'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        inventory
                    </Link>
                    <Link
                        href='/main/store/history'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        History
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
