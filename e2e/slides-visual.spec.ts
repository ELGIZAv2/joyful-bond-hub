/**
 * Visual regression for slide layouts using pixelmatch + pngjs.
 * Renders an in-page fixture deck and compares each slide against
 * a baseline PNG (e2e/__visual__/slides-baseline/<name>.png).
 *
 * Threshold: 0.1% pixel difference. ANY visual drift is a failure.
 *
 * To (re)generate baselines, delete the corresponding PNG and
 * rerun this spec — missing baselines are auto-written on first run.
 */
import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import path from "node:path";

const BASELINE_DIR = path.join(process.cwd(), "e2e", "__visual__", "slides-baseline");
const DIFF_DIR = path.join(process.cwd(), "e2e", "__visual__", "slides-diff");
const THRESHOLD = 0.1; // percent

fs.mkdirSync(BASELINE_DIR, { recursive: true });
fs.mkdirSync(DIFF_DIR, { recursive: true });

type Fixture = { name: string; html: string };

// Inline standalone HTML fixtures so we can render and screenshot deterministically
// without hitting auth or the edge function. These mirror what SlideRender produces.
function slideFixture(opts: {
  bg: string; fg: string; accent: string;
  title: string; body?: string; ornament?: string; align?: "left" | "center" | "right";
}): string {
  const orn = opts.ornament || "";
  const align = opts.align === "center" ? "items-center text-center" :
                opts.align === "right" ? "items-end text-right" : "items-start text-left";
  return `<!doctype html><html><head><link rel="stylesheet" href="/src/index.css"></head>
  <body style="margin:0">
    <div style="width:1280px;height:720px;position:relative;background:${opts.bg}">
      <div class="slide-content ${orn}" style="background:${opts.bg};color:${opts.fg};--slide-accent-color:${opts.accent};transform:scale(${1280/1920});transform-origin:top left;">
        <div class="${align} px-28 py-24 flex flex-col justify-center" style="position:relative;z-index:10;width:100%;height:100%;">
          <h2 class="slide-title" style="margin-bottom:24px">${opts.title}</h2>
          ${opts.body ? `<p class="slide-body" style="opacity:.9;max-width:1100px">${opts.body}</p>` : ""}
        </div>
      </div>
    </div>
  </body></html>`;
}

const FIXTURES: Fixture[] = [
  { name: "plain-light", html: slideFixture({ bg: "#ffffff", fg: "#111", accent: "#6366f1", title: "Plain Light", body: "Body copy at 32px." }) },
  { name: "plain-dark", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#e6f578", title: "Plain Dark", body: "Body copy at 32px." }) },
  { name: "ornament-ribbon", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#f43f5e", title: "Ribbon Ornament", ornament: "slide-ornament-ribbon" }) },
  { name: "ornament-dots", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#14b8a6", title: "Dots Ornament", ornament: "slide-ornament-dots" }) },
  { name: "ornament-grid", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#06b6d4", title: "Grid Ornament", ornament: "slide-ornament-grid" }) },
  { name: "ornament-corner", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#d4af37", title: "Corner Ornament", ornament: "slide-ornament-corner" }) },
  { name: "ornament-side-bar", html: slideFixture({ bg: "#ffffff", fg: "#111", accent: "#8b5cf6", title: "Side Bar", ornament: "slide-ornament-side-bar", align: "center" }) },
  { name: "ornament-arc", html: slideFixture({ bg: "#0a0a0a", fg: "#fafafa", accent: "#f97316", title: "Arc Ornament", ornament: "slide-ornament-arc", align: "right" }) },
];

for (const fx of FIXTURES) {
  test(`visual: ${fx.name}`, async ({ page }) => {
    // Navigate to app so /src/index.css resolves through Vite, then replace DOM.
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.evaluate((html) => { document.documentElement.innerHTML = html; }, fx.html.replace(/^[\s\S]*<body[^>]*>/, "").replace(/<\/body>[\s\S]*$/, ""));
    // Allow CSS application
    await page.waitForTimeout(200);

    const screenshot = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1280, height: 720 } });
    const baselinePath = path.join(BASELINE_DIR, `${fx.name}.png`);

    if (!fs.existsSync(baselinePath)) {
      fs.writeFileSync(baselinePath, screenshot);
      console.log(`[visual] baseline written: ${baselinePath}`);
      return;
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(screenshot);
    if (baseline.width !== current.width || baseline.height !== current.height) {
      throw new Error(`Dimension mismatch for ${fx.name}: baseline=${baseline.width}x${baseline.height}, current=${current.width}x${current.height}`);
    }
    const { width, height } = baseline;
    const diff = new PNG({ width, height });
    const diffPixels = pixelmatch(baseline.data, current.data, diff.data, width, height, { threshold: 0.1 });
    const diffPercent = (diffPixels / (width * height)) * 100;

    if (diffPercent > THRESHOLD) {
      const diffPath = path.join(DIFF_DIR, `${fx.name}.png`);
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      throw new Error(`Visual drift on ${fx.name}: ${diffPercent.toFixed(3)}% (threshold ${THRESHOLD}%). Diff at ${diffPath}`);
    }
    expect(diffPercent).toBeLessThanOrEqual(THRESHOLD);
  });
}
