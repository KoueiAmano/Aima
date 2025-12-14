// aima-front/app/review/ReviewClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createActivityLog } from "@/lib/api";
import type { DurationMin, Mood, Feedback } from "@/lib/types";

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

export default function ReviewClient({
  recipeIdParam,
  timeParam,
  moodParam,
}: {
  recipeIdParam: string | null;
  timeParam: string | null;
  moodParam: string | null;
}) {
  const router = useRouter();

  // ❌ パラメータ不足時
  if (!recipeIdParam) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 text-center space-y-4 backdrop-blur-[2px]">
          <h1 className="text-lg font-semibold text-text-header">評価画面</h1>
          <p className="text-sm text-text-main/80">レシピが選択されていません。</p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-border px-6 py-2.5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(232,155,83,0.5)] hover:brightness-105 transition"
          >
            ホームに戻る
          </button>
        </div>
      </main>
    );
  }

  const recipeId = Number(recipeIdParam);
  const duration = parseDuration(timeParam);
  const mood = parseMood(moodParam);

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // ✅ 保存できたらホームへ
      router.push("/");
    } catch (e) {
      console.error(e);
      setError("送信に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      <div className="w-full max-w-[520px] md:max-w-[600px] lg:max-w-[680px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 space-y-6 sm:space-y-7 backdrop-blur-[2px]">
        {/* ヘッダー */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-text-accent uppercase">
              REVIEW
            </p>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-header">
              今回のレシピの評価
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="self-start sm:self-auto text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
          >
            ホームにもどる
          </button>
        </header>

        {/* CONDITION */}
        <section className="space-y-2">
          <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
            CONDITION
          </p>

          <div className="rounded-2xl bg-white/80 border border-primary-light px-4 py-3 text-left text-xs sm:text-[13px] text-text-main/90 space-y-1">
            <p>
              <span className="font-semibold">時間：</span>
              {duration} 分
            </p>
            <p>
              <span className="font-semibold">気分：</span>
              {moodLabel[mood]}
            </p>
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="space-y-3">
          <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
            FEEDBACK
          </p>

          <p className="text-sm sm:text-base text-text-main">今回のレシピ、どうだった？</p>

          <div className="flex flex-wrap gap-3">
            {feedbackOptions.map((opt) => {
              const selected = selectedFeedback === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFeedback(opt.id)}
                  className={[
                    "rounded-full px-4 py-2 text-xs sm:text-[13px] font-semibold transition border",
                    selected
                      ? "bg-primary-border/95 border-primary-border text-white shadow-md"
                      : "bg-white/80 border-primary-light text-text-main hover:bg-primary-light/60",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* エラー */}
        {error && (
          <p className="text-xs sm:text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`min-w-[240px] sm:min-w-[260px] rounded-full py-3 px-8 sm:py-3.5 sm:px-10 text-sm sm:text-[15px] font-semibold transition ${
              submitting
                ? "bg-gray-300 text-white shadow-none cursor-default"
                : "bg-gradient-to-r from-primary to-primary-border text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-105 hover:shadow-[0_20px_36px_rgba(232,155,83,0.65)]"
            }`}
          >
            {submitting ? "送信中..." : "この評価で保存する"}
          </button>
        </div>
      </div>
    </main>
  );
}
