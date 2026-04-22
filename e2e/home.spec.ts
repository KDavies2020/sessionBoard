import { test, expect } from "@playwright/test";

test("home page renders correctly", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "SessionBoard" })).toBeVisible();
});
