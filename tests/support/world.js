import { setWorldConstructor, setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

setDefaultTimeout(30000);

class PlaywrightWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(PlaywrightWorld);

Before(async function () {
  const browserName = process.env.BROWSER || 'chrome';

  if (browserName === 'lightpanda') {
    // Lightpanda connects over CDP; it must be running separately on port 9222
    // Use 127.0.0.1 explicitly to avoid IPv6 resolution issues with localhost
    this.browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  } else {
    // Default: Chromium (Chrome headless)
    this.browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  }

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
