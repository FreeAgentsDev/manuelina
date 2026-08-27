"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

import { GALLERY } from "@/lib/site";

const SPEED = 36;
const SLIDE_RATIO = 0.78;
const GAP = 12;

export function Gallery() {
  const n = GALLERY.length;
  const slides = [...GALLERY, ...GALLERY];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthRef = useRef(0);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const originRef = useRef(0);
  const movedRef = useRef(false);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(
    null,
  );

  function metrics() {
    const width = widthRef.current;
    const slideW = width * SLIDE_RATIO;
    const stride = slideW + GAP;
    const loopW = n * stride;
    return { width, slideW, stride, loopW };
  }

  function wrap(value: number, loopW: number) {
    if (loopW <= 0) return value;
    let v = value;
    while (v <= -loopW) v += loopW;
    while (v > 0) v -= loopW;
    return v;
  }

  function paint() {
    const track = trackRef.current;
    if (!track) return;
    const { slideW } = metrics();
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    cardRefs.current.forEach((card) => {
      if (!card || !slideW) return;
      card.style.width = `${slideW}px`;
    });
  }

  function centerOn(i: number) {
    const { width, slideW, stride, loopW } = metrics();
    if (!width) return;
    const from = offsetRef.current;
    const pad = (width - slideW) / 2;
    const raw = pad - i * stride;
    let delta = raw - from;
    while (delta > loopW / 2) delta -= loopW;
    while (delta < -loopW / 2) delta += loopW;
    tweenRef.current = { from, to: from + delta, start: performance.now() };
  }

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => {
      widthRef.current = el.clientWidth;
      const { width, slideW } = metrics();
      if (offsetRef.current === 0) {
        offsetRef.current = (width - slideW) / 2;
      }
      paint();
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const { loopW } = metrics();
      const tween = tweenRef.current;
      if (tween) {
        const t = Math.min(1, (now - tween.start) / 700);
        const ease = 1 - (1 - t) ** 3;
        offsetRef.current = tween.from + (tween.to - tween.from) * ease;
        if (t >= 1) tweenRef.current = null;
      } else if (!draggingRef.current) {
        offsetRef.current -= (SPEED * dt) / 1000;
      }
      offsetRef.current = wrap(offsetRef.current, loopW);
      paint();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    movedRef.current = false;
    draggingRef.current = false;
    startXRef.current = e.clientX;
    originRef.current = offsetRef.current;
  }

  function onPointerMove(e: React.PointerEvent) {
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) < 8) return;
    if (!draggingRef.current) {
      draggingRef.current = true;
      movedRef.current = true;
      tweenRef.current = null;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    offsetRef.current = originRef.current + delta;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!movedRef.current) {
      const node = (e.target as HTMLElement | null)?.closest("[data-slide]");
      if (node) centerOn(Number(node.getAttribute("data-slide")));
    }
    draggingRef.current = false;
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
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex items-center" style={{ gap: GAP }}>
          {slides.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              data-slide={i}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
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
