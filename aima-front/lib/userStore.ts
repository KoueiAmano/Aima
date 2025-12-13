// lib/userStore.ts
const KEY = "aima_user_id";

export function setUserId(id: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(id));
}

export function getUserId(): number | null {
  if (typeof window === "undefined") return null;

  const v = localStorage.getItem(KEY);
  if (!v) return null;

  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function clearUserId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
