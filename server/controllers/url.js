const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({
      error: "url is required",
    });

  const id = shortid.generate();
  await URL.create({
    shortId: id,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: id });
}

module.exports = { handleGenerateNewShortUrl };
