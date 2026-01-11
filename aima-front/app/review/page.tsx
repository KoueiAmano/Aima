// aima-front/app/review/page.tsx
import { Suspense } from "react";
import ReviewClient from "./ReviewClient";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { recipeId, time, mood } = await searchParams;

  const recipeIdParam = Array.isArray(recipeId)
    ? recipeId[0]
    : recipeId ?? null;
  const timeParam = Array.isArray(time)
    ? time[0]
    : time ?? null;
  const moodParam = Array.isArray(mood)
    ? mood[0]
    : mood ?? null;

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
