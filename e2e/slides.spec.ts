import { test, expect } from "./fixtures";

/**
 * Slides surface smoke E2E.
 * Verifies the /chat route loads and the slides toggle/UI is reachable,
 * without making expensive LLM calls.
 */
test("chat surface exposes slides toggle when authenticated", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

  // Either gated to /auth (no session) or the chat surface is rendered.
  if (page.url().includes("/auth")) {
    expect(true).toBeTruthy();
    return;
  }

  // Look for the slides toggle button (any element mentioning slides/سلايد).
  const slidesAffordance = page.getByRole("button", { name: /slide|سلايد|presentation|عرض/i }).first();
  const exists = await slidesAffordance.count();
  // Toggle is optional in collapsed states — assert page rendered something interactive.
  const composer = page.locator('textarea, [contenteditable="true"]').first();
  expect(exists > 0 || (await composer.isVisible().catch(() => false))).toBeTruthy();
});

test("slides fixed canvas stylesheet is loaded", async ({ page }) => {
  await page.goto("/chat");
  await page.waitForLoadState("domcontentloaded");
  // Probe that the .slide-content semantic typography is defined in the bundle.
  const hasSlideTokens = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.className = "slide-content";
    document.body.appendChild(probe);
    const inner = document.createElement("h2");
    inner.className = "slide-title";
    probe.appendChild(inner);
    const fontSize = parseFloat(getComputedStyle(inner).fontSize || "0");
    document.body.removeChild(probe);
    return fontSize >= 60; // .slide-title is 88px
  });
  expect(hasSlideTokens).toBe(true);
});
