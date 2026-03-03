"use client";

import { useState, useMemo } from "react";
import { cities } from "@/data/cities";
import {
  climateData,
  getSeasonAverage,
  getClimateForCity,
} from "@/data/climate";
import ClimateFilter from "@/components/climate/ClimateFilter";
import WeatherTopCities from "@/components/climate/WeatherTopCities";
import ClimateCard from "@/components/climate/ClimateCard";
import MonthlyChart from "@/components/climate/MonthlyChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { AirQualityFilter, SeasonFilter } from "@/components/climate/ClimateFilter";

export default function ClimatePage() {
  const [tempRange, setTempRange] = useState<[number, number]>([10, 25]);
  const [airQuality, setAirQuality] = useState<AirQualityFilter>("any");
  const [season, setSeason] = useState<SeasonFilter>("spring");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filteredCities = useMemo(() => {
    return cities
      .map((city) => {
        const climate = climateData.find((c) => c.citySlug === city.slug);
        if (!climate) return null;

        const seasonAvg = getSeasonAverage(climate, season);

        // 기온 필터
        if (seasonAvg.avgTemp < tempRange[0] || seasonAvg.avgTemp > tempRange[1]) {
          return null;
        }

        // 미세먼지 필터
        if (airQuality === "good" && seasonAvg.avgAqi > 30) {
          return null;
        }
        if (airQuality === "moderate" && seasonAvg.avgAqi > 50) {
          return null;
        }

        return {
          city,
          seasonAvgTemp: seasonAvg.avgTemp,
          seasonAvgAqi: seasonAvg.avgAqi,
          seasonAvgRainfall: seasonAvg.avgRainfall,
        };
      })
      .filter(
        (
          item
        ): item is {
          city: (typeof cities)[number];
          seasonAvgTemp: number;
          seasonAvgAqi: number;
          seasonAvgRainfall: number;
        } => item !== null
      )
      .sort((a, b) => a.seasonAvgAqi - b.seasonAvgAqi);
  }, [tempRange, airQuality, season]);

  const selectedCityData = useMemo(() => {
    if (!selectedCity) return null;
    const city = cities.find((c) => c.slug === selectedCity);
    const climate = getClimateForCity(selectedCity);
    if (!city || !climate) return null;
    return { city, climate };
  }, [selectedCity]);

  const seasonLabel = {
    spring: "봄 (3~5월)",
    summer: "여름 (6~8월)",
    autumn: "가을 (9~11월)",
    winter: "겨울 (12~2월)",
  }[season];

  return (
    <div className="flex min-h-screen flex-col">
      {/* 기후 검색 필터 */}
      <ClimateFilter
        tempRange={tempRange}
        onTempRangeChange={setTempRange}
        airQuality={airQuality}
        onAirQualityChange={setAirQuality}
        season={season}
        onSeasonChange={setSeason}
      />

      {/* 지금 날씨 좋은 도시 TOP 5 */}
      <WeatherTopCities cities={cities} />

      <Separator className="mx-auto max-w-7xl" />

      {/* 결과 도시 카드 리스트 */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">
            검색 결과
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {seasonLabel} 기준 {tempRange[0]}°C~{tempRange[1]}°C
            {airQuality === "good" && " · 미세먼지 좋음"}
            {airQuality === "moderate" && " · 미세먼지 보통 이하"}
            {" · "}
            {filteredCities.length}개 도시
          </p>
        </div>

        {filteredCities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
            <span className="mb-2 text-4xl">🌡️</span>
            <p className="text-lg font-medium text-muted-foreground">
              조건에 맞는 도시가 없습니다
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              기온 범위를 넓히거나 미세먼지 조건을 변경해 보세요
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {filteredCities.map(({ city, seasonAvgTemp, seasonAvgAqi }) => (
              <ClimateCard
                key={city.slug}
                city={city}
                seasonAvgTemp={seasonAvgTemp}
                seasonAvgAqi={seasonAvgAqi}
                onSelect={setSelectedCity}
              />
            ))}
          </div>
        )}
      </section>

      {/* 도시별 기후 상세 모달 */}
      <Dialog
        open={selectedCity !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCity(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {selectedCityData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  {selectedCityData.city.weatherIcon}{" "}
                  {selectedCityData.city.name} 기후 상세
                </DialogTitle>
                <DialogDescription>
                  {selectedCityData.city.region} · 현재{" "}
                  {selectedCityData.city.temperature}°C
                </DialogDescription>
              </DialogHeader>

              <Separator />

              <MonthlyChart
                data={selectedCityData.climate.monthly}
                cityName={selectedCityData.city.name}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
