"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CitySelector from "@/components/compare/CitySelector";
import CompareTable from "@/components/compare/CompareTable";
import { cities } from "@/data/cities";
import type { CityData } from "@/types/city";

/** URL 파라미터에서 도시 슬러그 배열 파싱 */
function parseCitySlugs(param: string | null): string[] {
  if (!param) return [];
  const validSlugs = new Set(cities.map((c) => c.slug));
  return param
    .split(",")
    .map((s) => s.trim())
    .filter((s) => validSlugs.has(s))
    .slice(0, 3); // 최대 3개
}

/** 슬러그 배열로 도시 데이터 조회 */
function getCityDataBySlugs(slugs: string[]): CityData[] {
  return slugs
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is CityData => c !== undefined);
}

/** 비교 페이지 내부 컴포넌트 (useSearchParams 사용) */
function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() =>
    parseCitySlugs(searchParams.get("cities"))
  );

  // URL 파라미터 동기화
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSlugs.length > 0) {
      params.set("cities", selectedSlugs.join(","));
    }
    const newUrl =
      selectedSlugs.length > 0
        ? `/compare?${params.toString()}`
        : "/compare";
    router.replace(newUrl, { scroll: false });
  }, [selectedSlugs, router]);

  // 선택된 도시 데이터
  const selectedCities = useMemo(
    () => getCityDataBySlugs(selectedSlugs),
    [selectedSlugs]
  );

  // 도시 추가
  const handleAdd = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.length >= 3 || prev.includes(slug)) return prev;
      return [...prev, slug];
    });
  }, []);

  // 도시 제거
  const handleRemove = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  // 전체 초기화
  const handleClear = useCallback(() => {
    setSelectedSlugs([]);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="size-7 text-[#FF6B6B]" />
            <h1 className="text-3xl font-bold text-foreground">도시 비교</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            최대 3개 도시를 선택하여 항목별로 비교해보세요
          </p>
        </div>

        {/* 도시 선택 영역 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">비교할 도시 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <CitySelector
              selectedSlugs={selectedSlugs}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onClear={handleClear}
            />
          </CardContent>
        </Card>

        {/* 비교 테이블 또는 빈 상태 */}
        {selectedCities.length >= 2 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">비교 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <CompareTable cities={selectedCities} />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center text-center">
                <ArrowLeftRight className="mb-4 size-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold text-foreground">
                  도시를 선택해주세요
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  위에서 2~3개 도시를 선택하면 월 생활비, 인터넷 속도, 카페 수,
                  코워킹 스페이스 등 다양한 항목을 한눈에 비교할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

/** 비교 페이지 (Suspense로 감싸서 useSearchParams 지원) */
export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
