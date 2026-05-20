import { FaX } from 'react-icons/fa6';
import { LuPrinter } from 'react-icons/lu';

export default function InvoiceButtons({
    handlePrint,
    onClose,
}: {
    handlePrint: () => void;
    onClose: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
      >
        <LuPrinter className="w-4 h-4" />
        طباعة
      </button>
      <button
        onClick={onClose}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <FaX className="w-5 h-5" />
      </button>
    </div>
  );
}
