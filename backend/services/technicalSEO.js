const axios = require("axios");
const cheerio = require("cheerio");

const analyzeTechnicalSEO = async (url, html) => {

    const $ = cheerio.load(html);

    // Canonical
    const canonical =
        $('link[rel="canonical"]').attr("href") || "Not Found";

    // Open Graph Title
    const ogTitle =
        $('meta[property="og:title"]').attr("content") || "Not Found";

    // Twitter Card
    const twitterCard =
        $('meta[name="twitter:card"]').attr("content") || "Not Found";

    // robots.txt
    let robots = false;

    try {

        await axios.get(url + "/robots.txt");

        robots = true;

    } catch (err) {

        robots = false;

    }

    // sitemap.xml
    let sitemap = false;

    try {

        await axios.get(url + "/sitemap.xml");

        sitemap = true;

    } catch (err) {

        sitemap = false;

    }

    return {

        canonical,

        robots,

        sitemap,

        ogTitle,

        twitterCard

    };

};

module.exports = analyzeTechnicalSEO;