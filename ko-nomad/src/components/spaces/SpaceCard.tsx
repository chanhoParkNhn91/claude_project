"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cities } from "@/data/cities";
import type { WorkSpace } from "@/data/spaces";

const TYPE_COLORS: Record<WorkSpace["type"], string> = {
  "카페": "bg-amber-100 text-amber-800",
  "코워킹": "bg-blue-100 text-blue-800",
  "도서관": "bg-green-100 text-green-800",
};

const OUTLET_COLORS: Record<WorkSpace["outlet"], string> = {
  "많음": "text-green-600",
  "보통": "text-yellow-600",
  "적음": "text-red-500",
};

const NOISE_COLORS: Record<WorkSpace["noiseLevel"], string> = {
  "조용": "text-green-600",
  "보통": "text-yellow-600",
  "시끄러움": "text-red-500",
};

function renderStars(score: number): string {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += "\u2605";
  if (hasHalf) stars += "\u00BD";
  for (let i = fullStars + (hasHalf ? 1 : 0); i < 5; i++) stars += "\u2606";
  return stars;
}

function renderSeatStars(score: number): string {
  let stars = "";
  for (let i = 0; i < score; i++) stars += "\u2605";
  for (let i = score; i < 5; i++) stars += "\u2606";
  return stars;
}

interface SpaceCardProps {
  space: WorkSpace;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const city = cities.find((c) => c.slug === space.citySlug);
  const cityName = city?.name ?? space.citySlug;

  return (
    <Card className="gap-0 py-0 transition-shadow hover:shadow-md">
      <CardHeader className="gap-1 pb-3 pt-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold leading-tight">
              {space.name}
            </h3>
            <Badge
              className={`${TYPE_COLORS[space.type]} border-0 text-[11px]`}
            >
              {space.type}
            </Badge>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <span className="text-yellow-500">{renderStars(space.rating)}</span>
            <span className="font-medium">{space.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {cityName} · {space.address}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pb-5">
        {/* 정보 그리드 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-1.5">
            <span>🔌</span>
            <span className="text-muted-foreground">콘센트:</span>
            <span className={`font-medium ${OUTLET_COLORS[space.outlet]}`}>
              {space.outlet}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📶</span>
            <span className="text-muted-foreground">WiFi:</span>
            <span className="font-medium">{space.wifiSpeed} Mbps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>☕</span>
            <span className="text-muted-foreground">가격:</span>
            <span className="font-medium">{space.priceRange}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>💺</span>
            <span className="text-muted-foreground">좌석:</span>
            <span className="text-sm text-yellow-500">
              {renderSeatStars(space.seatComfort)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🔇</span>
            <span className="text-muted-foreground">소음:</span>
            <span className={`font-medium ${NOISE_COLORS[space.noiseLevel]}`}>
              {space.noiseLevel}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>⏰</span>
            <span className="text-muted-foreground">영업:</span>
            <span className="font-medium">{space.openHours}</span>
          </div>
        </div>

        {/* 태그 + 리뷰 수 */}
        <div className="flex flex-wrap items-center gap-1.5">
          {space.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            리뷰 {space.reviewCount}개
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
