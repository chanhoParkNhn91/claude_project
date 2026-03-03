"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export type AirQualityFilter = "good" | "moderate" | "any";
export type SeasonFilter = "spring" | "summer" | "autumn" | "winter";

interface ClimateFilterProps {
  tempRange: [number, number];
  onTempRangeChange: (range: [number, number]) => void;
  airQuality: AirQualityFilter;
  onAirQualityChange: (value: AirQualityFilter) => void;
  season: SeasonFilter;
  onSeasonChange: (value: SeasonFilter) => void;
}

const AIR_QUALITY_OPTIONS: { value: AirQualityFilter; label: string }[] = [
  { value: "good", label: "좋음만" },
  { value: "moderate", label: "보통까지" },
  { value: "any", label: "무관" },
];

const SEASON_OPTIONS: { value: SeasonFilter; label: string; sub: string }[] = [
  { value: "spring", label: "봄", sub: "3~5월" },
  { value: "summer", label: "여름", sub: "6~8월" },
  { value: "autumn", label: "가을", sub: "9~11월" },
  { value: "winter", label: "겨울", sub: "12~2월" },
];

export default function ClimateFilter({
  tempRange,
  onTempRangeChange,
  airQuality,
  onAirQualityChange,
  season,
  onSeasonChange,
}: ClimateFilterProps) {
  return (
    <section className="bg-gradient-to-br from-[#FF6B6B] via-[#FF8E53] to-[#FFA07A] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            날씨/기후 파인더
          </h1>
          <p className="mt-2 text-white/80">
            선호하는 기후 조건으로 딱 맞는 도시를 찾아보세요
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-sm">
          <div className="space-y-6">
            {/* 기온 범위 슬라이더 */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  선호 기온
                </label>
                <span className="text-sm font-medium text-[#FF6B6B]">
                  {tempRange[0]}°C ~ {tempRange[1]}°C
                </span>
              </div>
              <Slider
                min={-5}
                max={35}
                step={1}
                value={tempRange}
                onValueChange={(value) =>
                  onTempRangeChange(value as [number, number])
                }
                className="[&_[data-slot=slider-range]]:bg-[#FF6B6B] [&_[data-slot=slider-thumb]]:border-[#FF6B6B]"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>-5°C</span>
                <span>35°C</span>
              </div>
            </div>

            {/* 미세먼지 필터 */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                미세먼지
              </label>
              <div className="flex flex-wrap gap-2">
                {AIR_QUALITY_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={airQuality === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onAirQualityChange(option.value)}
                    className={
                      airQuality === option.value
                        ? "bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                        : "border-gray-300 text-gray-600 hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
                    }
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 계절 선택 */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                계절 선택
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SEASON_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={season === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSeasonChange(option.value)}
                    className={
                      season === option.value
                        ? "bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                        : "border-gray-300 text-gray-600 hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
                    }
                  >
                    <span>{option.label}</span>
                    <span className="ml-1 text-xs opacity-70">
                      ({option.sub})
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
