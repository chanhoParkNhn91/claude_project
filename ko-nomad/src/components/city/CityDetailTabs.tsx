"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreTable from "@/components/city/ScoreTable";
import CostBreakdown from "@/components/city/CostBreakdown";
import ReviewList from "@/components/city/ReviewList";
import type { CityData, Review } from "@/types/city";

interface CityDetailTabsProps {
  city: CityData;
  reviews: Review[];
}

export default function CityDetailTabs({ city, reviews }: CityDetailTabsProps) {
  return (
    <Tabs defaultValue="scores">
      <TabsList className="w-full md:w-auto">
        <TabsTrigger value="scores">점수</TabsTrigger>
        <TabsTrigger value="cost">생활비</TabsTrigger>
        <TabsTrigger value="reviews">리뷰</TabsTrigger>
      </TabsList>

      <TabsContent value="scores" className="mt-4">
        <ScoreTable city={city} />
      </TabsContent>

      <TabsContent value="cost" className="mt-4">
        <CostBreakdown city={city} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-4">
        <ReviewList reviews={reviews} />
      </TabsContent>
    </Tabs>
  );
}
