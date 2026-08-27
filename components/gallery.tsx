"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

import { GALLERY } from "@/lib/site";

const SPEED = 36;
const SLIDE_RATIO = 0.78;
const GAP = 12;
const DRAG = 8;

export function Gallery() {
  const n = GALLERY.length;
  const slides = [...GALLERY, ...GALLERY];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const offsetRef = useRef(0);
  const pressRef = useRef<{
    id: number;
    x: number;
    origin: number;
    dragged: boolean;
  } | null>(null);
  const tweenRef = useRef<{ from: number; to: number; t0: number } | null>(
    null,
  );

  function stride() {
    return widthRef.current * SLIDE_RATIO + GAP;
  }

  function loopW() {
    return n * stride();
  }

  function wrap(value: number) {
    const w = loopW();
    if (w <= 0) return value;
    let v = value % w;
    if (v > 0) v -= w;
    return v;
  }

  function paint() {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
  }

  function centerOn(i: number) {
    const width = widthRef.current;
    if (!width) return;
    const slideW = width * SLIDE_RATIO;
    const pad = (width - slideW) / 2;
    const from = offsetRef.current;
    let delta = pad - i * stride() - from;
    const w = loopW();
    while (delta > w / 2) delta -= w;
    while (delta < -w / 2) delta += w;
    tweenRef.current = { from, to: from + delta, t0: performance.now() };
  }

  useLayoutEffect(() => {
    const el = viewportRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const layout = () => {
      widthRef.current = el.clientWidth;
      const slideW = widthRef.current * SLIDE_RATIO;
      for (const card of track.children) {
        (card as HTMLElement).style.width = `${slideW}px`;
      }
      if (offsetRef.current === 0) {
        offsetRef.current = (widthRef.current - slideW) / 2;
      }
      paint();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const tween = tweenRef.current;
      if (tween) {
        const t = Math.min(1, (now - tween.t0) / 700);
        offsetRef.current =
          tween.from + (tween.to - tween.from) * (1 - (1 - t) ** 3);
        if (t >= 1) tweenRef.current = null;
      } else if (!pressRef.current?.dragged) {
        offsetRef.current -= (SPEED * dt) / 1000;
      }
      offsetRef.current = wrap(offsetRef.current);
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pressRef.current = {
      id: e.pointerId,
      x: e.clientX,
      origin: offsetRef.current,
      dragged: false,
    };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const press = pressRef.current;
    if (!press || press.id !== e.pointerId) return;
    const dx = e.clientX - press.x;
    if (!press.dragged) {
      if (Math.abs(dx) < DRAG) return;
      press.dragged = true;
      tweenRef.current = null;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    offsetRef.current = press.origin + dx;
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const press = pressRef.current;
    if (!press || press.id !== e.pointerId) return;
    if (!press.dragged) {
      const slide = (e.target as HTMLElement).closest("[data-slide]");
      if (slide) centerOn(Number(slide.getAttribute("data-slide")));
    }
    pressRef.current = null;
  }

  return (
    <section id="galeria" className="mt-12">
      <h2 className="text-center text-[11px] font-medium tracking-[0.22em] text-mist uppercase">
        Galería
      </h2>
      <div
        ref={viewportRef}
        className="mt-4 cursor-grab overflow-hidden rounded-2xl touch-pan-y active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP }}
        >
          {slides.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              data-slide={i}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-2xl"
            >
              <Image
                src={photo.src}
                alt="Manuelina Pasta Fresca"
                width={photo.width}
                height={photo.height}
                priority={i < 3}
                draggable={false}
                className="aspect-3/4 w-full select-none object-cover"
                sizes="(max-width: 512px) 78vw, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
