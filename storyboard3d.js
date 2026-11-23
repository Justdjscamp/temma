/**
 * ТЭММА — 480-FRAME GPU-ACCELERATED IMAGEBITMAP CINEMA ENGINE
 * - Pre-decodes WebP frames into GPU ImageBitmaps for ~0.2ms drawImage (zero slow-scroll lag)
 * - Crisp single-frame rendering across all 480 native frames (zero muddy ghosting)
 * - Smart Portrait Mobile Framing: shows ~86% horizontal width with soft top/bottom obsidian fade
 *   instead of brutally cropping 75% of the 16:9 3D scene off-screen.
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 480;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  class CinemaSequenceEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      this.totalFrames = TOTAL_FRAMES;
      this.bitmaps = new Array(TOTAL_FRAMES).fill(null);
      this.loading = new Uint8Array(TOTAL_FRAMES);

      this.currentFrame = 0;
      this.targetFrame = 0;
      this.lastDrawnIdx = -1;
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.isPortrait = false;

      this.resize();
      this.bindEvents();
      this.loadProgressive();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.isPortrait = this.width < this.height;
      // Keep desktop at native 1x for effortless 60/120fps; mobile up to 1.5x for crisp retina
      this.dpr = this.isPortrait ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.lastDrawnIdx = -1;
    }

    loadFrame(index) {
      if (index < 0 || index >= TOTAL_FRAMES || this.loading[index]) return;
      this.loading[index] = 1;
      const url = `frames/frame_${String(index + 1).padStart(3, '0')}.webp`;
      const canFetch = window.location.protocol !== 'file:' && typeof createImageBitmap === 'function';

      const loadViaImage = () => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          const finish = () => {
            this.bitmaps[index] = img;
            if (index === 0 || Math.abs(index - Math.round(this.currentFrame)) <= 3) {
              this.lastDrawnIdx = -1;
            }
          };
          if (typeof img.decode === 'function') {
            img.decode().then(finish).catch(finish);
          } else {
            finish();
          }
        };
        img.src = url;
      };

      if (canFetch) {
        fetch(url)
          .then((r) => (r.ok ? r.blob() : null))
          .then((blob) => (blob ? createImageBitmap(blob) : null))
          .then((bmp) => {
            if (!bmp) return loadViaImage();
            this.bitmaps[index] = bmp;
            if (index === 0 || Math.abs(index - Math.round(this.currentFrame)) <= 3) {
              this.lastDrawnIdx = -1;
            }
          })
          .catch(loadViaImage);
      } else {
        loadViaImage();
      }
    }

    loadProgressive() {
      // Pass 1: Immediate skeleton (frame 0 + every 10th frame)
      this.loadFrame(0);
      for (let i = 0; i < TOTAL_FRAMES; i += 10) this.loadFrame(i);

      // Pass 2: Every 3rd frame
      setTimeout(() => {
        for (let i = 0; i < TOTAL_FRAMES; i += 3) this.loadFrame(i);
      }, 220);

      // Pass 3: Remaining frames in small idle chunks so scrolling stays 100% responsive
      let cursor = 0;
      const pump = () => {
        const end = Math.min(TOTAL_FRAMES, cursor + 24);
        for (; cursor < end; cursor++) {
          if (!this.loading[cursor]) this.loadFrame(cursor);
        }
        if (cursor < TOTAL_FRAMES) {
          setTimeout(pump, 90);
        }
      };
      setTimeout(pump, 550);
    }

    findNearest(idx) {
      if (this.bitmaps[idx]) return this.bitmaps[idx];
      for (let d = 1; d < 32; d++) {
        if (idx - d >= 0 && this.bitmaps[idx - d]) return this.bitmaps[idx - d];
        if (idx + d < TOTAL_FRAMES && this.bitmaps[idx + d]) return this.bitmaps[idx + d];
      }
      return null;
    }

    drawFrame(idx) {
      const bmp = this.findNearest(idx);
      if (!bmp) return;

      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const iw = bmp.width || bmp.naturalWidth;
      const ih = bmp.height || bmp.naturalHeight;

      ctx.save();
      ctx.scale(this.dpr, this.dpr);
      ctx.fillStyle = '#070d12';
      ctx.fillRect(0, 0, w, h);

      if (this.isPortrait) {
        // Smart Mobile Portrait Framing: preserve ~86% horizontal scene width (no brutal 75% crop!)
        const scale = (w / iw) * 1.16;
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (w - dw) * 0.5;
        const dy = Math.max(54, (h * 0.42) - dh * 0.5);

        ctx.drawImage(bmp, dx, dy, dw, dh);

        // Seamless obsidian fade at top & bottom of the portrait video band (zero hard edges!)
        const fadeH = Math.min(72, dh * 0.28);
        const topGrad = ctx.createLinearGradient(0, dy - 2, 0, dy + fadeH);
        topGrad.addColorStop(0, '#070d12');
        topGrad.addColorStop(1, 'rgba(7, 13, 18, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, dy - 2, w, fadeH + 4);

        const botGrad = ctx.createLinearGradient(0, dy + dh - fadeH, 0, dy + dh + 2);
        botGrad.addColorStop(0, 'rgba(7, 13, 18, 0)');
        botGrad.addColorStop(1, '#070d12');
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, dy + dh - fadeH, w, fadeH + 4);
      } else {
        // Desktop Full-Bleed Cover with subtle cursor parallax
        const scale = Math.max(w / iw, h / ih) * 1.03;
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (w - dw) * 0.5 - this.pointer.x * 12;
        const dy = (h - dh) * 0.5 + this.pointer.y * 8;
        ctx.drawImage(bmp, dx, dy, dw, dh);
      }

      ctx.restore();
    }

    setTargetFrame(frameFloat) {
      this.targetFrame = clamp(frameFloat, 0, this.totalFrames - 1);
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        this.drawFrame(Math.round(this.currentFrame));
      });

      window.addEventListener(
        'pointermove',
        (e) => {
          if (this.isPortrait) return;
          this.pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
          this.pointer.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true }
      );
    }

    startLoop(onProgress) {
      let lastPx = 0;
      let lastPy = 0;

      const tick = () => {
        requestAnimationFrame(tick);

        // Crisp, responsive 60fps tracking without double-lag rubber-banding
        this.currentFrame = lerp(this.currentFrame, this.targetFrame, 0.16);
        this.pointer.x = lerp(this.pointer.x, this.pointer.targetX, 0.08);
        this.pointer.y = lerp(this.pointer.y, this.pointer.targetY, 0.08);

        const frameIdx = clamp(Math.round(this.currentFrame), 0, this.totalFrames - 1);
        const ptrMoved = !this.isPortrait && (Math.abs(this.pointer.x - lastPx) + Math.abs(this.pointer.y - lastPy) > 0.002);

        if (frameIdx !== this.lastDrawnIdx || ptrMoved) {
          this.drawFrame(frameIdx);
          this.lastDrawnIdx = frameIdx;
          lastPx = this.pointer.x;
          lastPy = this.pointer.y;
        }

        if (typeof onProgress === 'function') {
          onProgress(this.currentFrame / (this.totalFrames - 1));
        }
      };

      requestAnimationFrame(tick);
    }
  }

  window.CinemaSequenceEngine = CinemaSequenceEngine;
})();
