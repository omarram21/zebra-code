"use client";

import React from 'react';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

const printBarcode = async (serial: string) => {
    try {
        const browserPrint = new ZebraBrowserPrintWrapper();
        let printer = await browserPrint.getDefaultPrinter();

        if (!printer) {
            const printers = await browserPrint.getAvailablePrinters();
            if (printers.length > 0) {
                printer = printers[0]; // Select the first available printer
                browserPrint.setPrinter(printer);
            } else {
                throw new Error("No printers found");
            }
        }

        const printerStatus = await browserPrint.checkPrinterStatus();

        if (printerStatus.isReadyToPrint) {
            const zpl = `^XA
                         ^FO50,50^A0N,50,50^FDHello, World!^FS
                         ^FO50,150^BY2
                         ^BCN,100,Y,N,N
                         ^FD${serial}^FS
                         ^XZ`;
            browserPrint.print(zpl);
        } else {
            console.log("Printer is not ready. Errors:", printerStatus.errors);
        }
    } catch (error) {
        console.error("Failed to print:", error);
    }
};

const Printer: React.FC = () => {
    const handlePrint = () => {
        const serial = "123456789012";
        printBarcode(serial);
    };

    return <button onClick={handlePrint}>Print Barcode</button>;
};

export default Printer;
