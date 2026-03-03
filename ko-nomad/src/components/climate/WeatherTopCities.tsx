"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CityData } from "@/types/city";

interface WeatherTopCitiesProps {
  cities: CityData[];
}

function getAqiLabel(aqi: number): { label: string; color: string } {
  if (aqi <= 30) return { label: "좋음", color: "bg-green-100 text-green-700" };
  if (aqi <= 50) return { label: "보통", color: "bg-yellow-100 text-yellow-700" };
  if (aqi <= 100) return { label: "나쁨", color: "bg-orange-100 text-orange-700" };
  return { label: "매우 나쁨", color: "bg-red-100 text-red-700" };
}

export default function WeatherTopCities({ cities }: WeatherTopCitiesProps) {
  const topCities = [...cities]
    .filter((city) => city.temperature >= 15 && city.temperature <= 25)
    .sort((a, b) => a.airQualityIndex - b.airQualityIndex)
    .slice(0, 5);

  if (topCities.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">
          지금 날씨 좋은 도시 TOP {topCities.length}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          기온 15~25°C, 미세먼지 낮은 순
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {topCities.map((city, index) => {
          const aqiInfo = getAqiLabel(city.airQualityIndex);
          return (
            <Card
              key={city.slug}
              className="relative overflow-hidden border p-4 transition-all duration-200 hover:shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="bg-[#FF6B6B]/10 text-[#FF6B6B]"
                >
                  #{index + 1}
                </Badge>
                <span className="text-2xl">{city.weatherIcon}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground">{city.name}</h3>
              <p className="text-xs text-muted-foreground">{city.region}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">
                  {city.temperature}°C
                </span>
                <Badge className={aqiInfo.color}>{aqiInfo.label}</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
