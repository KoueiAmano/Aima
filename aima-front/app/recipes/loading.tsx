// app/recipes/loading.tsx
import { LoadingCard } from "@/components/ui/LoadingCard";

export default function Loading() {
  return (
    <LoadingCard
      title="RECIPE"
      message="おすすめレシピを準備しています…"
    />
  );
}
