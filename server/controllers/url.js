const nanoid = require("../lib/shortId");
const ensureHttp = require("../lib/urlChecker");
const URL = require("../models/url");
const QRCode = require("qrcode");

async function handleGenerateNewShortUrl(req, res) {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({
      error: "url is required",
    });
  }
  const validUrl = ensureHttp(url);

  let shortId;
  let isUnique = false;

  while (!isUnique) {
    shortId = nanoid();

    const exist = await URL.findOne({ shortId });

    if (!exist) {
      isUnique = true;
    }
  }

  const svg = await QRCode.toString(validUrl, { type: "svg" });
  const base64Svg = Buffer.from(svg).toString("base64");

  const result = await URL.create({
    shortId,
    qrCode: `data:image/svg+xml;base64,${base64Svg}`,
    redirectURL: validUrl,
    visitHistory: [],
  });
  if (result) {
    return res.json({ data: result });
  } else {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (result) {
    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } else {
    return res.status(404).json({
      message: "Data not found.",
    });
  }
}

async function handleGetRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (entry) {
    return res.redirect(entry.redirectURL);
  } else {
    return res.status(404).json({
      message: "Invalid url.",
    });
  }
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics, handleGetRedirect };
