// lib/userStore.ts
const KEY = "aima_user_id";

export function setUserId(id: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(id));
}

export function getUserId(): number | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v ? Number(v) : null;
}

export function clearUserId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
