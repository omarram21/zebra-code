import React, { useRef } from 'react';
import Barcode from 'react-barcode';

const PrintableComponent: React.FC = React.forwardRef<HTMLDivElement>((props, ref) => {
        const reff = useRef<Barcode | null>(null);

  return (
    <div ref={ref}>
      <h1>This is a printable component</h1>
            <Barcode value='123456789012' height={100} width={5} ref={reff} />
    </div>
  );
});

PrintableComponent.displayName = 'PrintableComponent';

export default PrintableComponent;