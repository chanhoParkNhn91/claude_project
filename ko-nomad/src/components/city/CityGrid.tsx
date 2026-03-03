import CityCard from "@/components/city/CityCard";
import type { CityData } from "@/types/city";

interface CityGridProps {
  cities: CityData[];
}

export default function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">
          조건에 맞는 도시가 없습니다.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          다른 검색어나 필터를 시도해 보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city, index) => (
        <CityCard key={city.slug} city={city} rank={index + 1} />
      ))}
    </div>
  );
}
