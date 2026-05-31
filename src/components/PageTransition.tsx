/**
 * PageTransition — GSAP grid-shutter overlay
 *
 * Odd rows sweep from the right, even rows from the left,
 * creating an alternating shutter wipe. The primary layer is
 * Gobiya pitch-black (#050505). A thinner accent layer in
 * orange (#F26522) follows at a slight delay for a branded flash.
 *
 * Usage (from App.tsx):
 *   import { navigateWithTransition } from './components/PageTransition';
 *   // call instead of setCurrentPath directly
 */

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './PageTransition.css';

// ── Tunable config ──────────────────────────────────────────
const ROWS = 5;   // alternating band count
const COLS = 14;  // column resolution per row
const DURATION = 0.55;
const STAGGER  = 0.022;
const EASE_IN  = 'power3.inOut';
const EASE_OUT = 'power4.out';
// ────────────────────────────────────────────────────────────

// Singleton handle — App.tsx imports and calls this
type TransitionFn = (onComplete: () => void) => void;
export let triggerLeave: TransitionFn  = (cb) => cb();
export let triggerEnter: TransitionFn = (cb) => cb();

/** Wraps any nav action with leave → swap → enter */
export function navigateWithTransition(swap: () => void): void {
  triggerLeave(() => {
    swap();
    // tiny rAF buffer so React renders the new page before we reveal it
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        triggerEnter(() => {});
      });
    });
  });
}

// ── Component ───────────────────────────────────────────────
const PageTransition: React.FC = () => {
  const primaryRef  = useRef<HTMLDivElement>(null);
  const accentRef   = useRef<HTMLDivElement>(null);
  const primaryBlocks = useRef<HTMLElement[]>([]);
  const accentBlocks  = useRef<HTMLElement[]>([]);

  // Build (or rebuild) both grid layers
  const buildGrid = () => {
    [
      { ref: primaryRef, store: primaryBlocks },
      { ref: accentRef,  store: accentBlocks  },
    ].forEach(({ ref, store }) => {
      const container = ref.current;
      if (!container) return;
      container.innerHTML = '';
      store.current = [];

      const bw = window.innerWidth  / COLS;
      const bh = window.innerHeight / ROWS;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const el = document.createElement('div');
          el.className = 'pt-block';
          el.style.width  = `${bw + 1}px`;
          el.style.height = `${bh + 1}px`;
          el.style.left   = `${col * bw}px`;
          el.style.top    = `${row * bh}px`;
          // even rows grow from left, odd from right — alternating shutter
          el.style.transformOrigin = row % 2 === 0 ? 'left center' : 'right center';
          container.appendChild(el);
          store.current.push(el);
        }
      }

      gsap.set(store.current, { scaleX: 0 });
    });
  };

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
  }, []);

  // ── Row helper ──
  const rowBlocks = (store: React.MutableRefObject<HTMLElement[]>, row: number) =>
    store.current.slice(row * COLS, row * COLS + COLS);

  // ── LEAVE: shutter closes — blocks scale 0 → 1 ──
  const animateIn = (onComplete: () => void) => {
    const tl = gsap.timeline({ onComplete });

    for (let row = 0; row < ROWS; row++) {
      const from = row % 2 === 0 ? 'start' : 'end';
      // primary black layer
      tl.to(
        rowBlocks(primaryBlocks, row),
        { scaleX: 1, duration: DURATION, ease: EASE_IN, stagger: { each: STAGGER, from } },
        '<'
      );
    }

    // accent orange flash — starts just before peak cover, lighter & quicker
    for (let row = 0; row < ROWS; row++) {
      const from = row % 2 === 0 ? 'start' : 'end';
      tl.to(
        rowBlocks(accentBlocks, row),
        { scaleX: 1, duration: DURATION * 0.55, ease: EASE_IN, stagger: { each: STAGGER * 0.6, from } },
        `-=${DURATION * 0.35}`
      );
    }

    return tl;
  };

  // ── ENTER: shutter opens — blocks scale 1 → 0 ──
  const animateOut = (onComplete: () => void) => {
    const tl = gsap.timeline({ onComplete });

    // accent collapses first
    for (let row = 0; row < ROWS; row++) {
      const from = row % 2 === 0 ? 'start' : 'end';
      tl.to(
        rowBlocks(accentBlocks, row),
        { scaleX: 0, duration: DURATION * 0.45, ease: EASE_OUT, stagger: { each: STAGGER * 0.5, from } },
        '<'
      );
    }

    // then primary black reveals new page
    for (let row = 0; row < ROWS; row++) {
      const from = row % 2 === 0 ? 'start' : 'end';
      tl.to(
        rowBlocks(primaryBlocks, row),
        { scaleX: 0, duration: DURATION, ease: EASE_OUT, stagger: { each: STAGGER, from } },
        `<+=${DURATION * 0.15}`
      );
    }

    return tl;
  };

  // Wire singleton exports after mount
  useEffect(() => {
    triggerLeave = animateIn;
    triggerEnter = animateOut;
  });

  return (
    <>
      {/* Layer 1 — pitch black primary shutter */}
      <div ref={primaryRef}  className="pt-overlay pt-overlay--primary"  aria-hidden="true" />
      {/* Layer 2 — orange accent flash */}
      <div ref={accentRef}   className="pt-overlay pt-overlay--accent"   aria-hidden="true" />
    </>
  );
};

export default PageTransition;
