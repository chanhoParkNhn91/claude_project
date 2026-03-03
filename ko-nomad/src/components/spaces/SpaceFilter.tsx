"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/cities";
import type { WorkSpace } from "@/data/spaces";

export type SpaceType = "전체" | WorkSpace["type"];
export type SpaceSortOption = "rating" | "wifiSpeed" | "reviewCount";

interface SpaceFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedType: SpaceType;
  onTypeChange: (type: SpaceType) => void;
  sortOption: SpaceSortOption;
  onSortChange: (sort: SpaceSortOption) => void;
  resultCount: number;
}

const SPACE_TYPES: SpaceType[] = ["전체", "카페", "코워킹", "도서관"];

export default function SpaceFilter({
  selectedCity,
  onCityChange,
  selectedType,
  onTypeChange,
  sortOption,
  onSortChange,
  resultCount,
}: SpaceFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* 도시 선택 */}
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="도시 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 도시</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.slug} value={city.slug}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 유형 버튼 그룹 */}
        <div className="flex gap-1">
          {SPACE_TYPES.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => onTypeChange(type)}
              className={
                selectedType === type
                  ? "bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                  : ""
              }
            >
              {type}
            </Button>
          ))}
        </div>

        {/* 정렬 */}
        <Select value={sortOption} onValueChange={(v) => onSortChange(v as SpaceSortOption)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">평점순</SelectItem>
            <SelectItem value="wifiSpeed">WiFi 빠른순</SelectItem>
            <SelectItem value="reviewCount">리뷰 많은순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 결과 카운트 */}
      <p className="text-sm text-muted-foreground">
        총 <span className="font-semibold text-foreground">{resultCount}</span>개의 작업 공간
      </p>
    </div>
  );
}
