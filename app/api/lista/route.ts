import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

type Entry = {
  name: string;
  whatsapp: string;
  createdAt: string;
};

const FILE = process.env.VERCEL
  ? path.join("/tmp", "manuelina-lista.json")
  : path.join(process.cwd(), ".data", "lista.json");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Datos inválidos." }, { status: 400 });
  }

  const b = body as { name?: string; whatsapp?: string };
  const name = String(b.name ?? "").trim();
  const whatsapp = String(b.whatsapp ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Ingresa tu nombre." }, { status: 400 });
  }
  if (!/^[\d+\s()-]{7,20}$/.test(whatsapp)) {
    return NextResponse.json({ ok: false, error: "Ingresa un WhatsApp válido." }, { status: 400 });
  }

  const entry: Entry = {
    name,
    whatsapp,
    createdAt: new Date().toISOString(),
  };

  await mkdir(path.dirname(FILE), { recursive: true });
  let current: Entry[] = [];
  try {
    current = JSON.parse(await readFile(FILE, "utf8")) as Entry[];
  } catch {
    current = [];
  }
  current.unshift(entry);
  await writeFile(FILE, JSON.stringify(current, null, 2));

  return NextResponse.json({ ok: true });
}
