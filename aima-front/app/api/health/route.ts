// app/api/health/route.ts
import { NextResponse } from "next/server";

const BACKEND_BASE =
  process.env.BACKEND_API_BASE_URL ?? "http://localhost:3001";

export async function GET() {
  try {
    const backendRes = await fetch(`${BACKEND_BASE}/api/v1/health`, {
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const text = await backendRes.text().catch(() => "");
      console.error("Backend health error", backendRes.status, text);
      return NextResponse.json(
        {
          status: "error",
          time: new Date().toISOString(),
          backendStatus: backendRes.status,
          message: text,
        },
        { status: 500 }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Health proxy error:", e);
    return NextResponse.json(
      {
        status: "error",
        time: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
