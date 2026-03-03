import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Review } from "@/types/city";

interface ReviewListProps {
  reviews: Review[];
}

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="text-sm">
      {"★".repeat(fullStars)}
      {hasHalf && "☆"}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
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
          <span className="font-medium text-green-600">👍 장점</span>
          <p className="mt-0.5 text-muted-foreground leading-relaxed">
            {review.pros}
          </p>
        </div>
        <div>
          <span className="font-medium text-red-500">👎 단점</span>
          <p className="mt-0.5 text-muted-foreground leading-relaxed">
            {review.cons}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span>👍 {review.helpful}명에게 도움이 됨</span>
      </div>
    </div>
  );
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            아직 리뷰가 없습니다
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            첫 번째 리뷰를 작성해보세요!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          리뷰 ({reviews.length}개)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.map((review, idx) => (
          <div key={review.id}>
            {idx > 0 && <Separator />}
            <ReviewCard review={review} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
