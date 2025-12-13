//select/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SelectOption } from "@/components/ui/SelectOption";
import { OptionGrid } from "@/components/ui/OptionGrid";
import { timeOptions, moodOptions, placeOptions } from "@/lib/options";
import type { Mood, Weather } from "@/lib/types";

export default function SelectPage() {
  const router = useRouter();

  const [time, setTime] = useState<number | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (!time || !mood || !weather) return;

   const params = new URLSearchParams({
  duration_min: String(time),
  mood,
  weather,
});

router.push(`/recipes?${params.toString()}`);

  };

  const hasError = !time || !mood || !weather;

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[680px]">
        <div className="rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 space-y-7 backdrop-blur-[2px]">

          <form onSubmit={handleSubmit} className="space-y-7">

          {/* STEP 1 */}
          <section className="space-y-2">
            <p className="step-label">STEP 1</p>
            <p className="step-text">今、どれくらい時間ある？</p>

            <OptionGrid
              options={timeOptions.map((t) => ({ id: t, label: `${t}分` }))}
              selected={time}
              onSelect={(t) => setTime(t as number)}
              itemClassName="py-3 text-sm"
            />

            {showErrors && !time && (
              <p className="error-text">時間を1つえらんでください。</p>
            )}
          </section>

          {/* STEP 2 */}
          <section className="space-y-2">
            <p className="step-label">STEP 2</p>
            <p className="step-text">今の気分に近いのはどれ？</p>

            <OptionGrid
              options={moodOptions}
              selected={mood}
              onSelect={(v) => setMood(v)}
              itemClassName="py-3 px-2 text-[11px] leading-snug"
            />

            {showErrors && !mood && (
              <p className="error-text">気分を1つえらんでください。</p>
            )}
          </section>

          {/* STEP 3 */}
          <section className="space-y-2">
            <p className="step-label">STEP 3</p>
            <p className="step-text">今日の天気は？</p>

            <OptionGrid
              options={placeOptions}
              selected={weather}
              onSelect={(v) => setWeather(v)}
              itemClassName="py-3 px-2 text-[11px] leading-snug"
            />

            {showErrors && !weather && (
              <p className="error-text">天気をえらんでください。</p>
            )}
          </section>

          {/* SUBMIT */}
          <div className="pt-3 flex flex-col items-center gap-2">
            <button
              type="submit"
              disabled={hasError}
              className="min-w-[260px] rounded-full bg-gradient-to-r from-primary to-primary-border py-3.5 px-10 text-sm font-semibold text-white shadow-lg disabled:opacity-40"
            >
              この条件でレシピを見る
            </button>

            {showErrors && hasError && (
              <p className="error-text">
                すべての項目をえらんでください。
              </p>
            )}
          </div>
        </form>
        </div>
      </div>
    </main>
  );
}
