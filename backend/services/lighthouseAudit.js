const lighthouse = require("lighthouse").default;
const puppeteer = require("puppeteer");

const runLighthouse = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ]
  });

  const result = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: "json",
    logLevel: "error"
  });

  const categories = result.lhr.categories;

  await browser.close();

  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(
      categories["best-practices"].score * 100
    ),
    seo: Math.round(categories.seo.score * 100)
  };
};

module.exports = runLighthouse;