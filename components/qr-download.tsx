"use client";

import { useState } from "react";

type Props = {
  qrSrc: string;
  logoSrc: string;
  title: string;
  subtitle: string;
  filename: string;
  background: string;
  ink: string;
  roundLogo?: boolean;
  className?: string;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function composePng(props: Omit<Props, "className" | "filename">) {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  ctx.fillStyle = props.background;
  ctx.fillRect(0, 0, width, height);

  const [logo, qr] = await Promise.all([
    loadImage(props.logoSrc),
    loadImage(props.qrSrc),
  ]);

  const logoSize = 280;
  const logoY = 96;
  if (props.roundLogo) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logo, (width - logoSize) / 2, logoY, logoSize, logoSize);
    ctx.restore();
  } else {
    const ratio = logo.width / logo.height || 1;
    const w = logoSize;
    const h = w / ratio;
    ctx.drawImage(logo, (width - w) / 2, logoY, w, h);
  }

  const qrSize = 560;
  const qrX = (width - qrSize) / 2;
  const qrY = logoY + logoSize + 56;
  ctx.fillStyle = props.background;
  roundRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 32);
  ctx.fill();
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  ctx.fillStyle = props.ink;
  ctx.textAlign = "center";
  ctx.font = "italic 52px Georgia, serif";
  ctx.fillText(props.title, width / 2, qrY + qrSize + 88);
  ctx.font = "500 22px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(props.subtitle.toUpperCase(), width / 2, qrY + qrSize + 132);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("png");
  return blob;
}

export function QrDownload(props: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function onClick() {
    setBusy(true);
    setError(false);
    try {
      const blob = await composePng(props);
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = props.filename;
      a.click();
      URL.revokeObjectURL(href);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className={props.className}
      >
        {busy ? "Preparando…" : "Descargar QR"}
      </button>
      {error ? (
        <p className="mt-2 text-center text-xs">
          No se pudo armar el archivo. Recarga e inténtalo de nuevo.
        </p>
      ) : null}
    </div>
  );
}
