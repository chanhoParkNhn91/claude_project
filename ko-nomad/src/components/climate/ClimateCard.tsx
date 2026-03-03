"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CityData } from "@/types/city";

interface ClimateCardProps {
  city: CityData;
  seasonAvgTemp: number;
  seasonAvgAqi: number;
  onSelect: (citySlug: string) => void;
}

function getAqiLabel(aqi: number): { label: string; color: string } {
  if (aqi <= 30) return { label: "좋음", color: "bg-green-100 text-green-700" };
  if (aqi <= 50) return { label: "보통", color: "bg-yellow-100 text-yellow-700" };
  if (aqi <= 100) return { label: "나쁨", color: "bg-orange-100 text-orange-700" };
  return { label: "매우 나쁨", color: "bg-red-100 text-red-700" };
}

function getTempColor(temp: number): string {
  if (temp <= 0) return "text-blue-600";
  if (temp <= 10) return "text-sky-500";
  if (temp <= 20) return "text-green-600";
  if (temp <= 28) return "text-orange-500";
  return "text-red-500";
}

export default function ClimateCard({
  city,
  seasonAvgTemp,
  seasonAvgAqi,
  onSelect,
}: ClimateCardProps) {
  const aqiInfo = getAqiLabel(seasonAvgAqi);

  return (
    <Card
      className="cursor-pointer overflow-hidden border p-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onSelect(city.slug)}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl">
          {city.weatherIcon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-foreground">
              {city.name}
            </h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {city.region}
            </Badge>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span
              className={`text-lg font-bold ${getTempColor(seasonAvgTemp)}`}
            >
              {seasonAvgTemp}°C
            </span>
            <Badge className={aqiInfo.color}>AQI {seasonAvgAqi}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="text-yellow-500">★</span>
              {city.nomadScore}
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs text-muted-foreground">노마드 점수</div>
          <div className="mt-1 text-2xl font-bold text-[#FF6B6B]">
            {city.nomadScore}
          </div>
        </div>
      </div>
    </Card>
  );
}
