// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    // 画面全体：ふんわり縦グラデ + 中央寄せ
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4">
      {/* 内側カード：少し小さめの幅 + 角丸 + 影でカードっぽく */}
      <div className="relative w-full max-w-[420px] text-center rounded-3xl bg-card-bg shadow-[0_18px_40px_rgba(0,0,0,0.08)] px-7 py-9 backdrop-blur-[2px]">
        {/* 小さなラベル（ロゴ的役割） */}
        <p className="text-[11px] font-semibold tracking-[0.35em] text-text-accent mb-4">
          FREETIME
        </p>

        {/* 大見出し：ブラウンで締める */}
        <h1 className="mb-4 text-[30px] leading-snug font-bold text-text-header">
          余白時間を、
          <br />
          <span className="text-[34px]">ちょっと良い時間に。</span>
        </h1>

        {/* 説明文：本文用の落ち着いたブラウン + 少し薄く */}
        <p className="mb-10 text-xs leading-relaxed text-text-main/80">
          15 / 30 / 60分のすきま時間に、今の気分に合う「行動レシピ」を提案します。
        </p>

        {/* ボタンたち（縦にゆったり並べる） */}
        <div className="space-y-6 mb-10">
          {/* 1. 今の気分からはじめる（メインボタン：オレンジグラデ） */}
          <Link href="/select" className="block">
            <div className="relative mx-auto flex max-w-[380px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-border px-14 py-5 text-[15px] font-semibold text-white shadow-[0_18px_36px_rgba(232,155,83,0.55)] transition-transform transition-shadow duration-200 hover:brightness-110 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(232,155,83,0.65)]">
              <span>今の気分からはじめる</span>
              <span className="text-2xl" aria-hidden>
                📖
              </span>
            </div>
          </Link>

          {/* 2. 最近のレシピを見る（サブボタン：ゴールド〜クリーム系） */}
          <Link href="/history" className="block">
            <div className="relative mx-auto flex max-w-[380px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-chip-bg to-primary-light px-14 py-5 text-[15px] font-semibold text-chip-text shadow-[0_18px_36px_rgba(245,225,199,0.7)] transition-transform transition-shadow duration-200 hover:brightness-110 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(245,225,199,0.85)]">
              <span>最近のレシピを見る</span>
              <span className="text-2xl" aria-hidden>
                ☕️
              </span>
            </div>
          </Link>

          {/* 3. 条件をえらび直す（淡い色の三番目ボタン） */}
          <Link href="/select" className="block">
            <div className="relative mx-auto flex max-w-[380px] items-center justify-center gap-3 rounded-full bg-primary-light px-14 py-5 text-[15px] font-semibold text-text-main shadow-[0_18px_36px_rgba(255,227,215,0.8)] transition-transform transition-shadow duration-200 hover:brightness-105 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(255,227,215,0.95)]">
              <span>条件をえらび直す</span>
              <span className="text-2xl" aria-hidden>
                🛋️
              </span>
            </div>
          </Link>
        </div>

        {/* 下の小さい説明文：かなり控えめなトーン */}
        <p className="text-[11px] leading-relaxed text-text-main/70">
          気分が乗らないときは、5分だけでもOK。
          <br />
          「ちょっとやってみる」を増やすための、小さな相棒アプリです。
        </p>
      </div>
    </main>
  );
}
