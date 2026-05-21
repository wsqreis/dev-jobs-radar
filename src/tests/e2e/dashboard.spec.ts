import { expect, test } from "@playwright/test";

test("renders the dashboard in demo mode", async ({ page }) => {
  await page.goto("/?mode=demo&preset=backend-br&pageSize=2&page=1&datePosted=24h");

  await expect(
    page.getByRole("heading", {
      name: "Dev Jobs Radar",
    }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "Vagas encontradas" })).toBeVisible();
  await expect(page.getByText("Desenvolvedor Backend Pleno")).toBeVisible();
  await expect(page.getByText("Página 1 · 2 resultado(s) nesta página")).toBeVisible();
  await expect(page.getByRole("button", { name: "Próxima" })).toBeVisible();
  await expect(page.locator("#datePosted")).toHaveValue("24h");

  await page.getByRole("button", { name: "Painel técnico" }).click();
  await expect(page.getByRole("heading", { name: "Payload da busca" })).toBeVisible();
});

test("changes query and location when a preset is selected", async ({ page }) => {
  await page.goto("/?mode=demo&preset=backend-br&pageSize=5&page=1");

  await page.getByRole("button", { name: "Portugal remoto" }).click();

  await expect(page).toHaveURL(/preset=portugal-remote/);
  await expect(page.locator("#location")).toHaveValue("Portugal");
  await expect(page.locator("#gl")).toHaveValue("pt");
  await expect(page.locator("#hl")).toHaveValue("pt-pt");
  await expect(page.locator("#q")).toHaveValue("software engineer remoto");
});

test("submits search with date filter and shows pending-friendly controls", async ({ page }) => {
  await page.goto("/?mode=demo&preset=backend-br&pageSize=5&page=1");

  await page.locator("#datePosted").selectOption("7d");
  await page.getByRole("button", { name: "Buscar vagas" }).click();

  await expect(page).toHaveURL(/datePosted=7d/);
  await expect(page.locator("#datePosted")).toHaveValue("7d");
});
