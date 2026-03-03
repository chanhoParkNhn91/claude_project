import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CityData } from "@/types/city";

interface CostBreakdownProps {
  city: CityData;
}

interface CostItem {
  emoji: string;
  label: string;
  getValue: (city: CityData) => number;
  color: string;
}

const COST_ITEMS: CostItem[] = [
  {
    emoji: "🏠",
    label: "월세",
    getValue: (city) => city.rentCost,
    color: "bg-blue-500",
  },
  {
    emoji: "🍽️",
    label: "식비",
    getValue: (city) => city.foodCost,
    color: "bg-orange-500",
  },
  {
    emoji: "🚌",
    label: "교통비",
    getValue: (city) => city.transportCost,
    color: "bg-green-500",
  },
  {
    emoji: "📦",
    label: "기타",
    getValue: (city) =>
      city.monthlyCost - city.rentCost - city.foodCost - city.transportCost,
    color: "bg-purple-500",
  },
];

function CostBar({
  item,
  value,
  maxValue,
}: {
  item: CostItem;
  value: number;
  maxValue: number;
}) {
  const widthPercent = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-5 text-center text-sm">{item.emoji}</span>
      <span className="w-16 shrink-0 text-sm text-muted-foreground">
        {item.label}
      </span>
      <div className="flex flex-1 items-center gap-2">
        <div className="h-3 flex-1 rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${item.color}`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
        <span className="w-28 shrink-0 text-right text-sm font-medium">
          {value.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}

export default function CostBreakdown({ city }: CostBreakdownProps) {
  const maxValue = Math.max(...COST_ITEMS.map((item) => item.getValue(city)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">월 생활비 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {COST_ITEMS.map((item) => {
            const value = item.getValue(city);
            return (
              <CostBar
                key={item.label}
                item={item}
                value={value}
                maxValue={maxValue}
              />
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">총 월 생활비</span>
          <span className="text-lg font-bold text-primary">
            {city.monthlyCost.toLocaleString()}원
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          * 1인 기준 평균 생활비이며, 라이프스타일에 따라 차이가 있을 수
          있습니다.
        </p>
      </CardContent>
    </Card>
  );
}
