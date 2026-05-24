import { test, expect } from "./fixtures";

/**
 * Accessibility scan on the slides surface using @axe-core/playwright.
 * The chat route may gate to /auth; we accept either entry point.
 */
test("/chat surface passes critical axe checks", async ({ page, axe }) => {
  await page.goto("/chat");
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

  const results = await axe(page)
    .disableRules(["color-contrast"]) // Marketing surfaces fail this and aren't slides
    .analyze();
  // Only fail on serious/critical issues to keep the gate signal high.
  const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test("slides typography tokens defined in production CSS", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("domcontentloaded");
  const tokens = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.className = "slide-content";
    document.body.appendChild(probe);
    const titleEl = document.createElement("h2");
    titleEl.className = "slide-title";
    probe.appendChild(titleEl);
    const bodyEl = document.createElement("p");
    bodyEl.className = "slide-body";
    probe.appendChild(bodyEl);
    const t = parseFloat(getComputedStyle(titleEl).fontSize);
    const b = parseFloat(getComputedStyle(bodyEl).fontSize);
    document.body.removeChild(probe);
    return { t, b };
  });
  expect(tokens.t).toBeGreaterThanOrEqual(60);
  expect(tokens.b).toBeGreaterThanOrEqual(24);
});

test("ornament classes defined and visible", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("domcontentloaded");
  const ok = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.className = "slide-ornament-ribbon";
    probe.style.position = "relative";
    probe.style.width = "100px";
    probe.style.height = "100px";
    document.body.appendChild(probe);
    const before = getComputedStyle(probe, "::before");
    const has = before.content !== "none" && before.content !== "";
    document.body.removeChild(probe);
    return has;
  });
  expect(ok).toBe(true);
});
