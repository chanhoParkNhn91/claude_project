"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getReviews as getReviewsApi, toggleHelpful as toggleHelpfulApi, createReview as createReviewApi } from "@/lib/api";
import ReviewForm from "@/components/review/ReviewForm";
import type { Review } from "@/types/city";

interface ReviewListProps {
  citySlug: string;
}

type ReviewSortOption = "latest" | "helpful" | "score";

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="text-sm text-yellow-400">
      {"★".repeat(fullStars)}
      {hasHalf && "☆"}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

function ReviewCard({
  review,
  onHelpfulClick,
  isHelpfulLoading,
}: {
  review: Review;
  onHelpfulClick: (reviewId: string) => void;
  isHelpfulLoading: boolean;
}) {
  return (
    <div className="space-y-3 py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {review.userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{review.userName}</p>
            <p className="text-xs text-muted-foreground">
              {review.visitDate} 방문
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StarRating score={review.totalScore} />
          <span className="text-sm font-semibold">{review.totalScore}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" className="text-xs">
          {review.stayDuration}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {review.stayPurpose}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-green-600">장점</span>
          <p className="mt-0.5 text-muted-foreground leading-relaxed">
            {review.pros}
          </p>
        </div>
        <div>
          <span className="font-medium text-red-500">단점</span>
          <p className="mt-0.5 text-muted-foreground leading-relaxed">
            {review.cons}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="xs"
          className="text-xs text-muted-foreground"
          onClick={() => onHelpfulClick(review.id)}
          disabled={isHelpfulLoading}
        >
          👍 도움이 됐어요 ({review.helpful})
        </Button>
      </div>
    </div>
  );
}

export default function ReviewList({ citySlug }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<ReviewSortOption>("latest");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [helpfulLoading, setHelpfulLoading] = useState(false);

  const loadReviews = useCallback(async (sort?: ReviewSortOption) => {
    try {
      const data = await getReviewsApi(citySlug, sort ?? sortOption);
      setReviews(data);
    } catch {
      setReviews([]);
    }
  }, [citySlug, sortOption]);

  useEffect(() => {
    setLoading(true);
    loadReviews()
      .finally(() => setLoading(false));
  }, [loadReviews]);

  const handleSortChange = (newSort: ReviewSortOption) => {
    setSortOption(newSort);
  };

  const handleHelpfulClick = async (reviewId: string) => {
    if (helpfulLoading) return;
    setHelpfulLoading(true);
    try {
      await toggleHelpfulApi(Number(reviewId));
      await loadReviews();
    } catch {
      // 에러 무시
    } finally {
      setHelpfulLoading(false);
    }
  };

  const handleReviewAdded = () => {
    loadReviews();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">리뷰</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              리뷰 ({reviews.length}개)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={sortOption}
                onValueChange={(val) => handleSortChange(val as ReviewSortOption)}
              >
                <SelectTrigger className="w-[120px]" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="helpful">도움순</SelectItem>
                  <SelectItem value="score">높은 점수순</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setIsFormOpen(true)}>
                리뷰 작성하기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                아직 리뷰가 없습니다
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                첫 번째 리뷰를 작성해보세요!
              </p>
              <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                리뷰 작성하기
              </Button>
            </div>
          ) : (
            reviews.map((review, idx) => (
              <div key={review.id}>
                {idx > 0 && <Separator />}
                <ReviewCard
                  review={review}
                  onHelpfulClick={handleHelpfulClick}
                  isHelpfulLoading={helpfulLoading}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <ReviewForm
        citySlug={citySlug}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onReviewAdded={handleReviewAdded}
      />
    </>
  );
}
