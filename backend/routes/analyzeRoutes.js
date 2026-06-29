const express = require("express");
const router = express.Router();

const {
  analyzeWebsite,
  getReports
} = require("../controllers/analyzeController");

// Analyze website
router.post("/analyze", analyzeWebsite);

// Get all previous reports
router.get("/reports", getReports);

module.exports = router;