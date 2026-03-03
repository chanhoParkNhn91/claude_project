"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ThumbsUp, Sparkles } from "lucide-react";
import type { CostBreakdownResult } from "@/lib/calculator";

interface CityRecommendProps {
  results: CostBreakdownResult[];
}

export default function CityRecommend({ results }: CityRecommendProps) {
  const affordableCities = results.filter((r) => r.withinBudget);

  if (affordableCities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="size-5 text-[#FF6B6B]" />
            추천 도시
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl">😢</span>
            <p className="mt-3 text-sm font-medium text-foreground">
              현재 예산으로 살 수 있는 도시가 없습니다
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              예산을 늘리거나 생활 스타일을 조정해 보세요
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="size-5 text-[#FF6B6B]" />
          내 예산으로 살 수 있는 도시
          <Badge variant="secondary" className="ml-auto">
            {affordableCities.length}개
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {affordableCities.map((result, index) => {
            const savedAmount = Math.round(
              (results[0].total > 0
                ? result.total
                : 0) / 10000
            );
            const budgetRemaining = Math.round(
              (result.total <= result.city.monthlyCost * 2
                ? (results.find((r) => r.city.slug === result.city.slug)
                    ?.total ?? result.total)
                : result.total) / 10000
            );

            return (
              <Link
                key={result.city.slug}
                href={`/city/${result.city.slug}`}
                className="group block"
              >
                <div className="rounded-xl border p-4 transition-all hover:border-[#FF6B6B]/40 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="text-lg" title="가장 저렴">
                          🥇
                        </span>
                      )}
                      {index === 1 && (
                        <span className="text-lg" title="두번째로 저렴">
                          🥈
                        </span>
                      )}
                      {index === 2 && (
                        <span className="text-lg" title="세번째로 저렴">
                          🥉
                        </span>
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-[#FF6B6B] transition-colors">
                          {result.city.name}
                        </h4>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {result.city.region}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[#FF6B6B] border-[#FF6B6B]/30"
                    >
                      {budgetRemaining}만원
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="size-3" />
                      {result.city.likePercent}% 추천
                    </span>
                    <span>{result.city.environment}</span>
                    <span>노마드 {result.city.nomadScore}점</span>
                  </div>

                  <div className="mt-2 flex gap-1">
                    {[
                      { label: "주거", value: result.rent, color: "bg-blue-500" },
                      { label: "식비", value: result.food, color: "bg-orange-500" },
                      { label: "교통", value: result.transport, color: "bg-green-500" },
                      { label: "여가", value: result.leisure, color: "bg-purple-500" },
                      { label: "카페", value: result.cafe, color: "bg-amber-600" },
                    ].map((item) => {
                      const percent =
                        result.total > 0
                          ? Math.max((item.value / result.total) * 100, 2)
                          : 0;
                      return (
                        <div
                          key={item.label}
                          className={`h-1.5 rounded-full ${item.color}`}
                          style={{ width: `${percent}%` }}
                          title={`${item.label}: ${Math.round(item.value / 10000)}만원`}
                        />
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
