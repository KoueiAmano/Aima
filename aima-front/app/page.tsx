// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    // 背景：中心からふわっと広がる光のようなグラデーション
    <main className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff5ea] via-[#fff9f2] to-[#fffbf6]">
      <div className="relative w-full max-w-[400px] text-center py-10">
        
        {/* ロゴ：文字間隔を広げて抜け感を出す */}
        <p className="text-[12px] font-bold tracking-[0.3em] text-[#c49a6c] mb-6 opacity-90">
          FREETIME
        </p>

        {/* メインタイトル：濃いブラウンで引き締めつつ、やわらかい印象に */}
        <h1 className="mb-6 text-[32px] leading-tight font-bold text-[#a66e4e]">
          余白時間を、
          <br />
          <span className="text-[36px]">ちょっと良い時間に。</span>
        </h1>

        {/* サブテキスト */}
        <p className="mb-14 text-[13px] leading-7 text-[#9d7d65] font-medium">
          15 / 30 / 60分のすきま時間に、<br/>
          今の気分に合う「行動レシピ」を提案します。
        </p>

        {/* --- ボタンエリア --- */}
        <div className="space-y-8 mb-16 px-2">
          
          {/* 1. 今の気分からはじめる (オレンジ) */}
          <Link href="/select" className="block group relative">
            <div className="relative z-10 mx-auto w-full">
              {/* ボタン本体 */}
              <div className="
                relative flex items-center justify-center 
                rounded-full py-5 px-4
                bg-gradient-to-r from-[#e89b53] to-[#e08244] 
                text-white font-bold tracking-wide text-[17px]
                /* 影の設定：下に落ちる影(オレンジ色) + 上部の白い反射(inset)でぷっくり感を出す */
                shadow-[0_15px_30px_-5px_rgba(232,155,83,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)]
                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_-5px_rgba(232,155,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)]
              ">
                今の気分からはじめる
              </div>
              
            
            </div>
          </Link>

          {/* 2. 最近のレシピを見る (イエロー) */}
          <Link href="/history" className="block group relative">
            <div className="relative z-10 mx-auto w-full">
              <div className="
                relative flex items-center justify-center 
                rounded-full py-5 px-4
                bg-gradient-to-r from-[#eac563] to-[#e2b14f] 
                text-white font-bold tracking-wide text-[17px]
                shadow-[0_15px_30px_-5px_rgba(226,177,79,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)]
                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_-5px_rgba(226,177,79,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)]
              ">
                最近のレシピを見る
              </div>

            </div>
          </Link>
         
        </div>

        {/* フッターテキスト */}
        <p className="text-[10px] leading-relaxed text-[#b09680] opacity-80">
          気分が乗らないときは、5分だけでもOK。<br />
          「ちょっとやってみる」を増やすための、小さな相棒アプリです。
        </p>
      </div>
    </main>
  );
}