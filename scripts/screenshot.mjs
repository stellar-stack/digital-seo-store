import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/en";
const outPrefix = process.argv[3] || "/tmp/shot";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const positions = [0, 0.6, 1.3, 2.0, 2.8, 3.6, 4.4, 5.2, 6.0, 7.0, 8.0, 9.0];
for (let i = 0; i < positions.length; i++) {
  await page.evaluate((p) => window.scrollTo(0, window.innerHeight * p), positions[i]);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outPrefix}-${String(i).padStart(2, "0")}.png` });
}

console.log("CONSOLE_ERRORS:", JSON.stringify(errors));
await browser.close();
