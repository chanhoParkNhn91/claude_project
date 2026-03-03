import type { CityData } from "@/types/city";

export type HousingType = "원룸" | "오피스텔" | "셰어하우스";
export type FoodStyle = "자취 위주" | "반반" | "외식·배달 위주";
export type TransportType = "대중교통" | "자차" | "도보·자전거";
export type LeisureLevel = "절약형" | "보통" | "활발";
export type CafeFrequency = "주 1~2회" | "주 3~4회" | "매일";

export interface CalculatorOptions {
  housing: HousingType;
  food: FoodStyle;
  transport: TransportType;
  leisure: LeisureLevel;
  cafe: CafeFrequency;
  budget: number;
}

const HOUSING_MULTIPLIER: Record<HousingType, number> = {
  "원룸": 1.0,
  "오피스텔": 1.3,
  "셰어하우스": 0.6,
};

const FOOD_MULTIPLIER: Record<FoodStyle, number> = {
  "자취 위주": 0.7,
  "반반": 1.0,
  "외식·배달 위주": 1.5,
};

const TRANSPORT_MULTIPLIER: Record<TransportType, number> = {
  "대중교통": 1.0,
  "자차": 2.5,
  "도보·자전거": 0.2,
};

const LEISURE_COST: Record<LeisureLevel, number> = {
  "절약형": 0,
  "보통": 150000,
  "활발": 350000,
};

const CAFE_COST: Record<CafeFrequency, number> = {
  "주 1~2회": 50000,
  "주 3~4회": 120000,
  "매일": 250000,
};

export interface CostBreakdownResult {
  city: CityData;
  rent: number;
  food: number;
  transport: number;
  leisure: number;
  cafe: number;
  total: number;
  withinBudget: boolean;
}

export function calculateCityCost(
  city: CityData,
  options: CalculatorOptions
): CostBreakdownResult {
  const rent = Math.round(city.rentCost * HOUSING_MULTIPLIER[options.housing]);
  const food = Math.round(city.foodCost * FOOD_MULTIPLIER[options.food]);
  const transport = Math.round(
    city.transportCost * TRANSPORT_MULTIPLIER[options.transport]
  );
  const leisure = LEISURE_COST[options.leisure];
  const cafe = CAFE_COST[options.cafe];
  const total = rent + food + transport + leisure + cafe;

  return {
    city,
    rent,
    food,
    transport,
    leisure,
    cafe,
    total,
    withinBudget: total <= options.budget,
  };
}

export function calculateAllCities(
  cities: CityData[],
  options: CalculatorOptions
): CostBreakdownResult[] {
  return cities
    .map((city) => calculateCityCost(city, options))
    .sort((a, b) => a.total - b.total);
}

export function formatCost(value: number): string {
  if (value >= 10000) {
    const man = Math.round(value / 10000);
    return `${man}만원`;
  }
  return `${value.toLocaleString()}원`;
}

export function formatCostWon(value: number): string {
  return `${value.toLocaleString()}원`;
}
