"use client";
import React, { useRef } from 'react'
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';


const page = () => {
    return (
        <div className='bg-slate-50 grainy-light px-32  flex flex-1 '>
            <div className="flex justify-between flex flex-1 items-center">
                <div className="left flex flex-1 flex-col ">
                    <h1 className="text-center font-bold">Alert</h1>
                    <div className=' h-[500px] w-full bg-gray-400' >

                    </div>
                </div>
                <div className="center flex flex-col gap-5 mx-5 justify-center flex-1">
                    <Link
                        href={{
                            pathname: '/main/store',
                            query: { name: 'JPI store room' }
                        }}
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        JPI store room
                    </Link>
                    <Link
                        href={{
                            pathname: '/main/store',
                            query: { name: 'Egypt store room' }
                        }}
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        Egypt store room
                    </Link>
                </div>
                <div className="right flex flex-col gap-5 flex-1 self-start">
                    <Link
                        href='/main'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        Storeroom manager
                    </Link>
                    <Link
                        href='/main'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        User manager
                    </Link>
                    <Link
                        href='/main/itemsManagements'
                        className={buttonVariants({
                            size: 'lg',
                        })}>
                        items manager
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default page
