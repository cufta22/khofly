import { Context } from 'elysia';
import { chromium } from 'playwright';

// GET - /privacy-scan
export const handlePrivacyScan = async (ctx: Context) => {
  const url = ctx.query?.url || '';

  if (!url) throw new Error('URL not found');

  const browser = await chromium.launch({
    // Hardcode the Nix system path for testing
    executablePath: '/etc/profiles/per-user/nxc/bin/chromium',
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const trackers: string[] = [];

  // Intercept network requests to find trackers
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('google-analytics') || url.includes('doubleclick')) {
      trackers.push(url);
    }
  });

  await page.goto(url);
  // Add your scoring logic here based on 'trackers.length'

  await browser.close();

  return {
    error: false,
    message: 'Privacy Scan score',
    data: {},
  };
};
