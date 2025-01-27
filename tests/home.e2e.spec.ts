import { expect, test } from "@playwright/test";

test.describe("HomePage - URL Shortener", () => {
  test("should shorten URL and display the ShortUrlCard", async ({ page }) => {
    await page.goto("ttp://localhost:5173");

    await expect(page).toHaveTitle(/URL Shortener Maker/i);
    await expect(page.locator("text=URL Shortener Maker")).toBeVisible();

    await page.fill('input[placeholder*="https://"]', "https://walbermelo.com");
    await page.fill(
      'input[placeholder*="Bitcoin price prediction"]',
      "Title description"
    );

    await page.click('button:has-text("Generate")');

    const shortUrlCard = page.locator("text=Shorter URL");
    await expect(shortUrlCard).toBeVisible();

    await page.click('button:has-text("Done")');
    await expect(shortUrlCard).not.toBeVisible();
  });
});
