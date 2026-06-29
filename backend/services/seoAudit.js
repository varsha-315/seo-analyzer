const cheerio = require("cheerio");

const analyzeSEO = (html) => {

    const $ = cheerio.load(html);

    // Title
    const title = $("title").text().trim();

    // Meta Description
    const metaDescription =
        $('meta[name="description"]').attr("content") || "Not Found";

    // H1 Tags
    const h1 = [];
    $("h1").each((i, element) => {
        h1.push($(element).text().trim());
    });

    // H2 Tags
    const h2 = [];
    $("h2").each((i, element) => {
        h2.push($(element).text().trim());
    });

    // Images
    const images = $("img").length;

    // Images without ALT
    let imagesWithoutAlt = 0;

    $("img").each((i, element) => {

        const alt = $(element).attr("alt");

        if (!alt || alt.trim() === "") {
            imagesWithoutAlt++;
        }

    });

    return {
        title,
        metaDescription,
        h1,
        h2,
        images,
        imagesWithoutAlt
    };

};

module.exports = analyzeSEO;