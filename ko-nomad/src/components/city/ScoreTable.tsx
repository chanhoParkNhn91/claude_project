import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ScoreBar from "@/components/city/ScoreBar";
import type { CityData } from "@/types/city";

interface ScoreTableProps {
  city: CityData;
}

interface ScoreCategory {
  title: string;
  items: {
    emoji: string;
    label: string;
    scoreKey: keyof CityData["scores"];
    extra?: (city: CityData) => string;
  }[];
}

const SCORE_CATEGORIES: ScoreCategory[] = [
  {
    title: "작업 환경",
    items: [
      { emoji: "☕", label: "카페 작업", scoreKey: "cafeWork" },
      { emoji: "🏢", label: "코워킹", scoreKey: "coworking" },
      { emoji: "📶", label: "인터넷 속도", scoreKey: "internet" },
      { emoji: "🔌", label: "콘센트", scoreKey: "cafeWork" },
    ],
  },
  {
    title: "생활비",
    items: [
      {
        emoji: "💰",
        label: "월 생활비",
        scoreKey: "costSatisfaction",
        extra: (city) => `₩${city.monthlyCost.toLocaleString()}`,
      },
      {
        emoji: "🏠",
        label: "월세",
        scoreKey: "costSatisfaction",
        extra: (city) => `₩${city.rentCost.toLocaleString()}`,
      },
      {
        emoji: "🍽️",
        label: "식비",
        scoreKey: "costSatisfaction",
        extra: (city) => `₩${city.foodCost.toLocaleString()}`,
      },
    ],
  },
  {
    title: "생활 편의",
    items: [
      { emoji: "🚌", label: "대중교통", scoreKey: "transport" },
      { emoji: "🛵", label: "배달 인프라", scoreKey: "delivery" },
      { emoji: "🏥", label: "의료시설", scoreKey: "medical" },
    ],
  },
  {
    title: "환경",
    items: [
      { emoji: "🌿", label: "자연환경", scoreKey: "nature" },
      { emoji: "🔇", label: "소음", scoreKey: "noise" },
      {
        emoji: "😷",
        label: "미세먼지",
        scoreKey: "airQuality",
        extra: (city) => `AQI ${city.airQualityIndex}`,
      },
      { emoji: "🛡️", label: "치안", scoreKey: "safety" },
    ],
  },
  {
    title: "커뮤니티",
    items: [
      { emoji: "👥", label: "노마드 커뮤니티", scoreKey: "community" },
      { emoji: "🌍", label: "외국인 친화도", scoreKey: "foreignFriendly" },
      { emoji: "🌙", label: "나이트라이프", scoreKey: "nightlife" },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  "작업 환경": "🖥",
  "생활비": "💰",
  "생활 편의": "🚌",
  "환경": "🌿",
  "커뮤니티": "👥",
};

export default function ScoreTable({ city }: ScoreTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">상세 점수</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {SCORE_CATEGORIES.map((category, idx) => (
          <div key={category.title}>
            {idx > 0 && <Separator className="mb-6" />}
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {CATEGORY_ICONS[category.title]} {category.title}
            </h3>
            <div className="space-y-1">
              {category.items.map((item) => (
                <ScoreBar
                  key={`${category.title}-${item.label}`}
                  emoji={item.emoji}
                  label={item.label}
                  score={city.scores[item.scoreKey]}
                  extra={item.extra?.(city)}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
