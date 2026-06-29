const calculateScore = (seoData) => {

    let score = 100;

    const recommendations = [];

    // Title
    if (!seoData.title) {
        score -= 20;
        recommendations.push("Title tag is missing.");
    }

    // Meta Description
    if (seoData.metaDescription === "Not Found") {
        score -= 20;
        recommendations.push("Meta description is missing.");
    }

    // H1
    if (seoData.h1.length === 0) {
        score -= 15;
        recommendations.push("No H1 heading found.");
    }

    // Images without ALT
    if (seoData.imagesWithoutAlt > 0) {

        score -= seoData.imagesWithoutAlt * 2;

        recommendations.push(
            `${seoData.imagesWithoutAlt} image(s) don't have ALT text.`
        );
    }

    // Minimum score
    if (score < 0) {
        score = 0;
    }

    return {
        score,
        recommendations
    };

};

module.exports = calculateScore;