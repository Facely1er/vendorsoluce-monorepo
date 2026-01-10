import React, { useRef } from 'react';
import { Download, Upload, FileText } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { downloadCSVTemplate } from '../../../../utils/csvImportExport';

interface ImportExportProps {
  onImport: (csvText: string) => Promise<void>;
  onExport: () => void;
  vendorsCount?: number;
}

const ImportExport: React.FC<ImportExportProps> = ({ onImport, onExport, vendorsCount = 0 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await onImport(text);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import vendors. Please check the file format.');
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleImport}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Import CSV
      </Button>
      <Button
        variant="outline"
        onClick={onExport}
        disabled={vendorsCount === 0}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        onClick={downloadCSVTemplate}
        className="flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Template
      </Button>
    </div>
  );
};

export default ImportExport;
