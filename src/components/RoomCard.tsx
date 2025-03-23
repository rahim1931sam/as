import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import EnvironmentDisplay from "./EnvironmentDisplay";
import ControlPanel from "./ControlPanel";
import MiniChart from "./MiniChart";
import DataManagement from "./DataManagement";

interface RoomCardProps {
  roomId?: string;
  roomName?: string;
  temperature?: number;
  humidity?: number;
  status?: "idle" | "drying" | "complete" | "error";
  environmentalData?: {
    temperature: number[];
    humidity: number[];
    timestamps: string[];
  };
  onExpandChart?: (roomId: string) => void;
  onDataManagement?: (roomId: string) => void;
  onControlChange?: (
    roomId: string,
    control: string,
    value: boolean | number,
  ) => void;
}

const RoomCard = ({
  roomId = "room-1",
  roomName = "Drying Room 1",
  temperature = 75,
  humidity = 65,
  status = "idle",
  environmentalData = {
    temperature: [72, 73, 75, 76, 75, 74, 73],
    humidity: [65, 63, 60, 58, 59, 62, 64],
    timestamps: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
  },
  onExpandChart = () => {},
  onDataManagement = () => {},
  onControlChange = () => {},
}: RoomCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "drying":
        return "bg-blue-500";
      case "complete":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "drying":
        return "Drying in Progress";
      case "complete":
        return "Drying Complete";
      case "error":
        return "System Error";
      default:
        return "Idle";
    }
  };

  const handleExpandChart = () => {
    onExpandChart(roomId);
  };

  const handleDataManagement = () => {
    onDataManagement(roomId);
  };

  const handleControlChange = (control: string, value: boolean | number) => {
    onControlChange(roomId, control, value);
  };

  return (
    <Card
      className="w-full h-full bg-gradient-to-b from-white to-gray-50 shadow-lg border-t-4 overflow-hidden"
      style={{
        borderTopColor:
          getStatusColor().replace("bg-", "") === "bg-blue-500"
            ? "#3b82f6"
            : getStatusColor().replace("bg-", "") === "bg-green-500"
              ? "#22c55e"
              : getStatusColor().replace("bg-", "") === "bg-red-500"
                ? "#ef4444"
                : "#6b7280",
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{roomName}</CardTitle>
          <Badge className={`${getStatusColor()} text-white`}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <EnvironmentDisplay
          temperature={temperature}
          humidity={humidity}
          roomId={roomId}
        />

        <ControlPanel roomId={roomId} onControlChange={handleControlChange} />

        <MiniChart
          roomId={roomId}
          data={environmentalData}
          onExpandChart={handleExpandChart}
        />

        <DataManagement
          onExport={() => handleDataManagement()}
          onBackup={() => handleDataManagement()}
          onRestore={() => handleDataManagement()}
          onViewHistory={() => handleDataManagement()}
        />
      </CardContent>
    </Card>
  );
};

export default RoomCard;
