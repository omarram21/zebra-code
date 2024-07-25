import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

const printBarcode = async (serial: string) => {
    try {
        const browserPrint = new ZebraBrowserPrintWrapper();
        let printer = await browserPrint.getDefaultPrinter();

        // if (!printer) {
        //     const printers = await browserPrint.getAvailablePrinters();
        //     if (printers.length > 0) {
        //         printer = printers[0]; // Select the first available printer
        //         browserPrint.setPrinter(printer);
        //     } else {
        //         throw new Error("No printers found");
        //     }
        // }
        if (printer) {
            browserPrint.setPrinter(printer);
            console.log(browserPrint.getPrinter());
            // const printerStatus = await browserPrint.checkPrinterStatus();
            
            const zpl = `^XA
                         ^FO50,50^A0N,50,50^FDJPI Storeroom^FS
                         ^FO50,150^BY2
                         ^BCN,100,Y,N,N
                         ^FD${serial}^FS
                         ^XZ`;
            browserPrint.print(zpl);
        } else {
            console.log("No default printer found.");
        }
    } catch (error) {
        console.error("Failed to print:", error);
    }
};

export default printBarcode;
