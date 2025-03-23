import React, { useState } from "react";
import RoomCard from "./RoomCard";
import DetailedChartModal from "./DetailedChartModal";
import DataManagementModal from "./DataManagementModal";

interface Room {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  status: "idle" | "drying" | "complete" | "error";
  environmentalData: {
    temperature: number[];
    humidity: number[];
    timestamps: string[];
  };
}

interface RoomGridProps {
  rooms?: Room[];
}

const RoomGrid = ({
  rooms = [
    {
      id: "room-1",
      name: "Drying Room 1",
      temperature: 75,
      humidity: 65,
      status: "drying" as const,
      environmentalData: {
        temperature: [72, 73, 75, 76, 75, 74, 73],
        humidity: [65, 63, 60, 58, 59, 62, 64],
        timestamps: [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
        ],
      },
    },
    {
      id: "room-2",
      name: "Drying Room 2",
      temperature: 68,
      humidity: 55,
      status: "idle" as const,
      environmentalData: {
        temperature: [70, 69, 68, 68, 67, 68, 68],
        humidity: [58, 57, 56, 55, 55, 54, 55],
        timestamps: [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
        ],
      },
    },
    {
      id: "room-3",
      name: "Drying Room 3",
      temperature: 82,
      humidity: 45,
      status: "complete" as const,
      environmentalData: {
        temperature: [78, 80, 81, 82, 82, 82, 82],
        humidity: [60, 55, 50, 48, 46, 45, 45],
        timestamps: [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
        ],
      },
    },
  ],
}: RoomGridProps) => {
  const [selectedRoomForChart, setSelectedRoomForChart] = useState<Room | null>(
    null,
  );
  const [selectedRoomForData, setSelectedRoomForData] = useState<Room | null>(
    null,
  );

  const handleExpandChart = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoomForChart(room);
    }
  };

  const handleDataManagement = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoomForData(room);
    }
  };

  const handleControlChange = (
    roomId: string,
    control: string,
    value: boolean | number,
  ) => {
    console.log(`Room ${roomId} - Control ${control} changed to ${value}`);
    // In a real application, this would update the state or call an API
  };

  const closeChartModal = () => {
    setSelectedRoomForChart(null);
  };

  const closeDataModal = () => {
    setSelectedRoomForData(null);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            temperature={room.temperature}
            humidity={room.humidity}
            status={room.status}
            environmentalData={room.environmentalData}
            onExpandChart={handleExpandChart}
            onDataManagement={handleDataManagement}
            onControlChange={handleControlChange}
          />
        ))}
      </div>

      {selectedRoomForChart && (
        <DetailedChartModal
          open={!!selectedRoomForChart}
          onClose={closeChartModal}
          roomName={selectedRoomForChart.name}
          data={selectedRoomForChart.environmentalData}
        />
      )}

      {selectedRoomForData && (
        <DataManagementModal
          open={!!selectedRoomForData}
          onClose={closeDataModal}
          roomName={selectedRoomForData.name}
          roomId={selectedRoomForData.id}
        />
      )}
    </div>
  );
};

export default RoomGrid;
