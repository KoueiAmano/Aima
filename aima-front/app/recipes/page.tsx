// app/recipes/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createRecommendation } from "@/lib/api";
import type { Recipe, DurationMin, Mood } from "@/lib/types";

function parseDuration(v: string | null): DurationMin {
  const n = Number(v);
  return n === 15 || n === 30 || n === 60 ? n : 30;
}
function parseMood(v: string | null): Mood {
  return v === "energetic" || v === "neutral" || v === "calm" ? v : "neutral";
}

const moodLabel: Record<Mood, string> = {
  energetic: "元気に動きたい",
  neutral: "ふつう・どちらでも",
  calm: "ゆっくり落ち着きたい",
};

export default function RecipesPage() {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ select→recipes のクエリに合わせる（duration_min）
  const duration = useMemo(
    () => parseDuration(params.get("duration_min")),
    [params]
  );
  const mood = useMemo(() => parseMood(params.get("mood")), [params]);
  const weather = useMemo(
    () => (params.get("weather") as import("@/lib/types").Weather) ?? "sunny",
    [params]
  );

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setSelectedRecipeId(null);

    createRecommendation({ duration_min: duration, mood, weather })
      .then((res) => {
        if (cancelled) return;
        setRecipes(res.recipes);
      })
      .catch(() => {
        if (cancelled) return;
        setError("レシピの取得に失敗しました");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [duration, mood]);

  const goReview = () => {
    if (!selectedRecipeId) return;

    // ✅ review 側が期待してるクエリに合わせる（time/mood/recipeId）
    const q = new URLSearchParams({
      recipeId: String(selectedRecipeId),
      duration_min: String(duration),
      mood,
    });

    router.push(`/review?${q.toString()}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 text-center space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-text-accent">
            RECIPE
          </p>
          <p className="text-xs text-text-main/80">おすすめレシピを生成中です…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-text-accent">
            ERROR
          </p>
          <p className="text-xs text-red-500">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/select")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-border px-6 py-2.5 text-xs font-semibold text-white shadow-[0_14px_26px_rgba(232,155,83,0.5)] hover:brightness-105 transition"
          >
            条件をえらび直す
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      <div className="w-full max-w-[680px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 space-y-6 backdrop-blur-[2px]">
        {/* Header */}
        <header className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-text-accent">
              RECIPE
            </p>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-header">
              あなたへの行動レシピ
            </h1>
          </div>
          <button
            type="button"
            onClick={() => router.push("/select")}
            className="text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
          >
            条件をえらび直す
          </button>
        </header>

        {/* Condition */}
        <section className="rounded-2xl bg-white/80 border border-primary-light px-4 py-3 text-[11px] sm:text-xs text-text-main">
          <p className="font-semibold text-text-accent tracking-[0.18em] text-[10px] sm:text-[11px] mb-1 uppercase">
            CONDITION
          </p>
          <p>
            時間：{duration}分 / 気分：{moodLabel[mood]}
          </p>
        </section>

        {/* List */}
        <section className="space-y-3">
          <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
            RECOMMEND
          </p>

          <ul className="space-y-3 sm:space-y-4">
            {recipes.map((r) => {
              const selected = selectedRecipeId === r.id;
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedRecipeId(r.id)}
                    className={[
                      "w-full text-left rounded-2xl border px-4 py-4 transition shadow-sm hover:shadow-md",
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-primary-light/70 bg-white/90 hover:bg-bg-grad-start/70",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-text-header">
                        {r.title}
                      </h3>
                      {selected && (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-white bg-primary px-3 py-1 rounded-full">
                          選択中
                        </span>
                      )}
                    </div>

                    {r.category && (
                      <p className="text-[10px] sm:text-[11px] text-text-main/70 mb-1">
                        カテゴリ: {r.category}
                      </p>
                    )}
                    {r.description && (
                      <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                        {r.description}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Confirm */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={goReview}
            disabled={!selectedRecipeId}
            className={[
              "min-w-[240px] sm:min-w-[260px] rounded-full py-3 px-8 sm:py-3.5 sm:px-10 font-semibold text-sm sm:text-[15px] transition",
              selectedRecipeId
                ? "bg-gradient-to-r from-primary to-primary-border text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-110"
                : "bg-gray-300 text-white cursor-not-allowed",
            ].join(" ")}
          >
            このレシピでレビューへ進む
          </button>

          {!selectedRecipeId && (
            <p className="mt-2 text-[11px] sm:text-xs text-text-main/60">
              まずレシピを1つ選んでください
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
