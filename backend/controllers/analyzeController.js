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
        message: "Website URL is required",
      });
    }

    // Crawl Website
    const html = await crawlWebsite(url);

    // SEO Analysis
    const seoData = analyzeSEO(html);

    // Score
    const scoreData = calculateScore(seoData);

    // Technical SEO
    const technicalSEO = await analyzeTechnicalSEO(url, html);

    // Lighthouse (Don't crash if it fails)
    let lighthouseReport;

    try {
      lighthouseReport = await runLighthouse(url);
    } catch (error) {
      console.log("Lighthouse Error:", error.message);

      lighthouseReport = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
      };
    }

    // Save Report in MongoDB
    const report = await Report.create({
      url,
      seo: seoData,
      technicalSEO,
      lighthouse: lighthouseReport,
      score: scoreData.score,
      recommendations: scoreData.recommendations,
    });

    // Send Response
    res.status(200).json({
      success: true,
      message: "SEO Analysis Completed",
      reportId: report._id,
      seo: seoData,
      technicalSEO,
      lighthouse: lighthouseReport,
      score: scoreData.score,
      recommendations: scoreData.recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};