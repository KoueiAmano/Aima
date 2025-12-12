import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL!; // 例: http://localhost:3001

export async function POST(req: Request) {
  const body = await req.text();

  const res = await fetch(`${BACKEND}/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}
