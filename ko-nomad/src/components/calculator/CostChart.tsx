"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3 } from "lucide-react";
import type { CostBreakdownResult } from "@/lib/calculator";

interface CostChartProps {
  results: CostBreakdownResult[];
  budget: number;
  onCitySelect: (slug: string) => void;
  selectedCity: string | null;
}

const BREAKDOWN_ITEMS = [
  { key: "rent" as const, label: "주거", emoji: "🏠", color: "bg-blue-500" },
  { key: "food" as const, label: "식비", emoji: "🍽️", color: "bg-orange-500" },
  {
    key: "transport" as const,
    label: "교통",
    emoji: "🚌",
    color: "bg-green-500",
  },
  {
    key: "leisure" as const,
    label: "여가",
    emoji: "🎮",
    color: "bg-purple-500",
  },
  { key: "cafe" as const, label: "카페", emoji: "☕", color: "bg-amber-600" },
];

function BarChartItem({
  result,
  maxCost,
  budget,
  isSelected,
  onClick,
}: {
  result: CostBreakdownResult;
  maxCost: number;
  budget: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const widthPercent = maxCost > 0 ? (result.total / maxCost) * 100 : 0;
  const budgetLinePercent = maxCost > 0 ? (budget / maxCost) * 100 : 0;
  const totalMan = Math.round(result.total / 10000);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all hover:bg-muted/50 ${
        isSelected ? "bg-muted/70" : ""
      }`}
    >
      <span className="w-20 shrink-0 text-sm font-medium text-foreground sm:w-24">
        {result.city.name}
      </span>
      <div className="relative flex-1">
        <div className="h-7 w-full rounded bg-muted/40">
          <div
            className={`flex h-full items-center rounded transition-all ${
              result.withinBudget
                ? "bg-[#FF6B6B]/80 group-hover:bg-[#FF6B6B]"
                : "bg-red-400/70 group-hover:bg-red-400"
            }`}
            style={{ width: `${Math.max(widthPercent, 2)}%` }}
          >
            <span
              className={`px-2 text-xs font-semibold ${
                widthPercent > 15 ? "text-white" : "text-transparent"
              }`}
            >
              {totalMan}만원
            </span>
          </div>
        </div>
        {budgetLinePercent <= 100 && (
          <div
            className="absolute top-0 h-full w-px border-l-2 border-dashed border-foreground/30"
            style={{ left: `${budgetLinePercent}%` }}
          />
        )}
      </div>
      <span
        className={`w-16 shrink-0 text-right text-sm font-semibold sm:w-20 ${
          result.withinBudget ? "text-foreground" : "text-red-500"
        }`}
      >
        {totalMan}만원
      </span>
    </button>
  );
}

function CityBreakdown({ result }: { result: CostBreakdownResult }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">
        {result.city.name} 항목별 비용
      </h4>
      <div className="space-y-2">
        {BREAKDOWN_ITEMS.map((item) => {
          const value = result[item.key];
          const percent =
            result.total > 0 ? Math.round((value / result.total) * 100) : 0;
          const valueMan = Math.round(value / 10000);

          return (
            <div key={item.key} className="flex items-center gap-2">
              <span className="w-5 text-center text-sm">{item.emoji}</span>
              <span className="w-10 shrink-0 text-xs text-muted-foreground">
                {item.label}
              </span>
              <div className="h-4 flex-1 rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${item.color} transition-all`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs font-medium text-foreground">
                {valueMan}만원 ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">총 예상 생활비</span>
        <span
          className={`text-lg font-bold ${
            result.withinBudget ? "text-[#FF6B6B]" : "text-red-500"
          }`}
        >
          {Math.round(result.total / 10000)}만원
        </span>
      </div>
    </div>
  );
}

export default function CostChart({
  results,
  budget,
  onCitySelect,
  selectedCity,
}: CostChartProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const maxCost = results.length > 0 ? Math.max(...results.map((r) => r.total), budget) : budget;

  const withinBudgetCount = results.filter((r) => r.withinBudget).length;

  const displayResult =
    results.find(
      (r) =>
        r.city.slug === (hoveredCity ?? selectedCity ?? results[0]?.city.slug)
    ) ?? results[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <BarChart3 className="size-5 text-[#FF6B6B]" />
            도시별 예상 월 생활비
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            예산 이내{" "}
            <span className="font-semibold text-[#FF6B6B]">
              {withinBudgetCount}
            </span>
            개 도시
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-0.5">
          {results.map((result) => (
            <div
              key={result.city.slug}
              onMouseEnter={() => setHoveredCity(result.city.slug)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <BarChartItem
                result={result}
                maxCost={maxCost}
                budget={budget}
                isSelected={selectedCity === result.city.slug}
                onClick={() => onCitySelect(result.city.slug)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded bg-[#FF6B6B]/80" />
            예산 이내
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded bg-red-400/70" />
            예산 초과
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-px border-l-2 border-dashed border-foreground/30" />
            예산 기준선
          </span>
        </div>

        {displayResult && (
          <>
            <Separator />
            <CityBreakdown result={displayResult} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
