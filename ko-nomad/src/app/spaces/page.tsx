"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { workspaces as staticWorkspaces } from "@/data/spaces";
import { cities as staticCities } from "@/data/cities";
import { getCities, getWorkSpaces } from "@/lib/api";
import SpaceCard from "@/components/spaces/SpaceCard";
import SpaceFilter from "@/components/spaces/SpaceFilter";
import type { SpaceType, SpaceSortOption } from "@/components/spaces/SpaceFilter";
import type { CityData } from "@/types/city";
import type { WorkSpace } from "@/data/spaces";

function SpacesContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get("city") ?? "all";

  const [cities, setCities] = useState<CityData[]>(staticCities);
  const [allSpaces, setAllSpaces] = useState<WorkSpace[]>(staticWorkspaces);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedType, setSelectedType] = useState<SpaceType>("전체");
  const [sortOption, setSortOption] = useState<SpaceSortOption>("rating");

  useEffect(() => {
    Promise.all([
      getCities()
        .then((data) => setCities(data.cities))
        .catch(() => setCities(staticCities)),
      getWorkSpaces()
        .then((data) => setAllSpaces(data as unknown as WorkSpace[]))
        .catch(() => setAllSpaces(staticWorkspaces)),
    ]).finally(() => setLoading(false));
  }, []);

  const filteredSpaces = useMemo(() => {
    let result = [...allSpaces];

    // 도시 필터
    if (selectedCity !== "all") {
      result = result.filter((s) => s.citySlug === selectedCity);
    }

    // 유형 필터
    if (selectedType !== "전체") {
      result = result.filter((s) => s.type === selectedType);
    }

    // 정렬
    result.sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.rating - a.rating;
        case "wifiSpeed":
          return b.wifiSpeed - a.wifiSpeed;
        case "reviewCount":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    return result;
  }, [allSpaces, selectedCity, selectedType, sortOption]);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* 필터 + 결과 */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SpaceFilter
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortOption={sortOption}
          onSortChange={setSortOption}
          resultCount={filteredSpaces.length}
        />

        {filteredSpaces.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
            <span className="mb-2 text-4xl">🔍</span>
            <p className="text-lg font-medium text-muted-foreground">
              조건에 맞는 작업 공간이 없습니다
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              다른 도시나 유형을 선택해 보세요
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function SpacesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 배너 */}
      <section className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          작업하기 좋은 공간을 찾아보세요
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-white/90">
          전국 주요 도시의 카페, 코워킹 스페이스, 도서관 정보를 한눈에 비교하세요.
          콘센트, WiFi 속도, 좌석 편안함까지 디지털 노마드를 위한 상세 정보를 제공합니다.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">로딩 중...</p>
          </div>
        }
      >
        <SpacesContent />
      </Suspense>
    </div>
  );
}
