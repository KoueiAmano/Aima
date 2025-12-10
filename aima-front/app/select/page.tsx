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

  const [time, setTime] = useState<number | null>(30);
  const [mood, setMood] = useState<"energetic" | "neutral" | "calm">("neutral");
  const [place, setPlace] = useState<"indoor" | "both" | "outdoor">("both");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) return;

    const params = new URLSearchParams({
      time: String(time),
      mood,
      // place は今は使わないけど、あとでAPIに渡したくなったらここに追加できる
    });

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-7 space-y-6 backdrop-blur-[2px]">
        {/* ヘッダー */}
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text-header">
            今の気分をえらぶ
          </h1>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-xs text-text-main/70 underline-offset-2 hover:underline"
          >
            ホームにもどる
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 時間 */}
          <section className="space-y-2">
            <p className="text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 1
            </p>
            <p className="text-sm text-text-main">今の余白時間はどれくらい？</p>

            <div className="grid grid-cols-3 gap-3">
              {timeOptions.map((t) => {
                const selected = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={[
                      "rounded-xl py-3 text-sm font-semibold transition border",
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
          </section>

          {/* 気分 */}
          <section className="space-y-2">
            <p className="text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 2
            </p>
            <p className="text-sm text-text-main">今の気分に近いのはどれ？</p>

            <div className="grid grid-cols-3 gap-3">
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
                      "rounded-xl py-3 px-2 text-[11px] font-semibold transition border leading-snug",
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
          </section>

          {/* 過ごし方 */}
          <section className="space-y-2">
            <p className="text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 3
            </p>
            <p className="text-sm text-text-main">
              今日はどんな場所で過ごしたい？
            </p>

            <div className="grid grid-cols-3 gap-3">
              {placeOptions.map((p) => {
                const selected = place === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setPlace(p.id as "indoor" | "both" | "outdoor")
                    }
                    className={[
                      "rounded-xl py-3 px-2 text-[11px] font-semibold transition border leading-snug",
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
          </section>

          {/* 決定ボタン */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={!time}
              className="min-w-[260px] rounded-full bg-gradient-to-r from-primary to-primary-border py-3.5 px-10 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-105 hover:shadow-[0_20px_36px_rgba(232,155,83,0.65)] disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition"
            >
              この条件でレシピを見る
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
