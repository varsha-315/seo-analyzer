const crawlWebsite = require("../services/crawler");
const analyzeSEO = require("../services/seoAudit");
const calculateScore = require("../services/scoreCalculator");
const analyzeTechnicalSEO = require("../services/technicalSEO");
const runLighthouse = require("../services/lighthouseAudit");

const Report = require("../models/Report");


exports.analyzeWebsite = async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Website URL is required"
            });
        }


        // 1. Crawl website
        const html = await crawlWebsite(url);


        // 2. SEO analysis
        const seoData = analyzeSEO(html);


        // 3. Score calculation
        const scoreData = calculateScore(seoData);


        // 4. Technical SEO
        const technicalSEO = await analyzeTechnicalSEO(url, html);


        // 5. Lighthouse report
        const lighthouseReport = await runLighthouse(url);



        // 6. SAVE REPORT IN MONGODB
        const savedReport = await Report.create({

            url: url,

            seo: seoData,

            technicalSEO: technicalSEO,

            lighthouse: lighthouseReport,

            score: scoreData.score,

            recommendations: scoreData.recommendations

        });



        // 7. Send response
        res.status(200).json({

            success: true,

            message: "SEO Analysis Completed",

            reportId: savedReport._id,

            seo: seoData,

            technicalSEO,

            lighthouse: lighthouseReport,

            score: scoreData.score,

            recommendations: scoreData.recommendations

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};
exports.getReports = async (req, res) => {

    try {

        const reports = await Report.find()
            .sort({ createdAt: -1 });


        res.json({
            success: true,
            reports
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};