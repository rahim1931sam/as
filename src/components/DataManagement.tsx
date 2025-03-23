import React from "react";
import { Button } from "./ui/button";
import { Download, Upload, Database, History } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface DataManagementProps {
  onExport?: () => void;
  onBackup?: () => void;
  onRestore?: () => void;
  onViewHistory?: () => void;
}

const DataManagement = ({
  onExport = () => {},
  onBackup = () => {},
  onRestore = () => {},
  onViewHistory = () => {},
}: DataManagementProps) => {
  return (
    <Card className="w-full bg-white/95 shadow-md">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onExport}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onBackup}
          >
            <Database className="h-4 w-4" />
            Backup
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onRestore}
          >
            <Upload className="h-4 w-4" />
            Restore
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onViewHistory}
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;
