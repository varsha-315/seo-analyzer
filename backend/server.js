const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const analyzeRoutes = require("./routes/analyzeRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoutes);

app.get("/", (req, res) => {
    res.send("🚀 SEO Analyzer Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});