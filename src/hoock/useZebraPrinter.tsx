"use client";
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

const useZebraPrinter = () => {
  const [ZebraBrowserPrintWrapper, setZebraBrowserPrintWrapper] = useState<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [printerInfo, setPrinterInfo] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    import('zebra-browser-print-wrapper').then((module) => {
      setZebraBrowserPrintWrapper(module.default);
    }).catch(err => {
      console.error("Failed to load ZebraBrowserPrintWrapper:", err);
      setError("Failed to load printer software. Please refresh the page.");
    });
  }, []);

  const printBarcode = useCallback(async (serial: string) => {
    if (!ZebraBrowserPrintWrapper) {
      setError("Zebra Browser Print Wrapper not loaded yet");
      return;
    }

    setIsPrinting(true);
    setError(null);
    setPrinterInfo(null);
    setDebugInfo(null);

    try {
      const browserPrint = new ZebraBrowserPrintWrapper();
      
      console.log("Searching for available printers...");
      const printers = await browserPrint.getAvailablePrinters();
      console.log("Available printers:", printers);

      let printerInfoText = "Available printers:\n";
      printers.forEach((printer: any, index: number) => {
        printerInfoText += `${index + 1}. Name: ${printer.name}, Connection: ${printer.connection}\n`;
      });
      setPrinterInfo(printerInfoText);

      let selectedPrinter = null;

      // Try to find any Zebra printer
      selectedPrinter = printers.find((printer: any) => 
        printer.manufacturer?.toLowerCase().includes('zebra') ||
        printer.name.toLowerCase().includes('zebra')
      );

      if (!selectedPrinter) {
        throw new Error("No Zebra printer found. Please check your printer connection and Zebra Browser Print service.");
      }
      
      console.log(`Selected printer: ${selectedPrinter.name}, Connection: ${selectedPrinter.connection}`);
      
      // Add error handling for setPrinter
      try {
        browserPrint.setPrinter(selectedPrinter);
      } catch (setPrinterError) {
        console.error("Error setting printer:", setPrinterError);
        setDebugInfo(`Error setting printer: ${JSON.stringify(setPrinterError)}`);
        throw new Error("Failed to set printer. Please check Zebra Browser Print service.");
      }

      console.log("Checking printer status...");
      const printerStatus = await browserPrint.checkPrinterStatus();
      console.log("Printer status:", printerStatus);

      if (printerStatus.isReadyToPrint) {
        console.log("Printer is ready. Sending print job...");
        const zpl = `^XA
                     ^FO50,50^A0N,50,50^FDHello, World!^FS
                     ^FO50,150^BY2
                     ^BCN,100,Y,N,N
                     ^FD${serial}^FS
                     ^XZ`;
        await browserPrint.print(zpl);
        console.log("Print job sent successfully.");
      } else {
        throw new Error(`Printer is not ready. Status: ${JSON.stringify(printerStatus)}`);
      }
    } catch (err) {
      console.error("Failed to print:", err);
      setError(err instanceof Error ? err.message : String(err));
      setDebugInfo(`Full error: ${JSON.stringify(err)}`);
    } finally {
      setIsPrinting(false);
    }
  }, [ZebraBrowserPrintWrapper]);

  return { printBarcode, isPrinting, error, printerInfo, debugInfo };
};

export default useZebraPrinter;