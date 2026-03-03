"use client";

import { Search, SlidersHorizontal, MapPin, Trees, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { SortOption, RegionGroup, EnvironmentType } from "@/types/city";
import { SORT_OPTIONS, REGION_OPTIONS, ENVIRONMENT_OPTIONS } from "@/lib/filters";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  region: RegionGroup;
  onRegionChange: (value: RegionGroup) => void;
  environment: EnvironmentType;
  onEnvironmentChange: (value: EnvironmentType) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
}

function FilterSelects({
  region,
  onRegionChange,
  environment,
  onEnvironmentChange,
  sortOption,
  onSortChange,
}: Pick<
  FilterBarProps,
  | "region"
  | "onRegionChange"
  | "environment"
  | "onEnvironmentChange"
  | "sortOption"
  | "onSortChange"
>) {
  return (
    <>
      <Select value={region} onValueChange={(v) => onRegionChange(v as RegionGroup)}>
        <SelectTrigger
          className={
            region !== "전체"
              ? "border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
              : ""
          }
        >
          <MapPin className="size-4" />
          <SelectValue placeholder="지역" />
        </SelectTrigger>
        <SelectContent>
          {REGION_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={environment}
        onValueChange={(v) => onEnvironmentChange(v as EnvironmentType)}
      >
        <SelectTrigger
          className={
            environment !== "전체"
              ? "border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
              : ""
          }
        >
          <Trees className="size-4" />
          <SelectValue placeholder="환경" />
        </SelectTrigger>
        <SelectContent>
          {ENVIRONMENT_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortOption} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger
          className={
            sortOption !== "nomadScore"
              ? "border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
              : ""
          }
        >
          <ArrowUpDown className="size-4" />
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default function FilterBar({
  search,
  onSearchChange,
  region,
  onRegionChange,
  environment,
  onEnvironmentChange,
  sortOption,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilter =
    region !== "전체" || environment !== "전체" || sortOption !== "nomadScore";

  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* 검색 입력 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="도시 또는 지역을 검색하세요..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 데스크톱: 필터 드롭다운 */}
          <div className="hidden items-center gap-2 md:flex">
            <FilterSelects
              region={region}
              onRegionChange={onRegionChange}
              environment={environment}
              onEnvironmentChange={onEnvironmentChange}
              sortOption={sortOption}
              onSortChange={onSortChange}
            />
          </div>

          {/* 모바일: 필터 시트 트리거 */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative gap-1.5">
                  <SlidersHorizontal className="size-4" />
                  필터
                  {hasActiveFilter && (
                    <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#FF6B6B]" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader>
                  <SheetTitle>필터 및 정렬</SheetTitle>
                  <SheetDescription>원하는 조건으로 도시를 필터링하세요.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-4 pb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">지역</label>
                    <Select
                      value={region}
                      onValueChange={(v) => onRegionChange(v as RegionGroup)}
                    >
                      <SelectTrigger
                        className={
                          region !== "전체"
                            ? "w-full border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
                            : "w-full"
                        }
                      >
                        <MapPin className="size-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REGION_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">환경</label>
                    <Select
                      value={environment}
                      onValueChange={(v) => onEnvironmentChange(v as EnvironmentType)}
                    >
                      <SelectTrigger
                        className={
                          environment !== "전체"
                            ? "w-full border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
                            : "w-full"
                        }
                      >
                        <Trees className="size-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ENVIRONMENT_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">정렬</label>
                    <Select
                      value={sortOption}
                      onValueChange={(v) => onSortChange(v as SortOption)}
                    >
                      <SelectTrigger
                        className={
                          sortOption !== "nomadScore"
                            ? "w-full border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]"
                            : "w-full"
                        }
                      >
                        <ArrowUpDown className="size-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SORT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* 모바일 결과 카운트 */}
            <span className="text-sm text-muted-foreground">
              {resultCount}개 도시
            </span>
          </div>

          {/* 데스크톱 결과 카운트 */}
          <span className="hidden shrink-0 text-sm text-muted-foreground md:block">
            {resultCount}개 도시
          </span>
        </div>
      </div>
    </div>
  );
}
