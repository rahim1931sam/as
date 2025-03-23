import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Download, Upload, Save, Trash2 } from "lucide-react";

interface DataManagementModalProps {
  open?: boolean;
  onClose?: () => void;
  roomName?: string;
  roomId?: string;
}

const DataManagementModal = ({
  open = false,
  onClose = () => {},
  roomName = "Drying Room",
  roomId = "room-1",
}: DataManagementModalProps) => {
  const [backupName, setBackupName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock data for history records
  const historyRecords = [
    {
      id: 1,
      date: "2023-06-15",
      time: "08:30",
      temp: 72,
      humidity: 65,
      event: "Drying started",
    },
    {
      id: 2,
      date: "2023-06-15",
      time: "12:45",
      temp: 75,
      humidity: 60,
      event: "Temperature adjusted",
    },
    {
      id: 3,
      date: "2023-06-15",
      time: "16:20",
      temp: 76,
      humidity: 58,
      event: "Fan 2 activated",
    },
    {
      id: 4,
      date: "2023-06-16",
      time: "09:15",
      temp: 74,
      humidity: 62,
      event: "Humidity adjusted",
    },
    {
      id: 5,
      date: "2023-06-16",
      time: "14:00",
      temp: 73,
      humidity: 63,
      event: "Heater 3 deactivated",
    },
    {
      id: 6,
      date: "2023-06-16",
      time: "18:30",
      temp: 72,
      humidity: 64,
      event: "Drying completed",
    },
  ];

  // Mock data for backups
  const backups = [
    {
      id: 1,
      name: "Morning Backup",
      date: "2023-06-15",
      time: "08:00",
      size: "1.2 MB",
    },
    {
      id: 2,
      name: "Evening Backup",
      date: "2023-06-15",
      time: "20:00",
      size: "1.3 MB",
    },
    {
      id: 3,
      name: "Weekly Backup",
      date: "2023-06-16",
      time: "12:00",
      size: "2.5 MB",
    },
  ];

  const handleExportCSV = () => {
    // In a real application, this would generate and download a CSV file
    console.log(`Exporting CSV for ${roomName}`);
    // Mock CSV content
    const csvContent =
      "data:text/csv;charset=utf-8,Date,Time,Temperature,Humidity,Event\n" +
      historyRecords
        .map(
          (record) =>
            `${record.date},${record.time},${record.temp},${record.humidity},${record.event}`,
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${roomName.replace(/ /g, "_")}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateBackup = () => {
    if (!backupName.trim()) {
      alert("Please enter a backup name");
      return;
    }
    // In a real application, this would create a backup file
    console.log(`Creating backup '${backupName}' for ${roomName}`);
    alert(`Backup '${backupName}' created successfully!`);
    setBackupName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRestore = () => {
    if (!selectedFile) {
      alert("Please select a backup file to restore");
      return;
    }
    // In a real application, this would restore from the backup file
    console.log(`Restoring from backup file: ${selectedFile.name}`);
    alert(`Restored from backup file: ${selectedFile.name}`);
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {roomName} - Data Management
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="mt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                Export Environmental Data
              </h3>
              <p className="text-gray-600 mb-4">
                Export all environmental data for this room as a CSV file. This
                includes temperature, humidity, and event records.
              </p>
              <Button
                onClick={handleExportCSV}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export to CSV
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="backup" className="mt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Create Backup</h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="backup-name">Backup Name</Label>
                  <Input
                    id="backup-name"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                    placeholder="Enter backup name"
                  />
                </div>
                <Button
                  onClick={handleCreateBackup}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Create Backup
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Restore from Backup</h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="backup-file">Select Backup File</Label>
                  <Input
                    id="backup-file"
                    type="file"
                    accept=".json,.bak"
                    onChange={handleFileChange}
                  />
                </div>
                <Button
                  onClick={handleRestore}
                  className="flex items-center gap-2"
                  disabled={!selectedFile}
                >
                  <Upload className="h-4 w-4" />
                  Restore
                </Button>
              </div>
            </div>

            <div className="bg-white border rounded-md">
              <h3 className="text-lg font-medium p-4 border-b">
                Available Backups
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>{backup.name}</TableCell>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.time}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="bg-white border rounded-md">
              <h3 className="text-lg font-medium p-4 border-b">
                Historical Records
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Humidity</TableHead>
                      <TableHead>Event</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{record.temp}°F</TableCell>
                        <TableCell>{record.humidity}%</TableCell>
                        <TableCell>{record.event}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataManagementModal;
