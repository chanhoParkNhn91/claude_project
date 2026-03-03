"use client";

import { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/city/HeroSection";
import FilterBar from "@/components/city/FilterBar";
import CityGrid from "@/components/city/CityGrid";
import { cities as staticCities } from "@/data/cities";
import { filterCities, sortCities } from "@/lib/filters";
import { getCities } from "@/lib/api";
import type { CityData } from "@/types/city";
import type { SortOption, RegionGroup, EnvironmentType } from "@/types/city";

const FILTER_CONFIG: Record<string, (city: CityData) => boolean> = {
  "카페 작업": (city) => city.scores.cafeWork >= 4,
  "바다 근처": (city) => city.environment === "해변",
  "저렴한": (city) => city.monthlyCost <= 1200000,
  "KTX 접근": (city) => city.scores.transport >= 4,
};

export default function Home() {
  const [cities, setCities] = useState<CityData[]>(staticCities);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [region, setRegion] = useState<RegionGroup>("전체");
  const [environment, setEnvironment] = useState<EnvironmentType>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("nomadScore");

  useEffect(() => {
    getCities()
      .then((data) => {
        setCities(data.cities);
      })
      .catch(() => {
        // API 실패 시 정적 데이터 폴백
        setCities(staticCities);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCities = useMemo(() => {
    let result = filterCities(cities, {
      search: searchQuery,
      region,
      environment,
    });

    if (activeQuickFilter && FILTER_CONFIG[activeQuickFilter]) {
      result = result.filter(FILTER_CONFIG[activeQuickFilter]);
    }

    result = sortCities(result, sortOption);

    return result;
  }, [cities, searchQuery, region, environment, sortOption, activeQuickFilter]);

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterBarSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuickFilterClick = (filter: string) => {
    setActiveQuickFilter((prev) => (prev === filter ? null : filter));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <HeroSection
          searchValue=""
          onSearch={() => {}}
          onFilterClick={() => {}}
          activeFilter={null}
        />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-32 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        searchValue={searchQuery}
        onSearch={handleHeroSearch}
        onFilterClick={handleQuickFilterClick}
        activeFilter={activeQuickFilter}
      />

      <FilterBar
        search={searchQuery}
        onSearchChange={handleFilterBarSearch}
        region={region}
        onRegionChange={setRegion}
        environment={environment}
        onEnvironmentChange={setEnvironment}
        sortOption={sortOption}
        onSortChange={setSortOption}
        resultCount={filteredCities.length}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              인기 도시 랭킹
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {sortOption === "nomadScore" ? "노마드 점수 기준" : ""}
              {sortOption === "cost_asc" ? "생활비 낮은순" : ""}
              {sortOption === "cost_desc" ? "생활비 높은순" : ""}
              {sortOption === "internet" ? "인터넷 속도순" : ""}
              {sortOption === "reviewCount" ? "리뷰 많은순" : ""}
              {sortOption === "likePercent" ? "추천율순" : ""}
              {" · "}
              {filteredCities.length}개 도시
            </p>
          </div>
        </div>

        <CityGrid cities={filteredCities} />
      </main>
    </div>
  );
}
