"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createRecommendation } from "@/lib/api";
import type { Recipe, DurationMin, Mood } from "@/lib/types";

function parseDuration(time?: string | null): DurationMin {
  const n = Number(time);
  return n === 15 || n === 30 || n === 60 ? n : 30;
}

function parseMood(mood?: string | null): Mood {
  return ["energetic", "neutral", "calm"].includes(mood ?? "")
    ? (mood as Mood)
    : "neutral";
}

const moodLabel: Record<Mood, string> = {
  energetic: "元気に動きたい",
  neutral: "ふつう・どちらでも",
  calm: "ゆっくり落ち着きたい",
};

export default function RecipesPage() {
  const params = useSearchParams();
  const router = useRouter();

  const duration = parseDuration(params.get("time"));
  const mood = parseMood(params.get("mood"));

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createRecommendation({
      duration_min: duration,
      mood,
      weather: "sunny",
    })
      .then((res) => {
        setRecipes(res.recipes);
        setLoading(false);
      })
      .catch(() => {
        setError("レシピの取得に失敗しました");
        setLoading(false);
      });
  }, [duration, mood]);

  const handleConfirm = () => {
    if (!selectedRecipeId) return alert("レシピを1つ選んでください");

    const query = new URLSearchParams({
      recipeId: String(selectedRecipeId),
      time: String(duration),
      mood,
    });

    router.push(`/review?${query}`);
  };

  // ローディング
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-5 py-6 sm:px-6 sm:py-7 text-center">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-text-accent mb-3">
            RECIPE
          </p>
          <p className="text-xs sm:text-sm text-text-main/80">
            おすすめレシピを生成中です…
          </p>
        </div>
      </main>
    );
  }

  // エラー
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-5 py-6 sm:px-6 sm:py-7 text-center space-y-4">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-text-accent">
            ERROR
          </p>
          <p className="text-xs sm:text-sm text-red-500">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/select")}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-border px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_14px_26px_rgba(232,155,83,0.5)] hover:brightness-105 transition"
          >
            条件をえらび直す
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      <div className="w-full max-w-[520px] md:max-w-[600px] lg:max-w-[680px] bg-card-bg shadow-[var(--color-card-shadow)] rounded-3xl px-6 sm:px-7 lg:px-8 py-7 sm:py-8 space-y-6 sm:space-y-7 backdrop-blur-[2px]">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-text-accent mb-1">
              RECIPE
            </p>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-header">
              あなたへの行動レシピ
            </h1>
          </div>
          <button
            type="button"
            onClick={() => router.push("/select")}
            className="self-start sm:self-auto text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
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

        {/* Recipe List */}
        <section>
          <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] mb-3 uppercase">
            RECOMMEND
          </p>

          <div className="max-h-[60vh] sm:max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
            <ul className="space-y-3 sm:space-y-4">
              {recipes.map((recipe) => {
                const selected = selectedRecipeId === recipe.id;

                return (
                  <li key={recipe.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedRecipeId(recipe.id)}
                      className={[
                        "w-full text-left rounded-2xl border px-4 py-3 sm:px-4 sm:py-4 transition shadow-sm hover:shadow-md text-xs sm:text-sm",
                        selected
                          ? "border-primary-border bg-primary-light"
                          : "border-primary-light/70 bg-white/90 hover:bg-bg-grad-start/70",
                      ].join(" ")}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-3">
                        <h3 className="text-[13px] sm:text-sm font-semibold text-text-main">
                          {recipe.title}
                        </h3>
                        {recipe.category && (
                          <span className="inline-flex items-center justify-center bg-chip-bg text-chip-text text-[10px] sm:text-[11px] px-3 py-1 rounded-full whitespace-nowrap">
                            {recipe.category}
                          </span>
                        )}
                      </div>
                      {recipe.description && (
                        <p className="text-[11px] sm:text-xs text-text-main/80 leading-relaxed">
                          {recipe.description}
                        </p>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Confirm Button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedRecipeId}
            className={[
              "min-w-[240px] sm:min-w-[260px] rounded-full py-3 px-8 sm:py-3.5 sm:px-10 font-semibold text-sm sm:text-[15px] transition",
              selectedRecipeId
                ? "bg-gradient-to-r from-primary to-primary-border text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-110 hover:shadow-[0_20px_36px_rgba(232,155,83,0.65)]"
                : "bg-gray-300 text-white cursor-not-allowed",
            ].join(" ")}
          >
            このレシピでレビューへ進む
          </button>
        </div>
      </div>
    </main>
  );
}
