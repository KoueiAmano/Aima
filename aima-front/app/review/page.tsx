// aima-front/app/review/page.tsx
import { Suspense } from "react";
import ReviewClient from "./ReviewClient";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function ReviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const recipeIdParam = Array.isArray(searchParams.recipeId)
    ? searchParams.recipeId[0]
    : searchParams.recipeId ?? null;
  const timeParam = Array.isArray(searchParams.time)
    ? searchParams.time[0]
    : searchParams.time ?? null;
  const moodParam = Array.isArray(searchParams.mood)
    ? searchParams.mood[0]
    : searchParams.mood ?? null;

  return (
    <Suspense fallback={<ReviewLoading />}>
      <ReviewClient
        recipeIdParam={recipeIdParam}
        timeParam={timeParam}
        moodParam={moodParam}
      />
    </Suspense>
  );
}

function ReviewLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 text-center space-y-3">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-text-accent uppercase">
          REVIEW
        </p>
        <p className="text-sm text-text-main/80">読み込み中...</p>
      </div>
    </main>
  );
}
