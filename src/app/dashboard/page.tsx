"use client";
import React, { useRef } from 'react'
import Printer from '../../Printer'
import Barcode from 'react-barcode'
import PrintableComponent from '../../components/PrintableComponent';
import { useReactToPrint } from 'react-to-print';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import TableComponent from '@/components/Table';


const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const ref = useRef<Barcode | null>(null);
    // const componentRef = useRef<HTMLDivElement>(null);

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });
    return (
        <div className='bg-slate-50 grainy-light px-32 mt-12'>
            {/* <MaxWidthWrapper className='pb-24 pt-10 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'> */}
                {/* <Printer /> */}
                {/* <p>Hello Herre</p> */}
                {/* <Barcode value='123456789012' height={100} width={5} ref={ref} /> */}
                <div>
                    {/* <h1>Print Example</h1> */}
                    {/* <button onClick={handlePrint}>Print this out!</button> */}
                    {/* <PrintableComponent ref={componentRef} /> */}
                </div>
                <TableComponent />
            {/* </MaxWidthWrapper> */}
        </div>
    )
}

export default page
