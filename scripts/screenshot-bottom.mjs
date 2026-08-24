import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/en";
const outPrefix = process.argv[3] || "/tmp/shot";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const height = await page.evaluate(() => document.body.scrollHeight);
console.log("PAGE_HEIGHT:", height);

const fractions = [0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1.0];
for (let i = 0; i < fractions.length; i++) {
  await page.evaluate((f) => window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f), fractions[i]);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outPrefix}-f${Math.round(fractions[i]*100)}.png` });
}
await browser.close();
