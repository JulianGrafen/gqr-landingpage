import puppeteer from 'puppeteer';

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2200 });
  
  try {
    await page.goto('http://127.0.0.1:3000/betriebsanweisung/ethylacetat-trgs-555/', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const acetonBtn = buttons.find(btn => btn.textContent.includes('Aceton') && !btn.textContent.includes('2K'));
      if (acetonBtn) {
        acetonBtn.click();
        return true;
      }
      return false;
    });
    
    console.log('Clicked:', clicked);
    await sleep(15000);
    
    await page.screenshot({ path: '/opt/cursor/artifacts/ba-ethylacetat-scan-result-v2.png', fullPage: false });
    console.log('Screenshot saved');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
