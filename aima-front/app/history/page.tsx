"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ← 追加
import { getActivityLogs } from "@/lib/api";
import type { ActivityLogForHistory, Mood, Feedback } from "@/lib/types";

const moodLabel: Record<Mood, string> = {
  energetic: "元気に動きたい",
  neutral: "ふつう・どちらでも",
  calm: "ゆっくり落ち着きたい",
};

const feedbackLabel: Record<Feedback, string> = {
  good: "よかった",
  normal: "ふつう",
  bad: "いまいち",
};

export default function HistoryPage() {
  const router = useRouter(); // ← 追加

  const [logs, setLogs] = useState<ActivityLogForHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getActivityLogs()
      .then(({ activity_logs }) => setLogs(activity_logs))
      .catch((e) => {
        console.error(e);
        setError("履歴の取得に失敗しました");
      })
      .finally(() => setLoading(false));
  }, []);

  // ローディング中
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-7 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-text-accent mb-3">
            HISTORY
          </p>
          <p className="text-sm text-text-main/80">履歴を読み込み中です…</p>
        </div>
      </main>
    );
  }

  // エラー表示
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-7 text-center space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] text-text-accent">
            ERROR
          </p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[640px] rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-7 space-y-6 backdrop-blur-[2px]">
        {/* ヘッダー */}
        <header className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-text-accent uppercase">
              HISTORY
            </p>
            <h1 className="text-lg font-semibold text-text-header">
              最近ためしたレシピ
            </h1>
          </div>

          {/* ← ここに追加したボタン */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-xs text-text-main/70 underline-offset-2 hover:underline"
          >
            ホームにもどる
          </button>
        </header>

        {/* 中身 */}
        {logs.length === 0 ? (
          <section className="rounded-2xl bg-white/80 border border-primary-light px-4 py-5 text-center text-sm text-text-main/80">
            まだ履歴がありません。
            <br />
            まずは気分をえらんで、最初のレシピをためしてみましょう。
          </section>
        ) : (
          <section>
            <ul className="space-y-4">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="rounded-2xl bg-white/90 border border-primary-light/60 px-4 py-4 shadow-sm hover:shadow-md transition-shadow text-sm text-text-main"
                >
                  {/* タイトル + 日時 */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <h3 className="text-[15px] font-semibold text-text-header">
                        {log.recipe_title}
                      </h3>
                      <p className="text-[11px] text-text-main/70">
                        日時：
                        {new Date(log.executed_at).toLocaleString("ja-JP", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    {/* 評価バッジ */}
                    <span className="inline-flex items-center rounded-full bg-chip-bg px-3 py-1 text-[11px] font-semibold text-chip-text">
                      評価：{feedbackLabel[log.feedback]}
                    </span>
                  </div>

                  {/* 条件＋天気 */}
                  <p className="text-[12px] text-text-main/90 mb-2">
                    時間：{log.duration_min}分 / 気分：
                    {moodLabel[log.mood as Mood]} / 天気：{log.weather}
                  </p>

                  {/* メモ・説明 */}
                  {log.description && (
                    <p className="text-[12px] text-text-main/80 leading-relaxed">
                      {log.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
