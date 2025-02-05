import axios from "axios";
import QRCode from "qrcode";
import { nanoid } from "nanoid";
import * as cheerio from "cheerio";
import URL from "../models/url.model.js";

function ensureHttp(url) {
  const regex = /^https?:\/\//;

  if (regex.test(url)) {
    return url;
  } else {
    return "http://" + url;
  }
}

export const getMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const title = $("title").text().trim();

    return title;
  } catch (error) {
    return null;
  }
};

export const createUrl = async (req, res) => {
  // try {
  const { link, customAlias, isQrCode, tags, title } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated request

  if (!link) {
    return res.status(400).json({ message: "Redirect URL is required" });
  }
  const validUrl = ensureHttp(link);

  // Check if custom alias is already taken
  if (customAlias) {
    const existingAlias = await URL.findOne({ shortId: customAlias });
    if (existingAlias) {
      return res.status(400).json({ message: "Custom alias already exists" });
    }
  }

  // Generate a unique short ID if no custom alias is provided
  const shortId = customAlias || nanoid(8);
  const shortURL = `${process.env.BASE_URL}/${shortId}`;

  let generatedTitle = title;
  if (title === "" || !title) {
    generatedTitle = await getMetadata(validUrl);
  }

  let generatedQrCode = null;
  if (isQrCode) {
    // Generate QR Code
    const svg = await QRCode.toString(shortURL, { type: "svg" });
    const base64Svg = Buffer.from(svg).toString("base64");
    generatedQrCode = `data:image/svg+xml;base64,${base64Svg}`;
  }

  // Set expiration date to 1 month from now
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);

  // Create and save URL document
  const newURL = new URL({
    title: generatedTitle,
    shortId,
    redirectURL: validUrl,
    qrCode: generatedQrCode,
    tags,
    expirationDate,
    userId,
  });

  await newURL.save();

  res.status(201).json({
    message: "Short URL created successfully",
    data: { shortURL, qrCode: newURL.qrCode },
  });
  // } catch (error) {
  //   res.status(500).json({ error: "Server error" });
  // }
};
