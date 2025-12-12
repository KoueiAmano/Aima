"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api";
import { setUserId } from "@/lib/userStore";
import type { Personality, Preference } from "@/lib/types";

const personalityOptions: { id: Personality; label: string }[] = [
  { id: "energetic", label: "元気に動きたい" },
  { id: "neutral", label: "ふつう・どちらでも" },
  { id: "calm", label: "ゆっくり落ち着きたい" },
];

const preferenceOptions: { id: Preference; label: string }[] = [
  { id: "outdoor", label: "外に出るのが好き" },
  { id: "both", label: "どちらも好き" },
  { id: "indoor", label: "おうちが好き" },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [personality, setPersonality] = useState<Personality>("neutral");
  const [preference, setPreference] = useState<Preference>("both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("名前を入力してください");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = await createUser({ name, personality, preference });
      setUserId(user.id);
      router.replace("/");
    } catch {
      setError("ユーザー登録に失敗しました");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      <div className="w-full max-w-[520px] md:max-w-[600px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] backdrop-blur-[2px] px-6 sm:px-7 py-7 sm:py-8 space-y-6 sm:space-y-7">
        {/* Header */}
        <header className="text-center space-y-2">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-text-accent uppercase">
            WELCOME
          </p>
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-header">
            ユーザー登録
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70">
            あなたに合わせたレシピを提案するため、簡単に登録してください。
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 名前 */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 1
            </p>
            <p className="text-sm sm:text-base text-text-main">
              まずは名前を教えてください
            </p>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="あなたの名前"
              className="w-full rounded-xl border border-primary-light bg-white/90 px-4 py-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </section>

          {/* personality */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 2
            </p>
            <p className="text-sm sm:text-base text-text-main">
              普段の気分タイプは？
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {personalityOptions.map((opt) => {
                const selected = personality === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPersonality(opt.id)}
                    className={[
                      "rounded-xl py-2.5 sm:py-3 px-2 text-[10px] sm:text-[11px] font-semibold transition border leading-snug",
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

          {/* preference */}
          <section className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
              STEP 3
            </p>
            <p className="text-sm sm:text-base text-text-main">
              過ごし方の傾向は？
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {preferenceOptions.map((opt) => {
                const selected = preference === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPreference(opt.id)}
                    className={[
                      "rounded-xl py-2.5 sm:py-3 px-2 text-[10px] sm:text-[11px] font-semibold transition border leading-snug",
                      selected
                        ? "bg-chip-bg/95 border-chip-bg text-white shadow-md"
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
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {/* 登録ボタン */}
          <div className="pt-1 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`min-w-[240px] sm:min-w-[260px] rounded-full py-3 px-8 sm:py-3.5 sm:px-10 text-sm sm:text-[15px] font-semibold transition ${
                loading
                  ? "bg-gray-300 text-white shadow-none cursor-default"
                  : "bg-gradient-to-r from-primary to-primary-border text-white shadow-[0_18px_30px_rgba(232,155,83,0.5)] hover:brightness-105 hover:shadow-[0_20px_36px_rgba(232,155,83,0.65)]"
              }`}
            >
              {loading ? "登録中..." : "登録してはじめる"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
