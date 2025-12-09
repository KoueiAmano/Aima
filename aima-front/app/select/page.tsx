// app/select/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const timeOptions = [
  { id: 15, label: "15分" },
  { id: 30, label: "30分" },
  { id: 60, label: "60分" },
] as const;

const moodOptions = [
  { id: "energetic", label: "ワクワクしたい" },
  { id: "neutral", label: "普通かな" },
  { id: "calm", label: "まったりしたい" },
] as const;

const categoryOptions = [
  { id: "study", label: "勉強・自己投資" },
  { id: "fun", label: "遊び・エンタメ" },
  { id: "life", label: "生活・片付け" },
] as const;

export default function SelectPage() {
  const router = useRouter();

  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedTime === null) {
      alert("時間を選んでください");
      return;
    }
    if (!selectedMood) {
      alert("気分を選んでください");
      return;
    }
    if (!selectedCategory) {
      alert("やりたいことの種類を選んでください");
      return;
    }

    const query = new URLSearchParams({
      time: String(selectedTime),
      mood: selectedMood,
      category: selectedCategory,
    });

    router.push(`/recipes?${query.toString()}`);
  };

  return (
    <main className="select-page">
      <div className="select-card">
        {/* 上部ヘッダー */}
        <header className="select-header">
          <h1 className="select-title">選択画面</h1>

          <Link href="/" className="back-button">
            ← 戻る
          </Link>
        </header>

        {/* 1行目：時間の選択 */}
        <section className="question-block">
          <p className="question-label">今の空き時間は？</p>
          <div className="option-row">
            {timeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={
                  "option-button" +
                  (selectedTime === opt.id ? " option-button--selected" : "")
                }
                onClick={() => setSelectedTime(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* 2行目：気分の選択 */}
        <section className="question-block">
          <p className="question-label">今の気分は？</p>
          <div className="option-row">
            {moodOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={
                  "option-button" +
                  (selectedMood === opt.id ? " option-button--selected" : "")
                }
                onClick={() => setSelectedMood(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* 3行目：やりたいことの種類 */}
        <section className="question-block">
          <p className="question-label">どんなことがしたい？</p>
          <div className="option-row">
            {categoryOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={
                  "option-button" +
                  (selectedCategory === opt.id
                    ? " option-button--selected"
                    : "")
                }
                onClick={() => setSelectedCategory(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* 決定ボタン */}
        <div className="submit-row">
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            決定
          </button>
        </div>
      </div>
    </main>
  );
}
