"use client";

import type { MonthlyClimate } from "@/data/climate";

interface MonthlyChartProps {
  data: MonthlyClimate[];
  cityName: string;
}

const MONTH_LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

function getTempBarColor(temp: number): string {
  if (temp <= 0) return "bg-blue-400";
  if (temp <= 10) return "bg-sky-400";
  if (temp <= 20) return "bg-green-400";
  if (temp <= 28) return "bg-orange-400";
  return "bg-red-400";
}

function getRainfallBarColor(rainfall: number): string {
  if (rainfall <= 50) return "bg-blue-200";
  if (rainfall <= 100) return "bg-blue-300";
  if (rainfall <= 200) return "bg-blue-400";
  return "bg-blue-500";
}

function getAqiBarColor(aqi: number): string {
  if (aqi <= 30) return "bg-green-400";
  if (aqi <= 50) return "bg-yellow-400";
  if (aqi <= 100) return "bg-orange-400";
  return "bg-red-400";
}

export default function MonthlyChart({ data, cityName }: MonthlyChartProps) {
  const maxTemp = Math.max(...data.map((d) => d.maxTemp));
  const minTemp = Math.min(...data.map((d) => d.minTemp));
  const tempRange = maxTemp - minTemp || 1;

  const maxRainfall = Math.max(...data.map((d) => d.rainfall));
  const maxAqi = Math.max(...data.map((d) => d.aqi));

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold text-foreground">
        {cityName} 연간 기후
      </h3>

      {/* 월별 평균 기온 차트 */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-600">
          월별 평균 기온 (°C)
        </h4>
        <div className="flex items-end gap-1.5">
          {data.map((month) => {
            const heightPercent =
              ((month.avgTemp - minTemp) / tempRange) * 100;
            const clampedHeight = Math.max(heightPercent, 4);

            return (
              <div
                key={month.month}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span className="text-xs font-medium text-gray-600">
                  {month.avgTemp}°
                </span>
                <div className="relative flex h-28 w-full items-end justify-center">
                  <div
                    className={`w-full rounded-t-sm ${getTempBarColor(month.avgTemp)} transition-all duration-300`}
                    style={{ height: `${clampedHeight}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">
                  {MONTH_LABELS[month.month - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 월별 강수량 차트 */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-600">
          월별 강수량 (mm)
        </h4>
        <div className="flex items-end gap-1.5">
          {data.map((month) => {
            const heightPercent =
              maxRainfall > 0 ? (month.rainfall / maxRainfall) * 100 : 0;
            const clampedHeight = Math.max(heightPercent, 2);

            return (
              <div
                key={month.month}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span className="text-xs font-medium text-gray-600">
                  {month.rainfall}
                </span>
                <div className="relative flex h-28 w-full items-end justify-center">
                  <div
                    className={`w-full rounded-t-sm ${getRainfallBarColor(month.rainfall)} transition-all duration-300`}
                    style={{ height: `${clampedHeight}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">
                  {MONTH_LABELS[month.month - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 연간 미세먼지 추이 */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-600">
          연간 미세먼지 추이 (AQI)
        </h4>
        <div className="flex items-end gap-1.5">
          {data.map((month) => {
            const heightPercent =
              maxAqi > 0 ? (month.aqi / maxAqi) * 100 : 0;
            const clampedHeight = Math.max(heightPercent, 4);

            return (
              <div
                key={month.month}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span className="text-xs font-medium text-gray-600">
                  {month.aqi}
                </span>
                <div className="relative flex h-28 w-full items-end justify-center">
                  <div
                    className={`w-full rounded-t-sm ${getAqiBarColor(month.aqi)} transition-all duration-300`}
                    style={{ height: `${clampedHeight}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">
                  {MONTH_LABELS[month.month - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
