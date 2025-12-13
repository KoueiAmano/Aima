// components/ui/LoadingCard.tsx
export function LoadingCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-3xl bg-card-bg px-6 py-8 text-center">
      <p className="tracking-[0.25em] text-text-accent text-xs">{title}</p>
      <p className="mt-2 text-sm text-text-main/80">{message}</p>
    </div>
  );
}
