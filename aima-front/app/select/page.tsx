// app/select/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const timeOptions = [15, 30, 60] as const;
const moodOptions = [
  { id: "energetic", label: "元気に動きたい" },
  { id: "neutral", label: "ふつう・どちらでも" },
  { id: "calm", label: "ゆっくり落ち着きたい" },
] as const;
const placeOptions = [
  { id: "indoor", label: "おうちで過ごしたい" },
  { id: "both", label: "どちらでもOK" },
  { id: "outdoor", label: "外に出たい" },
] as const;

export default function SelectPage() {
  const router = useRouter();

  // 最初は「未選択」にしておく
  const [time, setTime] = useState<number | null>(null);
  const [mood, setMood] = useState<"energetic" | "neutral" | "calm" | null>(
    null
  );
  const [weather, setWeather] = useState<"indoor" | "both" | "outdoor" | null>(
    null
  );

  // 「送信ボタン押した後にエラーを見せる」ためのフラグ
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    // どれか一つでも未選択ならここでストップ
    if (!time || !mood || !weather) return;

    const params = new URLSearchParams({
      duration_min: String(time),
      mood,
      // weather は今はAPIでは使ってない前提ならコメントアウトでもOK
      // weather,
    });

    router.push(`/recipes?${params.toString()}`);
  };

  const hasError = !time || !mood || !weather;

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      <div className="w-full max-w-[520px] md:max-w-[600px] lg:max-w-[680px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-5 sm:px-6 lg:px-8 py-7 sm:py-8 space-y-6 sm:space-y-7 backdrop-blur-[2px]">
        {/* ヘッダー */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-header">
            今の気分をえらぶ
          </h1>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="self-start sm:self-auto text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
          >
            ホームにもどる
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
          {/* 時間 */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 1
            </p>
            <p className="text-sm sm:text-base text-text-main">
              今の余白時間はどれくらい？
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {timeOptions.map((t) => {
                const selected = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={[
                      "rounded-xl py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold transition border",
                      selected
                        ? "bg-primary/90 border-primary text-white shadow-md"
                        : "bg-white/80 border-primary-light text-text-main hover:bg-primary-light/60",
                    ].join(" ")}
                  >
                    {t}分
                  </button>
                );
              })}
            </div>

            {showErrors && !time && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1">
                時間を1つえらんでください。
              </p>
            )}
          </section>

          {/* 気分 */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 2
            </p>
            <p className="text-sm sm:text-base text-text-main">
              今の気分に近いのはどれ？
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {moodOptions.map((m) => {
                const selected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      setMood(m.id as "energetic" | "neutral" | "calm")
                    }
                    className={[
                      "rounded-xl py-2.5 sm:py-3 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-semibold transition border leading-snug",
                      selected
                        ? "bg-primary-border/95 border-primary-border text-white shadow-md"
                        : "bg-white/80 border-primary-light text-text-main hover:bg-primary-light/60",
                    ].join(" ")}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {showErrors && !mood && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1">
                気分を1つえらんでください。
              </p>
            )}
          </section>

          {/* 過ごし方 */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 3
            </p>
            <p className="text-sm sm:text-base text-text-main">
              今日の天気は？
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {placeOptions.map((p) => {
                const selected = weather === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setWeather(p.id as "indoor" | "both" | "outdoor")
                    }
                    className={[
                      "rounded-xl py-2.5 sm:py-3 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-semibold transition border leading-snug",
                      selected
                        ? "bg-chip-bg/95 border-chip-bg text-white shadow-md"
                        : "bg-white/80 border-primary-light text-text-main hover:bg-primary-light/60",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {showErrors && !weather && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1">
                今日の天気を教えてください。
              </p>
            )}
          </section>

          {/* 決定ボタン */}
          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              type="submit"
              disabled={hasError}
              className="min-w-[240px] sm:min-w-[260px] rounded-full bg-gradient-to-r from-primary to-primary-border py-3 px-8 sm:py-3.5 sm:px-10 text-sm sm:text-[15px] font-semibold text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-105 hover:shadow-[0_20px_36px_rgba(232,155,83,0.65)] disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition"
            >
              この条件でレシピを見る
            </button>

            {showErrors && hasError && (
              <p className="text-[11px] sm:text-xs text-red-500">
                すべての項目をえらんでから進んでください。
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
