"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/cities";
import type { CityData } from "@/types/city";

// 지역 그룹별 도시 분류
const REGION_GROUPS = ["수도권", "강원", "충청", "전라", "경상", "제주"] as const;

interface CitySelectorProps {
  /** 현재 선택된 도시 슬러그 배열 (최대 3개) */
  selectedSlugs: string[];
  /** 도시 추가 콜백 */
  onAdd: (slug: string) => void;
  /** 도시 제거 콜백 */
  onRemove: (slug: string) => void;
  /** 전체 초기화 콜백 */
  onClear: () => void;
}

/** 선택된 도시의 CityData를 조회 */
function findCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export default function CitySelector({
  selectedSlugs,
  onAdd,
  onRemove,
  onClear,
}: CitySelectorProps) {
  // 이미 선택된 도시는 드롭다운에서 제외
  const availableCities = cities.filter(
    (city) => !selectedSlugs.includes(city.slug)
  );

  // 지역 그룹별로 사용 가능한 도시 분류
  const groupedCities = REGION_GROUPS.map((group) => ({
    group,
    cities: availableCities.filter((c) => c.regionGroup === group),
  })).filter((g) => g.cities.length > 0);

  const isFull = selectedSlugs.length >= 3;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* 선택된 도시 뱃지 */}
        {selectedSlugs.map((slug) => {
          const city = findCity(slug);
          if (!city) return null;
          return (
            <Badge
              key={slug}
              variant="secondary"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
            >
              {city.name}
              <button
                type="button"
                onClick={() => onRemove(slug)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                aria-label={`${city.name} 제거`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          );
        })}

        {/* 도시 추가 드롭다운 */}
        {!isFull && (
          <Select onValueChange={onAdd}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="도시 추가..." />
            </SelectTrigger>
            <SelectContent>
              {groupedCities.map(({ group, cities: groupCities }) => (
                <SelectGroup key={group}>
                  <SelectLabel>{group}</SelectLabel>
                  {groupCities.map((city) => (
                    <SelectItem key={city.slug} value={city.slug}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* 전체 초기화 버튼 */}
        {selectedSlugs.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            초기화
          </Button>
        )}
      </div>

      {/* 선택 가이드 */}
      <p className="text-sm text-muted-foreground">
        {selectedSlugs.length === 0 && "비교할 도시를 선택해주세요 (최대 3개)"}
        {selectedSlugs.length === 1 && "1개 선택됨 — 비교할 도시를 더 추가해주세요"}
        {selectedSlugs.length === 2 && "2개 선택됨 — 1개 더 추가하거나 비교를 시작하세요"}
        {selectedSlugs.length === 3 && "최대 3개 선택 완료"}
      </p>
    </div>
  );
}
