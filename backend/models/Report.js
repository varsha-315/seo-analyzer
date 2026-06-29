const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    url: {
        type: String,
        required: true
    },

    seo: Object,

    technicalSEO: Object,

    lighthouse: Object,

    score: Number,

    recommendations: Array

},
{
    timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);