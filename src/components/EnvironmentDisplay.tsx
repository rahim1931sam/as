import React from "react";
import { Card, CardContent } from "./ui/card";
import { Thermometer, Droplets } from "lucide-react";

interface EnvironmentDisplayProps {
  temperature?: number;
  humidity?: number;
  roomId?: string;
}

const EnvironmentDisplay = ({
  temperature = 75,
  humidity = 65,
  roomId = "room-1",
}: EnvironmentDisplayProps) => {
  // Determine color based on temperature range
  const getTempColor = () => {
    if (temperature < 60) return "text-blue-500";
    if (temperature > 85) return "text-red-500";
    return "text-green-500";
  };

  // Determine color based on humidity range
  const getHumidityColor = () => {
    if (humidity < 40) return "text-amber-500";
    if (humidity > 80) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <Card className="w-full bg-white/95 shadow-md">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Thermometer className={`h-6 w-6 ${getTempColor()}`} />
              <span className="text-sm font-medium text-gray-500">
                Temperature
              </span>
            </div>
            <div className={`text-2xl font-bold ${getTempColor()}`}>
              {temperature}°F
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Droplets className={`h-6 w-6 ${getHumidityColor()}`} />
              <span className="text-sm font-medium text-gray-500">
                Humidity
              </span>
            </div>
            <div className={`text-2xl font-bold ${getHumidityColor()}`}>
              {humidity}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentDisplay;
