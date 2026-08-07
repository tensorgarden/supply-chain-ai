import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.SCREENSHOT_URL || 'http://127.0.0.1:3107';
const outDir = path.resolve('docs/screenshots');
const captures = [
  {"file": "01-inventory-health.png", "description": "Inventory health with stock levels and reorder alerts", "heading": "Inventory Health"},
  {"file": "02-supplier-performance.png", "description": "Supplier performance scorecards and delivery metrics", "heading": "Supplier Performance"},
  {"file": "03-demand-forecast.png", "description": "Demand forecasts with confidence and trend signals", "heading": "Demand Forecast"},
  {"file": "04-low-stock-alerts.png", "description": "Low-stock alerts prioritized by days to stockout", "heading": "Low-Stock Alerts"},
  {"file": "05-supplier-risk-watch.png", "description": "Supplier risk watch with exposure and mitigation status", "heading": "Supplier Risk Watch"},
  {"file": "06-quality-control.png", "description": "Quality control checks and certificate verification", "heading": "Quality Control"}
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
await page.goto(baseUrl, { waitUntil: 'networkidle' });

const manifest = [];
for (const capture of captures) {
  const heading = page.getByRole('heading', { name: capture.heading, exact: true }).first();
  await heading.waitFor({ state: 'visible', timeout: 10000 });
  let panel = heading.locator('xpath=ancestor::*[(self::section or self::article or self::div) and contains(@class,"rounded")][1]');
  if (await panel.count() === 0) panel = heading.locator('xpath=ancestor::section[1]');
  if (await panel.count() === 0) throw new Error(`No panel found for ${capture.heading}`);
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await panel.screenshot({ path: path.join(outDir, capture.file), animations: 'disabled' });
  manifest.push({ file: `docs/screenshots/${capture.file}`, description: capture.description });
}
await page.screenshot({ path: path.join(outDir, '00-full-page.png'), fullPage: true, animations: 'disabled' });
manifest.push({ file: 'docs/screenshots/00-full-page.png', description: 'Full-page portfolio demo screenshot' });
await browser.close();
console.log(JSON.stringify({ ok: true, baseUrl, screenshots: manifest }, null, 2));
