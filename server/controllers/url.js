const nanoid = require("../lib/shortId");
const ensureHttp = require("../lib/urlChecker");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      error: "url is required",
    });
  }
  const validUrl = ensureHttp(body.url);

  let shortId;
  let isUnique = false;

  while (!isUnique) {
    shortId = nanoid();

    const exist = await URL.findOne({ shortId });

    if (!exist) {
      isUnique = true;
    }
  }

  await URL.create({
    shortId,
    redirectURL: validUrl,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
