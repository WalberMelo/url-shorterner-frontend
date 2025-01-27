import { expect, test } from '@playwright/test';

test("Input long url", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("textbox").fill("https://www.walbermelo.com/");
});
