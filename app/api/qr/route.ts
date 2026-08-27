import { NextResponse } from "next/server";

import { SITE, qrImageUrl } from "@/lib/site";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = Number(searchParams.get("size") ?? "800") || 800;
  const clamped = Math.min(1000, Math.max(200, size));
  const src = qrImageUrl(SITE.publicUrl, clamped);
  const res = await fetch(src, { next: { revalidate: 86400 } });
  if (!res.ok) {
    return new NextResponse("QR no disponible", { status: 502 });
  }
  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
