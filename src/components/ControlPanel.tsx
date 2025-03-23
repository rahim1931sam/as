import React, { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ControlPanelProps {
  roomId?: string;
  onControlChange?: (control: string, value: boolean | number) => void;
}

const ControlPanel = ({
  roomId = "room-1",
  onControlChange = () => {},
}: ControlPanelProps) => {
  const [heaters, setHeaters] = useState([false, false, false, false]);
  const [airDryer, setAirDryer] = useState(false);
  const [fans, setFans] = useState([false, false]);
  const [targetTemp, setTargetTemp] = useState(70);
  const [targetHumidity, setTargetHumidity] = useState(60);
  const [dryingTime, setDryingTime] = useState(24);
  const [autoMode, setAutoMode] = useState(false);

  const toggleHeater = (index: number) => {
    const newHeaters = [...heaters];
    newHeaters[index] = !newHeaters[index];
    setHeaters(newHeaters);
    onControlChange(`heater-${index + 1}`, newHeaters[index]);
  };

  const toggleFan = (index: number) => {
    const newFans = [...fans];
    newFans[index] = !newFans[index];
    setFans(newFans);
    onControlChange(`fan-${index + 1}`, newFans[index]);
  };

  const toggleAirDryer = () => {
    const newValue = !airDryer;
    setAirDryer(newValue);
    onControlChange("air-dryer", newValue);
  };

  const toggleAutoMode = () => {
    const newValue = !autoMode;
    setAutoMode(newValue);
    onControlChange("auto-mode", newValue);
  };

  const handleTargetTempChange = (value: number[]) => {
    setTargetTemp(value[0]);
    onControlChange("target-temp", value[0]);
  };

  const handleTargetHumidityChange = (value: number[]) => {
    setTargetHumidity(value[0]);
    onControlChange("target-humidity", value[0]);
  };

  const handleDryingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDryingTime(value);
    onControlChange("drying-time", value);
  };

  return (
    <Card className="w-full bg-white/95 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-800">
          Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-mode" className="font-medium">
                Auto Mode
              </Label>
              <Switch
                id="auto-mode"
                checked={autoMode}
                onCheckedChange={toggleAutoMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {heaters.map((on, index) => (
              <Button
                key={`heater-${index}`}
                variant={on ? "default" : "outline"}
                className={`h-10 ${on ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                onClick={() => toggleHeater(index)}
              >
                Heater {index + 1} {on ? "ON" : "OFF"}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={airDryer ? "default" : "outline"}
              className={`h-10 ${airDryer ? "bg-blue-500 hover:bg-blue-600" : ""}`}
              onClick={toggleAirDryer}
            >
              Air Dryer {airDryer ? "ON" : "OFF"}
            </Button>

            {fans.map((on, index) => (
              <Button
                key={`fan-${index}`}
                variant={on ? "default" : "outline"}
                className={`h-10 ${on ? "bg-green-500 hover:bg-green-600" : ""}`}
                onClick={() => toggleFan(index)}
              >
                Fan {index + 1} {on ? "ON" : "OFF"}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="target-temp">Target Temperature (°F)</Label>
                <span className="font-medium">{targetTemp}°F</span>
              </div>
              <Slider
                id="target-temp"
                min={50}
                max={100}
                step={1}
                value={[targetTemp]}
                onValueChange={handleTargetTempChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="target-humidity">Target Humidity (%)</Label>
                <span className="font-medium">{targetHumidity}%</span>
              </div>
              <Slider
                id="target-humidity"
                min={30}
                max={90}
                step={1}
                value={[targetHumidity]}
                onValueChange={handleTargetHumidityChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drying-time">Drying Time (hours)</Label>
              <Input
                id="drying-time"
                type="number"
                min={1}
                max={72}
                value={dryingTime}
                onChange={handleDryingTimeChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
