const lighthouse = require("lighthouse").default;
const puppeteer = require("puppeteer");

const runLighthouse = async (url) => {

    const browser = await puppeteer.launch({
        headless: true
    });

    const result = await lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: "json",
        logLevel: "error"
    });

    const categories = result.lhr.categories;

    await browser.close();

    return {
        performance: categories.performance.score * 100,
        accessibility: categories.accessibility.score * 100,
        bestPractices: categories["best-practices"].score * 100,
        seo: categories.seo.score * 100
    };

};

module.exports = runLighthouse;