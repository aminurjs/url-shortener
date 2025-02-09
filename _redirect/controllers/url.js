const nanoid = require("../lib/shortId");
const ensureHttp = require("../lib/urlChecker");
const URL = require("../models/url");
const QRCode = require("qrcode");
const getLocationFromIP = require("./getAddress");

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
  const deviceType = req.device.type || "unknown";
  const referer = req.headers.referer || "direct";
  const ipAddress =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  const location = await getLocationFromIP(ipAddress);

  const userAgent = req.headers["user-agent"] || "unknown";
  const browser = userAgent.includes("Chrome")
    ? "Chrome"
    : userAgent.includes("Firefox")
    ? "Firefox"
    : userAgent.includes("Safari")
    ? "Safari"
    : userAgent.includes("Edge")
    ? "Edge"
    : "Other";

  const uniqueId = `${ipAddress}-${userAgent}`;

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ message: "Invalid URL." });
  }

  let isNewVisitor = false;
  if (!entry.uniqueVisitorIds.includes(uniqueId)) {
    isNewVisitor = true;
  }

  const dateKey = new Date().toISOString().slice(0, 13);

  await URL.findByIdAndUpdate(entry._id, {
    $push: {
      visitHistory: {
        timestamp: Date.now(),
        location,
        ipAddress,
        device: deviceType,
        browser,
        referer,
      },
    },
    $inc: {
      totalClicks: 1,
      [`browserStats.${browser}`]: 1,
      [`deviceStats.${deviceType}`]: 1,
      [`locationStats.${location?.country || "unknown"}`]: 1,
      [`clickTrends.${dateKey}`]: 1,
      [`refererStats.${referer}`]: 1,
      ...(isNewVisitor ? { uniqueVisitors: 1 } : {}),
    },
    ...(isNewVisitor ? { $addToSet: { uniqueVisitorIds: uniqueId } } : {}),
  });

  return res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleGetRedirect,
};
