import { expect, test } from "@playwright/test";

test.describe("HomePage - URL Shortener", () => {
  test("should display the ShortUrlCard", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page.locator("text=URL Shortener Maker")).toBeVisible();

    // Fill out the form
    await page.fill('input[placeholder*="https://"]', "https://walbermelo.com");
    await page.fill(
      'input[placeholder*="Bitcoin price prediction"]',
      "wEb title description"
    );

    await page.click('button:has-text("Generate")');

    const shortUrlCard = page.locator('[data-testid="short-url-title"]');

    await expect(shortUrlCard).toBeVisible();

    await page.click('button:has-text("Done")');
    await expect(shortUrlCard).toBeHidden();
  });
});
