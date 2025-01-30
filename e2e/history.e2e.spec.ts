import { expect, test } from '@playwright/test';

test("Navigate to history", async ({ page }) => {
  await page.goto("http://localhost:5173/history");

  // Click the get started link.
  await page.getByRole("link", { name: "history" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("URL History")).toBeVisible();
});
