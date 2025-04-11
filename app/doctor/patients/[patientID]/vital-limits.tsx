"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";

interface VitalLimits {
  heartRate: {
    min: number;
    max: number;
  };
  temperature: {
    min: number;
    max: number;
  };
  bloodOxygen: {
    min: number;
    max: number;
  };
}

const VitalLimitsCard = () => {
  const [vitalLimits, setVitalLimits] = useState<VitalLimits>({
    heartRate: { min: 60, max: 100 },
    temperature: { min: 97, max: 99 },
    bloodOxygen: { min: 95, max: 100 }
  });

  const { patientID } = useParams();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const payload = {
        patientId: patientID,
        temperatureMin: vitalLimits.temperature.min,
        temperatureMax: vitalLimits.temperature.max,
        bloodOxygenMin: vitalLimits.bloodOxygen.min,
        bloodOxygenMax: vitalLimits.bloodOxygen.max,
        heartRateMin: vitalLimits.heartRate.min,
        heartRateMax: vitalLimits.heartRate.max
      };

      const { data: res } = await axiosInstance.post(
        '/doctor/vital-limits',
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      if (res.error) {
        throw new Error(res.error);
      }

      toast({
        title: "Success",
        description: "Vital limits updated successfully",
      });
    } catch (error) {
      console.error("Failed to save vital limits:", error);
      toast({
        title: "Error",
        description: "Failed to save vital limits",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Vital Limits</CardTitle>
        <CardDescription>Set acceptable ranges for patient vitals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Heart Rate (BPM)</h3>
            <div className="flex gap-4">
              <div className="space-y-2">
                <Label>Minimum</Label>
                <Input
                  type="number"
                  value={vitalLimits.heartRate.min}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    heartRate: { ...vitalLimits.heartRate, min: Number(e.target.value) }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum</Label>
                <Input
                  type="number"
                  value={vitalLimits.heartRate.max}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    heartRate: { ...vitalLimits.heartRate, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Temperature (°F)</h3>
            <div className="flex gap-4">
              <div className="space-y-2">
                <Label>Minimum</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={vitalLimits.temperature.min}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    temperature: { ...vitalLimits.temperature, min: Number(e.target.value) }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={vitalLimits.temperature.max}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    temperature: { ...vitalLimits.temperature, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Blood Oxygen (%)</h3>
            <div className="flex gap-4">
              <div className="space-y-2">
                <Label>Minimum</Label>
                <Input
                  type="number"
                  value={vitalLimits.bloodOxygen.min}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    bloodOxygen: { ...vitalLimits.bloodOxygen, min: Number(e.target.value) }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum</Label>
                <Input
                  type="number"
                  value={vitalLimits.bloodOxygen.max}
                  onChange={(e) => setVitalLimits({
                    ...vitalLimits,
                    bloodOxygen: { ...vitalLimits.bloodOxygen, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>
          Save Vital Limits
        </Button>
      </CardContent>
    </Card>
  );
};

export default VitalLimitsCard;