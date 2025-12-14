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

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { createActivityLog } from "@/lib/api";
import type { DurationMin, Mood, Feedback } from "@/lib/types";
import Link from "next/link";

function parseDuration(time: string | null): DurationMin {
  const n = Number(time);
  return n === 15 || n === 30 || n === 60 ? n : 30;
}

function parseMood(mood: string | null): Mood {
  return ["energetic", "neutral", "calm"].includes(mood ?? "")
    ? (mood as Mood)
    : "neutral";
}

const feedbackOptions: { id: Feedback; label: string }[] = [
  { id: "good", label: "よかった" },
  { id: "normal", label: "ふつう" },
  { id: "bad", label: "いまいち" },
];

const moodLabel: Record<Mood, string> = {
  energetic: "元気に動きたい",
  neutral: "ふつう・どちらでも",
  calm: "ゆっくり落ち着きたい",
};

function ReviewContent() {
  const router = useRouter();
  const params = useSearchParams();

  const recipeIdParam = params.get("recipeId");
  const durationParam = params.get("duration_min");
  const moodParam = params.get("mood");

  // ✅ hook は先に宣言しておく（将来の安全性）
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ パラメータをメモ化（毎レンダーで再計算しない）
  const recipeId = useMemo(() => Number(recipeIdParam), [recipeIdParam]);
  const duration = useMemo(() => parseDuration(durationParam), [durationParam]);
  const mood = useMemo(() => parseMood(moodParam), [moodParam]);

  const hasValidRecipeId = Number.isFinite(recipeId) && recipeId > 0;

  // ❌ パラメータ不足 or 変な値
  if (!recipeIdParam || !hasValidRecipeId) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 text-center space-y-4 backdrop-blur-[2px]">
          <h1 className="text-lg font-semibold text-text-header">評価画面</h1>
          <p className="text-sm text-text-main/80">レシピが選択されていません。</p>
          <Link
  href="/"
  className="self-start sm:self-auto text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
>
  ホームにもどる
</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async () => {
  if (!selectedFeedback) {
    alert("評価を選んでください");
    return;
  }

  setSubmitting(true);
  setError(null);

  try {
    await createActivityLog({
      recipe_id: recipeId,
      mood,
      duration_min: duration,
      weather: "sunny",
      feedback: selectedFeedback,
    });
     router.replace("/");
  router.refresh();
  
  } catch (e) {
    console.error(e);
    setError("送信に失敗しました。時間をおいて再度お試しください。");
  } finally {
    setSubmitting(false); // 失敗時にボタン戻らない事故を防ぐ
  }
};


 
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

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center">
        <div className="text-text-main">読み込み中...</div>
      </main>
    }>
      <ReviewContent />
    </Suspense>
  );
}
