import { test, expect } from "./fixtures";

/**
 * Slides surface E2E — verifies the chat route is reachable and the
 * slides typography + canvas styles are present in the built bundle.
 */

test("/chat route is reachable", async ({ page }) => {
  const resp = await page.goto("/chat");
  expect(resp?.status() ?? 0).toBeLessThan(500);
});

test("slide-content tokens shipped to client", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("domcontentloaded");
  const sizes = await page.evaluate(() => {
    const c = document.createElement("div");
    c.className = "slide-content";
    document.body.appendChild(c);
    const tags = [
      ["slide-title-lg", "h1"],
      ["slide-title", "h2"],
      ["slide-subtitle", "p"],
      ["slide-body", "p"],
      ["slide-caption", "p"],
    ] as const;
    const out: Record<string, number> = {};
    for (const [cls, tag] of tags) {
      const el = document.createElement(tag);
      el.className = cls;
      c.appendChild(el);
      out[cls] = parseFloat(getComputedStyle(el).fontSize);
    }
    document.body.removeChild(c);
    return out;
  });
  // Hard typography expectations
  expect(sizes["slide-title-lg"]).toBeGreaterThanOrEqual(80);
  expect(sizes["slide-title"]).toBeGreaterThanOrEqual(60);
  expect(sizes["slide-body"]).toBeGreaterThanOrEqual(24);
});

test("density modifier scales body type", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("domcontentloaded");
  const result = await page.evaluate(() => {
    const make = (density: string) => {
      const c = document.createElement("div");
      c.className = "slide-content";
      c.dataset.density = density;
      const p = document.createElement("p");
      p.className = "slide-body";
      c.appendChild(p);
      document.body.appendChild(c);
      const size = parseFloat(getComputedStyle(p).fontSize);
      document.body.removeChild(c);
      return size;
    };
    return { airy: make("airy"), balanced: make("balanced"), dense: make("dense") };
  });
  expect(result.airy).toBeGreaterThan(result.balanced);
  expect(result.balanced).toBeGreaterThan(result.dense);
});
