import { CityData, SortOption, RegionGroup, EnvironmentType } from "@/types/city";

interface FilterOptions {
  search: string;
  region: RegionGroup;
  environment: EnvironmentType;
}

export function filterCities(cities: CityData[], options: FilterOptions): CityData[] {
  const { search, region, environment } = options;

  return cities.filter((city) => {
    if (search) {
      const query = search.toLowerCase();
      const matchesName = city.name.toLowerCase().includes(query);
      const matchesRegion = city.region.toLowerCase().includes(query);
      if (!matchesName && !matchesRegion) {
        return false;
      }
    }

    if (region !== "전체" && city.regionGroup !== region) {
      return false;
    }

    if (environment !== "전체" && city.environment !== environment) {
      return false;
    }

    return true;
  });
}

export function sortCities(cities: CityData[], sortOption: SortOption): CityData[] {
  const sorted = [...cities];

  switch (sortOption) {
    case "nomadScore":
      return sorted.sort((a, b) => b.nomadScore - a.nomadScore);
    case "cost_asc":
      return sorted.sort((a, b) => a.monthlyCost - b.monthlyCost);
    case "cost_desc":
      return sorted.sort((a, b) => b.monthlyCost - a.monthlyCost);
    case "internet":
      return sorted.sort((a, b) => b.internetSpeed - a.internetSpeed);
    case "reviewCount":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "likePercent":
      return sorted.sort((a, b) => b.likePercent - a.likePercent);
    default:
      return sorted;
  }
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "nomadScore", label: "노마드점수" },
  { value: "cost_asc", label: "생활비 낮은순" },
  { value: "cost_desc", label: "생활비 높은순" },
  { value: "internet", label: "인터넷속도" },
  { value: "reviewCount", label: "리뷰수" },
];

export const REGION_OPTIONS: RegionGroup[] = [
  "전체", "수도권", "강원", "충청", "전라", "경상", "제주",
];

export const ENVIRONMENT_OPTIONS: EnvironmentType[] = [
  "전체", "해변", "산", "도심", "소도시",
];
