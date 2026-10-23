import { test, expect } from "@playwright/test";
test("daily itinerary and navigation are complete", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "去湖蓝的地方",
  );
  for (const [i, title] of [
    "你好，基督城",
    "驶向蒂卡波的蓝",
    "湖光之间，抵达皇后镇",
    "把快乐留在皇后镇",
    "带着湖蓝，回家",
  ].entries()) {
    await page.getByRole("tab").nth(i).click();
    await expect(
      page.getByRole("tabpanel").getByRole("heading", { level: 3 }),
    ).toHaveText(title);
    await expect(page.getByRole("tab").nth(i)).toHaveAttribute(
      "aria-selected",
      "true",
    );
  }
  await expect(page.getByRole("tabpanel")).toContainText("17:35");
  await expect(page.locator(".map-open")).toHaveAttribute(
    "href",
    /google.com\/maps\/dir/,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("dual currency accounting, split, persistence, delete and export", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("同行人数").selectOption("2");
  await page.getByLabel("人民币参考汇率").fill("4");
  await page.getByLabel("支出名称").fill("测试午餐");
  await page.getByLabel("支出金额").fill("100");
  await page.getByRole("button", { name: "记一笔支出" }).click();
  await expect(page.locator(".total-money")).toContainText("4,935.00");
  await expect(page.locator(".per-person strong")).toHaveText("¥ 2,467.50");
  await page.getByLabel("支出名称").fill("人民币门票");
  await page.getByLabel("支出金额").fill("200");
  await page.getByLabel("支出币种").selectOption("CNY");
  await page.getByRole("button", { name: "记一笔支出" }).click();
  await expect(page.locator(".total-money")).toContainText("5,135.00");
  await page.reload();
  await expect(page.locator(".total-money")).toContainText("5,135.00");
  await expect(page.getByLabel("同行人数")).toHaveValue("2");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "导出", exact: true }).click();
  expect((await download).suggestedFilename()).toBe("南岛旅行预算.csv");
  await page
    .getByRole("button", { name: "删除 测试午餐", exact: true })
    .click();
  await expect(page.locator(".total-money")).toContainText("4,735.00");
});
test("checklist persists and page has no runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  const box = page.getByRole("checkbox").first();
  await box.check();
  await page.reload();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await expect(page.locator(".packing-progress")).toContainText("1");
  await page.getByRole("checkbox").first().uncheck();
  await expect(page.locator(".packing-progress")).toContainText("0");
  expect(errors).toEqual([]);
});
test("all itinerary photos load from bundled files", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 5; i++) {
    await page.getByRole("tab").nth(i).click();
    const images = page.locator("img:visible");
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
});
