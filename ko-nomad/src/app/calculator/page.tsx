"use client";

import { useState, useEffect, useMemo } from "react";
import CostForm from "@/components/calculator/CostForm";
import CostChart from "@/components/calculator/CostChart";
import CityRecommend from "@/components/calculator/CityRecommend";
import { cities as staticCities } from "@/data/cities";
import { getCities } from "@/lib/api";
import {
  calculateAllCities,
  type CalculatorOptions,
} from "@/lib/calculator";
import type { CityData } from "@/types/city";

const DEFAULT_OPTIONS: CalculatorOptions = {
  housing: "원룸",
  food: "반반",
  transport: "대중교통",
  leisure: "보통",
  cafe: "주 3~4회",
  budget: 1500000,
};

export default function CalculatorPage() {
  const [cities, setCities] = useState<CityData[]>(staticCities);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<CalculatorOptions>(DEFAULT_OPTIONS);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    getCities()
      .then((data) => {
        setCities(data.cities);
      })
      .catch(() => {
        setCities(staticCities);
      })
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(
    () => calculateAllCities(cities, options),
    [cities, options]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              생활비 계산기
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              데이터를 불러오는 중...
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            생활비 계산기
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            나의 생활 스타일에 맞는 예상 월 생활비를 시뮬레이션하고, 내 예산으로
            살 수 있는 도시를 찾아보세요.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <CostForm options={options} onChange={setOptions} />
          </div>

          <div className="space-y-6">
            <CostChart
              results={results}
              budget={options.budget}
              onCitySelect={setSelectedCity}
              selectedCity={selectedCity}
            />
            <CityRecommend results={results} />
          </div>
        </div>
      </main>
    </div>
  );
}
