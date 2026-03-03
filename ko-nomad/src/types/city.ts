export interface CityScore {
  cafeWork: number;
  coworking: number;
  internet: number;
  costSatisfaction: number;
  transport: number;
  delivery: number;
  medical: number;
  nature: number;
  noise: number;
  airQuality: number;
  safety: number;
  nightlife: number;
  community: number;
  foreignFriendly: number;
}

export interface CityData {
  slug: string;
  name: string;
  region: string;
  regionGroup: "수도권" | "강원" | "충청" | "전라" | "경상" | "제주";
  environment: "해변" | "산" | "도심" | "소도시";
  image: string;
  description: string;
  monthlyCost: number;
  rentCost: number;
  foodCost: number;
  transportCost: number;
  internetSpeed: number;
  cafeCount: number;
  coworkingCount: number;
  temperature: number;
  weatherIcon: string;
  airQualityIndex: number;
  scores: CityScore;
  nomadScore: number;
  reviewCount: number;
  likePercent: number;
}

export interface Review {
  id: string;
  citySlug: string;
  userName: string;
  userImage: string;
  stayDuration: "1주 미만" | "1~4주" | "1~3개월" | "3개월+";
  stayPurpose: "원격근무" | "프리랜서" | "워케이션" | "기타";
  visitDate: string;
  scores: {
    cafeWork: number;
    internet: number;
    cost: number;
    transport: number;
    housing: number;
    nature: number;
    safety: number;
    community: number;
  };
  pros: string;
  cons: string;
  totalScore: number;
  helpful: number;
  createdAt: string;
}

export type SortOption =
  | "nomadScore"
  | "cost_asc"
  | "cost_desc"
  | "internet"
  | "reviewCount"
  | "likePercent";

export type RegionGroup = "전체" | "수도권" | "강원" | "충청" | "전라" | "경상" | "제주";
export type EnvironmentType = "전체" | "해변" | "산" | "도심" | "소도시";
