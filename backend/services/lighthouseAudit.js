const runLighthouse = async (url) => {
  return {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0
  };
};

module.exports = runLighthouse;