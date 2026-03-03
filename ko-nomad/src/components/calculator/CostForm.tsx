"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Calculator } from "lucide-react";
import type {
  HousingType,
  FoodStyle,
  TransportType,
  LeisureLevel,
  CafeFrequency,
  CalculatorOptions,
} from "@/lib/calculator";

interface CostFormProps {
  options: CalculatorOptions;
  onChange: (options: CalculatorOptions) => void;
}

interface RadioOption<T extends string> {
  label: string;
  value: T;
}

const HOUSING_OPTIONS: RadioOption<HousingType>[] = [
  { label: "원룸", value: "원룸" },
  { label: "오피스텔", value: "오피스텔" },
  { label: "셰어하우스", value: "셰어하우스" },
];

const FOOD_OPTIONS: RadioOption<FoodStyle>[] = [
  { label: "자취 위주", value: "자취 위주" },
  { label: "반반", value: "반반" },
  { label: "외식·배달 위주", value: "외식·배달 위주" },
];

const TRANSPORT_OPTIONS: RadioOption<TransportType>[] = [
  { label: "대중교통", value: "대중교통" },
  { label: "자차", value: "자차" },
  { label: "도보·자전거", value: "도보·자전거" },
];

const LEISURE_OPTIONS: RadioOption<LeisureLevel>[] = [
  { label: "절약형", value: "절약형" },
  { label: "보통", value: "보통" },
  { label: "활발", value: "활발" },
];

const CAFE_OPTIONS: RadioOption<CafeFrequency>[] = [
  { label: "주 1~2회", value: "주 1~2회" },
  { label: "주 3~4회", value: "주 3~4회" },
  { label: "매일", value: "매일" },
];

const MIN_BUDGET = 500000;
const MAX_BUDGET = 3000000;
const BUDGET_STEP = 10000;

function RadioButtonGroup<T extends string>({
  label,
  emoji,
  options,
  value,
  onChange,
}: {
  label: string;
  emoji: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-2.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span>{emoji}</span>
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
              value === option.value
                ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                : "border-border bg-background text-muted-foreground hover:border-[#FF6B6B]/40 hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CostForm({ options, onChange }: CostFormProps) {
  const handleBudgetSliderChange = (values: number[]) => {
    onChange({ ...options, budget: values[0] });
  };

  const handleBudgetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(rawValue, 10);

    if (isNaN(numValue)) return;

    const clamped = Math.max(MIN_BUDGET, Math.min(MAX_BUDGET, numValue));
    onChange({ ...options, budget: clamped });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="size-5 text-[#FF6B6B]" />
          생활 스타일 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <RadioButtonGroup
          label="주거 형태"
          emoji="🏠"
          options={HOUSING_OPTIONS}
          value={options.housing}
          onChange={(v) => onChange({ ...options, housing: v })}
        />

        <RadioButtonGroup
          label="식사 스타일"
          emoji="🍽️"
          options={FOOD_OPTIONS}
          value={options.food}
          onChange={(v) => onChange({ ...options, food: v })}
        />

        <RadioButtonGroup
          label="교통 수단"
          emoji="🚌"
          options={TRANSPORT_OPTIONS}
          value={options.transport}
          onChange={(v) => onChange({ ...options, transport: v })}
        />

        <RadioButtonGroup
          label="여가 활동"
          emoji="🎮"
          options={LEISURE_OPTIONS}
          value={options.leisure}
          onChange={(v) => onChange({ ...options, leisure: v })}
        />

        <RadioButtonGroup
          label="카페 이용"
          emoji="☕"
          options={CAFE_OPTIONS}
          value={options.cafe}
          onChange={(v) => onChange({ ...options, cafe: v })}
        />

        <Separator />

        <div className="space-y-3">
          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <span>💰</span>
            월 예산
          </label>
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs text-muted-foreground">50만</span>
            <Slider
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step={BUDGET_STEP}
              value={[options.budget]}
              onValueChange={handleBudgetSliderChange}
              className="flex-1"
            />
            <span className="shrink-0 text-xs text-muted-foreground">300만</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Input
              type="text"
              value={options.budget.toLocaleString()}
              onChange={handleBudgetInputChange}
              className="h-9 w-32 text-center text-sm font-semibold"
            />
            <span className="text-sm text-muted-foreground">원</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
