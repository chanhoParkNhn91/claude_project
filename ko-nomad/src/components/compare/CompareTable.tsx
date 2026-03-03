"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { CityData, CityScore } from "@/types/city";

interface CompareTableProps {
  /** 비교할 도시 데이터 배열 (2~3개) */
  cities: CityData[];
}

// 비교 항목 정의
interface CompareRow {
  label: string;
  emoji: string;
  /** 도시 데이터에서 값을 추출하는 함수 */
  getValue: (city: CityData) => number;
  /** 표시용 포맷 함수 */
  format: (value: number) => string;
  /** true이면 낮을수록 좋음 (비용 항목) */
  lowerIsBetter: boolean;
  /** 카테고리 구분 */
  category: "cost" | "infra" | "environment" | "score";
}

const COMPARE_ROWS: CompareRow[] = [
  // 비용 항목 (낮을수록 좋음)
  {
    label: "월 생활비",
    emoji: "💰",
    getValue: (c) => c.monthlyCost,
    format: (v) => `${(v / 10000).toFixed(0)}만원`,
    lowerIsBetter: true,
    category: "cost",
  },
  // 인프라 항목
  {
    label: "인터넷 속도",
    emoji: "📶",
    getValue: (c) => c.internetSpeed,
    format: (v) => `${v}Mbps`,
    lowerIsBetter: false,
    category: "infra",
  },
  {
    label: "카페 수",
    emoji: "☕",
    getValue: (c) => c.cafeCount,
    format: (v) => `${v}개`,
    lowerIsBetter: false,
    category: "infra",
  },
  {
    label: "코워킹 수",
    emoji: "🏢",
    getValue: (c) => c.coworkingCount,
    format: (v) => `${v}개`,
    lowerIsBetter: false,
    category: "infra",
  },
  // 환경 항목
  {
    label: "기온",
    emoji: "🌡️",
    getValue: (c) => c.temperature,
    format: (v) => `${v}°C`,
    lowerIsBetter: false, // 기온은 단순 정보 표시 (하이라이트 없음에 가깝지만, 높을수록 따뜻함)
    category: "environment",
  },
  {
    label: "미세먼지(AQI)",
    emoji: "😷",
    getValue: (c) => c.airQualityIndex,
    format: (v) => `${v}`,
    lowerIsBetter: true, // AQI는 낮을수록 좋음
    category: "environment",
  },
  // 점수 항목 (5점 만점)
  {
    label: "카페 작업",
    emoji: "💻",
    getValue: (c) => c.scores.cafeWork,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "코워킹",
    emoji: "🏗️",
    getValue: (c) => c.scores.coworking,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "교통",
    emoji: "🚌",
    getValue: (c) => c.scores.transport,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "자연환경",
    emoji: "🌿",
    getValue: (c) => c.scores.nature,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "치안",
    emoji: "🛡️",
    getValue: (c) => c.scores.safety,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "커뮤니티",
    emoji: "👥",
    getValue: (c) => c.scores.community,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
  {
    label: "나이트라이프",
    emoji: "🌙",
    getValue: (c) => c.scores.nightlife,
    format: (v) => `${v}/5`,
    lowerIsBetter: false,
    category: "score",
  },
];

// 카테고리 헤더 정보
const CATEGORY_HEADERS: Record<string, string> = {
  cost: "💰 비용",
  infra: "🔧 인프라",
  environment: "🌍 환경",
  score: "⭐ 평가 점수",
};

/** 해당 행에서 최적 값의 인덱스를 반환 */
function getBestIndices(
  values: number[],
  lowerIsBetter: boolean
): Set<number> {
  const bestValue = lowerIsBetter
    ? Math.min(...values)
    : Math.max(...values);

  const indices = new Set<number>();
  values.forEach((v, i) => {
    if (v === bestValue) indices.add(i);
  });

  // 모든 값이 동일한 경우 하이라이트 없음
  if (indices.size === values.length) return new Set();
  return indices;
}

/** 하단 요약을 위한 카테고리별 우승 도시 계산 */
interface SummaryCategoryResult {
  category: string;
  winnerName: string;
}

function generateSummary(citiesData: CityData[]): SummaryCategoryResult[] {
  const categories: { label: string; scoreKey: keyof CityScore }[] = [
    { label: "저렴함", scoreKey: "costSatisfaction" },
    { label: "인프라", scoreKey: "internet" },
    { label: "자연", scoreKey: "nature" },
    { label: "치안", scoreKey: "safety" },
    { label: "커뮤니티", scoreKey: "community" },
    { label: "나이트라이프", scoreKey: "nightlife" },
  ];

  const results: SummaryCategoryResult[] = [];

  for (const cat of categories) {
    let bestScore = -1;
    let bestCity = citiesData[0];

    for (const city of citiesData) {
      const score = city.scores[cat.scoreKey];
      if (score > bestScore) {
        bestScore = score;
        bestCity = city;
      }
    }

    // 모든 도시가 같은 점수면 표시하지 않음
    const allSame = citiesData.every(
      (c) => c.scores[cat.scoreKey] === bestScore
    );
    if (!allSame) {
      results.push({ category: cat.label, winnerName: bestCity.name });
    }
  }

  return results;
}

export default function CompareTable({ cities: citiesData }: CompareTableProps) {
  const colCount = citiesData.length;
  const summary = generateSummary(citiesData);

  // 카테고리별로 행 그룹핑
  const categoryOrder = ["cost", "infra", "environment", "score"] as const;

  return (
    <div className="space-y-6">
      {/* 도시 헤더 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              {/* 라벨 열 */}
              <th className="w-[140px] p-3 text-left text-sm font-medium text-muted-foreground">
                항목
              </th>
              {citiesData.map((city) => (
                <th key={city.slug} className="p-3 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold">{city.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {city.region}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-[#FF6B6B]/10 text-[#FF6B6B]"
                    >
                      ⭐ {city.nomadScore}
                    </Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categoryOrder.map((category) => {
              const rows = COMPARE_ROWS.filter((r) => r.category === category);
              return (
                <React.Fragment key={category}>
                  {/* 카테고리 헤더 행 */}
                  <tr>
                    <td
                      colSpan={colCount + 1}
                      className="px-3 pb-1 pt-4 text-sm font-semibold text-foreground"
                    >
                      {CATEGORY_HEADERS[category]}
                    </td>
                  </tr>
                  {/* 항목 행 */}
                  {rows.map((row) => {
                    const values = citiesData.map((c) => row.getValue(c));
                    const bestSet = getBestIndices(values, row.lowerIsBetter);

                    return (
                      <tr
                        key={row.label}
                        className="border-b border-border/50 transition-colors hover:bg-muted/30"
                      >
                        <td className="p-3 text-sm text-muted-foreground">
                          <span className="mr-2">{row.emoji}</span>
                          {row.label}
                        </td>
                        {citiesData.map((city, idx) => {
                          const value = row.getValue(city);
                          const isBest = bestSet.has(idx);
                          return (
                            <td
                              key={city.slug}
                              className={cn(
                                "p-3 text-center text-sm font-medium",
                                isBest &&
                                  "bg-green-50 font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400"
                              )}
                            >
                              {row.format(value)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 하단 요약 */}
      {summary.length > 0 && (
        <>
          <Separator />
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              한눈에 보기
            </h3>
            <p className="text-sm text-muted-foreground">
              {summary
                .map((s) => `${s.category} → ${s.winnerName}`)
                .join(" | ")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// React import를 사용하기 위해 Fragment를 사용
import React from "react";
