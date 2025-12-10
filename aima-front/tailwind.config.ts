// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 先ほどのホーム画面の色をベースに定義
        brand: {
          bg: "#fff9f2",       // 全体の背景（クリーム色）
          text: "#a66e4e",     // メインテキスト（濃いブラウン）
          sub: "#b09680",      // サブテキスト（薄いブラウン）
          orange: "#e89b53",   // アクセント（オレンジ）
          orangeLight: "#fcebd9", // 薄いオレンジ（選択時の背景など）
        },
      },
    },
  },
  plugins: [],
};
export default config;