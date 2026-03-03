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
import { getReviews, getHelpfulVotes, toggleHelpful, getHelpfulCount } from "@/lib/reviews";
import ReviewForm from "@/components/review/ReviewForm";
import type { Review } from "@/types/city";

interface ReviewListProps {
  reviews: Review[];
  citySlug: string;
}

type ReviewSortOption = "latest" | "helpful" | "highScore";

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
  isHelpfulVoted,
  helpfulCount,
}: {
  review: Review;
  onHelpfulClick: (reviewId: string) => void;
  isHelpfulVoted: boolean;
  helpfulCount: number;
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
          className={cn(
            "text-xs text-muted-foreground",
            isHelpfulVoted && "text-primary"
          )}
          onClick={() => onHelpfulClick(review.id)}
        >
          {isHelpfulVoted ? "👍" : "👍"} 도움이 됐어요 ({helpfulCount})
        </Button>
      </div>
    </div>
  );
}

export default function ReviewList({ reviews: initialReviews, citySlug }: ReviewListProps) {
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  const [sortOption, setSortOption] = useState<ReviewSortOption>("latest");
  const [helpfulVotes, setHelpfulVotes] = useState<Set<string>>(new Set());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadReviews = useCallback(() => {
    const reviews = getReviews(citySlug);
    setAllReviews(reviews);
  }, [citySlug]);

  useEffect(() => {
    loadReviews();
    setHelpfulVotes(getHelpfulVotes());
  }, [loadReviews]);

  const handleHelpfulClick = (reviewId: string) => {
    const result = toggleHelpful(reviewId);
    setHelpfulVotes((prev) => {
      const newVotes = new Set(prev);
      if (result.voted) {
        newVotes.add(reviewId);
      } else {
        newVotes.delete(reviewId);
      }
      return newVotes;
    });
    loadReviews();
  };

  const handleReviewAdded = () => {
    loadReviews();
  };

  const sortedReviews = [...allReviews].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "helpful":
        return getHelpfulCount(b) - getHelpfulCount(a);
      case "highScore":
        return b.totalScore - a.totalScore;
      default:
        return 0;
    }
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              리뷰 ({allReviews.length}개)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={sortOption}
                onValueChange={(val) => setSortOption(val as ReviewSortOption)}
              >
                <SelectTrigger className="w-[120px]" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="helpful">도움순</SelectItem>
                  <SelectItem value="highScore">높은 점수순</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setIsFormOpen(true)}>
                리뷰 작성하기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sortedReviews.length === 0 ? (
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
            sortedReviews.map((review, idx) => (
              <div key={review.id}>
                {idx > 0 && <Separator />}
                <ReviewCard
                  review={review}
                  onHelpfulClick={handleHelpfulClick}
                  isHelpfulVoted={helpfulVotes.has(review.id)}
                  helpfulCount={getHelpfulCount(review)}
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
