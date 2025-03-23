import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DetailedChartModalProps {
  open?: boolean;
  onClose?: () => void;
  roomName?: string;
  data?: {
    temperature: number[];
    humidity: number[];
    timestamps: string[];
  };
}

const DetailedChartModal = ({
  open = false,
  onClose = () => {},
  roomName = "Drying Room",
  data = {
    temperature: [72, 73, 75, 76, 75, 74, 73, 72, 71, 70, 72, 73, 74],
    humidity: [65, 63, 60, 58, 59, 62, 64, 65, 67, 68, 66, 64, 63],
    timestamps: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ],
  },
}: DetailedChartModalProps) => {
  const temperatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const humidityCanvasRef = useRef<HTMLCanvasElement>(null);
  const combinedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!open) return;

    // Draw temperature chart
    drawTemperatureChart();

    // Draw humidity chart
    drawHumidityChart();

    // Draw combined chart
    drawCombinedChart();
  }, [open, data]);

  const drawTemperatureChart = () => {
    const canvas = temperatureCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Temperature labels
      const tempValue = Math.round(85 - i * 5);
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`${tempValue}°F`, padding - 10, y + 4);
    }

    // Vertical grid lines and time labels
    const timeStep = Math.ceil(data.timestamps.length / 10);
    for (let i = 0; i < data.timestamps.length; i += timeStep) {
      const x = padding + i * (chartWidth / (data.timestamps.length - 1));
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();

      // Time labels
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(data.timestamps[i], x, height - padding + 20);
    }

    // Draw temperature line
    ctx.beginPath();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;

    data.temperature.forEach((temp, i) => {
      const x = padding + i * (chartWidth / (data.temperature.length - 1));
      // Scale temperature to fit in chart (assuming range 65-85°F)
      const y = padding + chartHeight - ((temp - 65) / 20) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = "rgba(239, 68, 68, 0.1)";
    ctx.fill();

    // Chart title
    ctx.fillStyle = "#111827";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Temperature Over Time", width / 2, padding / 2);
  };

  const drawHumidityChart = () => {
    const canvas = humidityCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Humidity labels
      const humValue = Math.round(80 - i * 10);
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`${humValue}%`, padding - 10, y + 4);
    }

    // Vertical grid lines and time labels
    const timeStep = Math.ceil(data.timestamps.length / 10);
    for (let i = 0; i < data.timestamps.length; i += timeStep) {
      const x = padding + i * (chartWidth / (data.timestamps.length - 1));
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();

      // Time labels
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(data.timestamps[i], x, height - padding + 20);
    }

    // Draw humidity line
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;

    data.humidity.forEach((hum, i) => {
      const x = padding + i * (chartWidth / (data.humidity.length - 1));
      // Scale humidity to fit in chart (assuming range 30-80%)
      const y = padding + chartHeight - ((hum - 30) / 50) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
    ctx.fill();

    // Chart title
    ctx.fillStyle = "#111827";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Humidity Over Time", width / 2, padding / 2);
  };

  const drawCombinedChart = () => {
    const canvas = combinedCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Temperature labels (left side)
      const tempValue = Math.round(85 - i * 5);
      ctx.fillStyle = "#ef4444";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`${tempValue}°F`, padding - 10, y + 4);

      // Humidity labels (right side)
      const humValue = Math.round(80 - i * 10);
      ctx.fillStyle = "#3b82f6";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${humValue}%`, width - padding + 10, y + 4);
    }

    // Vertical grid lines and time labels
    const timeStep = Math.ceil(data.timestamps.length / 10);
    for (let i = 0; i < data.timestamps.length; i += timeStep) {
      const x = padding + i * (chartWidth / (data.timestamps.length - 1));
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();

      // Time labels
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(data.timestamps[i], x, height - padding + 20);
    }

    // Draw temperature line
    ctx.beginPath();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;

    data.temperature.forEach((temp, i) => {
      const x = padding + i * (chartWidth / (data.temperature.length - 1));
      // Scale temperature to fit in chart (assuming range 65-85°F)
      const y = padding + chartHeight - ((temp - 65) / 20) * chartHeight;

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
    ctx.lineWidth = 3;

    data.humidity.forEach((hum, i) => {
      const x = padding + i * (chartWidth / (data.humidity.length - 1));
      // Scale humidity to fit in chart (assuming range 30-80%)
      const y = padding + chartHeight - ((hum - 30) / 50) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Chart title
    ctx.fillStyle = "#111827";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Temperature & Humidity", width / 2, padding / 2);

    // Legend
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(padding, height - padding + 30, 15, 15);
    ctx.fillStyle = "#111827";
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Temperature", padding + 25, height - padding + 42);

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(padding + 150, height - padding + 30, 15, 15);
    ctx.fillStyle = "#111827";
    ctx.fillText("Humidity", padding + 175, height - padding + 42);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {roomName} - Environmental Data
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="combined" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combined">Combined</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="humidity">Humidity</TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="mt-4">
            <div className="w-full h-[500px] bg-white rounded-md p-4">
              <canvas
                ref={combinedCanvasRef}
                width={1000}
                height={500}
                className="w-full h-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="temperature" className="mt-4">
            <div className="w-full h-[500px] bg-white rounded-md p-4">
              <canvas
                ref={temperatureCanvasRef}
                width={1000}
                height={500}
                className="w-full h-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="humidity" className="mt-4">
            <div className="w-full h-[500px] bg-white rounded-md p-4">
              <canvas
                ref={humidityCanvasRef}
                width={1000}
                height={500}
                className="w-full h-full"
              />
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

export default DetailedChartModal;
