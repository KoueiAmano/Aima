"use client";


// app/page.tsx
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId,clearUserId } from "@/lib/userStore";



export default function HomePage() {

  const router = useRouter();

  const handleLogout = () => {
    if (!confirm("ログアウトしますか？")) return;
    clearUserId();
  router.replace("/onboarding");
};

  useEffect(() => {
    if (!getUserId()) router.replace("/onboarding");
  }, [router]);

  return (
    // PC では上下の余白少し減らす
    <main className="min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10 sm:py-14 lg:py-12">
      {/* PC では横幅をちょい広げる */}
      <div className="relative w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[560px] text-center rounded-3xl bg-card-bg shadow-[0_18px_40px_rgba(0,0,0,0.08)] px-6 sm:px-7 lg:px-10 py-8 sm:py-9 backdrop-blur-[2px]">
       
       <button
  type="button"
  onClick={handleLogout}
  className="absolute right-4 top-4 text-[11px] sm:text-xs text-text-main/70 underline-offset-2 hover:underline"
>
  ログアウト
</button>

        {/* 小さなラベル */}
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] text-text-accent mb-3 sm:mb-4">
          FREETIME
        </p>

        {/* 見出し：PC では少しだけ大きめ */}
        <h1 className="mb-3 sm:mb-4 text-[24px] sm:text-[30px] lg:text-[32px] leading-snug font-bold text-text-header">
          合間を、
          <br />
          <span className="text-[28px] sm:text-[34px] lg:text-[36px]">
            ちょっと良い時間に。
          </span>
        </h1>

        {/* 説明文 */}
        <p className="mb-8 sm:mb-10 text-[11px] sm:text-xs lg:text-[13px] leading-relaxed text-text-main/80">
          15 / 30 / 60分のすきま時間に、今の気分に合う「行動レシピ」を提案します。
        </p>

        {/* ボタンたち */}
        <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
          <Link href="/select" className="block">
            <div className="relative mx-auto flex max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] items-center justify-center gap-2.5 sm:gap-3 rounded-full bg-gradient-to-r from-primary to-primary-border px-10 sm:px-14 py-4 sm:py-5 text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-white shadow-[0_18px_36px_rgba(232,155,83,0.55)] transition-transform transition-shadow duration-200 hover:brightness-110 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(232,155,83,0.65)]">
              <span>今の気分からはじめる</span>
              <span className="text-xl sm:text-2xl" aria-hidden>
                📖
              </span>
            </div>
          </Link>

          <Link href="/history" className="block">
            <div className="relative mx-auto flex max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] items-center justify-center gap-2.5 sm:gap-3 rounded-full bg-gradient-to-r from-chip-bg to-primary-light px-10 sm:px-14 py-4 sm:py-5 text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-chip-text shadow-[0_18px_36px_rgba(245,225,199,0.7)] transition-transform transition-shadow duration-200 hover:brightness-110 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(245,225,199,0.85)]">
              <span>最近のレシピを見る</span>
              <span className="text-xl sm:text-2xl" aria-hidden>
                ☕️
              </span>
            </div>
          </Link>

          {/* <Link href="/select" className="block">
            <div className="relative mx-auto flex max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] items-center justify-center gap-2.5 sm:gap-3 rounded-full bg-primary-light px-10 sm:px-14 py-4 sm:py-5 text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-text-main shadow-[0_18px_36px_rgba(255,227,215,0.8)] transition-transform transition-shadow duration-200 hover:brightness-105 hover:translate-y-[1px] hover:shadow-[0_22px_42px_rgba(255,227,215,0.95)]">
              <span>条件をえらび直す</span>
              <span className="text-xl sm:text-2xl" aria-hidden>
                🛋️
              </span>
            </div>
          </Link> */}
        </div>

        {/* 下の説明 */}
        <p className="text-[10px] sm:text-[11px] leading-relaxed text-text-main/70">
          気分が乗らないときは、5分だけでもOK。
          <br />
          「ちょっとやってみる」を増やすための、小さな相棒アプリです。
        </p>
      </div>
    </main>
  );
}
