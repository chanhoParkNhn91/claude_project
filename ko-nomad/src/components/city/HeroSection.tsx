"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const QUICK_FILTERS = [
  { label: "카페 작업", emoji: "☕" },
  { label: "바다 근처", emoji: "🏖" },
  { label: "저렴한", emoji: "💰" },
  { label: "KTX 접근", emoji: "🚄" },
] as const;

interface HeroSectionProps {
  searchValue: string;
  onSearch: (query: string) => void;
  onFilterClick: (filter: string) => void;
  activeFilter: string | null;
}

export default function HeroSection({
  searchValue,
  onSearch,
  onFilterClick,
  activeFilter,
}: HeroSectionProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FFA07A] px-4 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          🇰🇷 대한민국에서 일하며 살기 좋은
          <br />
          도시를 찾아보세요
        </h1>
        <p className="mt-4 text-base text-white/85 sm:text-lg">
          디지털 노마드, 프리랜서, 원격근무자를 위한 도시 평가 플랫폼
        </p>

        <div className="relative mx-auto mt-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="도시 이름으로 검색..."
            value={searchValue}
            onChange={handleSearchChange}
            className="h-12 rounded-full border-0 bg-white pl-12 pr-6 text-base shadow-lg placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-white/50"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {QUICK_FILTERS.map((filter) => (
            <Badge
              key={filter.label}
              variant="secondary"
              className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                activeFilter === filter.label
                  ? "bg-white text-[#FF6B6B] shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => onFilterClick(filter.label)}
            >
              {filter.emoji} {filter.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
