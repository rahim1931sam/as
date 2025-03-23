import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Maximize2 } from "lucide-react";

interface MiniChartProps {
  roomId?: string;
  data?: {
    temperature: number[];
    humidity: number[];
    timestamps: string[];
  };
  onExpandChart?: () => void;
}

const MiniChart = ({
  roomId = "room-1",
  data = {
    temperature: [72, 73, 75, 76, 75, 74, 73],
    humidity: [65, 63, 60, 58, 59, 62, 64],
    timestamps: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
  },
  onExpandChart = () => {},
}: MiniChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw temperature line
    ctx.beginPath();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;

    const tempMax = Math.max(...data.temperature, 85);
    const tempMin = Math.min(...data.temperature, 65);
    const tempRange = tempMax - tempMin;

    data.temperature.forEach((temp, i) => {
      const x = padding + i * (chartWidth / (data.temperature.length - 1));
      const y =
        padding + chartHeight - ((temp - tempMin) / tempRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw humidity line
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;

    const humMax = Math.max(...data.humidity, 80);
    const humMin = Math.min(...data.humidity, 40);
    const humRange = humMax - humMin;

    data.humidity.forEach((hum, i) => {
      const x = padding + i * (chartWidth / (data.humidity.length - 1));
      const y =
        padding + chartHeight - ((hum - humMin) / humRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw legend
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(padding, padding / 2, 10, 10);
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText("Temp", padding + 15, padding / 2 + 8);

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(padding + 60, padding / 2, 10, 10);
    ctx.fillStyle = "#000";
    ctx.fillText("Humidity", padding + 75, padding / 2 + 8);
  }, [data]);

  return (
    <Card className="w-full bg-white/95 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-800">
          Environmental Data
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onExpandChart}
          className="h-8 w-8"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[140px]">
          <canvas
            ref={canvasRef}
            width={400}
            height={140}
            className="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniChart;
