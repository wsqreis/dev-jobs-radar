import { expect, test } from "@playwright/test";

test("renders the dashboard in demo mode", async ({ page }) => {
  await page.goto("/?mode=demo&preset=backend-br");

  await expect(
    page.getByRole("heading", {
      name: "Descubra vagas de tecnologia com foco em Brasil, Portugal e trabalho remoto.",
    }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "Vagas encontradas" })).toBeVisible();
  await expect(page.getByText("Desenvolvedor Backend Pleno")).toBeVisible();
  await expect(page.getByText("Developer Inspector", { exact: true })).toBeVisible();
});
