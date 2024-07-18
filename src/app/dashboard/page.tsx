"use client";
import React, { useRef } from 'react'
import Printer from '../Printer'
import Barcode from 'react-barcode'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef();
    return (
        <div>
            <Printer />
            <p>Hello Herre</p>
            <Barcode value='123456789012' height={100} width={5} ref={ref} />
        </div>
    )
}

export default page
