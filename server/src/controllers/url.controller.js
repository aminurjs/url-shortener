import axios from "axios";
import QRCode from "qrcode";
import { nanoid } from "nanoid";
import * as cheerio from "cheerio";
import URLScheme from "../models/url.model.js";
import { ensureHttp } from "../utils/ensureHttp.js";

export const getMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const title =
      $("title").text().trim() ||
      $("meta[property='og:title']").attr("content") ||
      "";

    let favicon =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      "/favicon.ico";

    // Check if the favicon URL is relative and prepend the base URL
    if (favicon && !favicon.startsWith("http")) {
      const baseUrl = new URL(url).origin;
      favicon = new URL(favicon, baseUrl).href;
    }

    return { title, favicon };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: null, favicon: null };
  }
};

export const createUrl = async (req, res) => {
  try {
    const { link, customAlias, isQrCode, tags, title } = req.body;
    const userId = req.user._id; // Extract user ID from authenticated request

    if (!link) {
      return res.status(400).json({ message: "Redirect URL is required" });
    }
    const validUrl = ensureHttp(link);

    // Check if custom alias is already taken
    if (customAlias) {
      const existingAlias = await URLScheme.findOne({ shortId: customAlias });
      if (existingAlias) {
        return res.status(400).json({ message: "Custom alias already exists" });
      }
    }

    // Generate a unique short ID if no custom alias is provided
    const shortId = customAlias || nanoid(8);
    const shortURL = `${process.env.BASE_URL}/${shortId}`;

    const metadata = await getMetadata(validUrl);

    let generatedTitle = title;
    if (title === "" || !title) {
      generatedTitle = metadata.title;
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
    const newURL = new URLScheme({
      title: generatedTitle,
      shortId,
      shortURL,
      redirectURL: validUrl,
      qrCode: generatedQrCode,
      tags,
      expirationDate,
      userId,
      logo: metadata.favicon,
    });

    await newURL.save();

    res.status(201).json({
      message: "Short URL created successfully",
      data: { shortURL, qrCode: newURL.qrCode },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const query = { userId };

    // Filter by archived status if provided
    if (status === "archived") {
      query.archived = true;
    } else if (status === "active") {
      query.archived = false;
    }

    const urls = await URLScheme.find(query);
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const toggleArchiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the URL by ID and user ID (for security)
    const url = await URLScheme.findOne({ _id: id, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Toggle the archived status
    url.archived = !url.archived;
    await url.save();

    res.status(200).json({
      message: `URL ${url.archived ? "archived" : "unarchived"} successfully`,
      archived: url.archived,
    });
  } catch (error) {
    console.error("Error toggling archive status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the URL by ID and user ID (for security)
    const url = await URLScheme.findOne({ _id: id, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Delete the URL
    await URLScheme.findByIdAndDelete(id);

    res.status(200).json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUrlById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find URL by shortId and userId (for security)
    const url = await URLScheme.findOne({ shortId: id, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json(url);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { title, customAlias, isQrCode, link } = req.body;

    // Find URL by shortId and userId (for security)
    const url = await URLScheme.findOne({ shortId: id, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Check if custom alias is being changed and if it's already taken
    if (customAlias && customAlias !== url.shortId) {
      const existingAlias = await URLScheme.findOne({ shortId: customAlias });
      if (existingAlias) {
        return res.status(400).json({ message: "Custom alias already exists" });
      }

      // Update shortId and shortURL
      url.shortId = customAlias;
      url.shortURL = `${process.env.BASE_URL}/${customAlias}`;
    }

    // Update other fields if provided
    if (title !== undefined) {
      url.title = title;
    }

    if (link !== undefined) {
      const validUrl = ensureHttp(link);
      url.redirectURL = validUrl;
    }

    // Generate QR code if needed and not already present
    if (isQrCode && !url.qrCode) {
      const svg = await QRCode.toString(url.shortURL, { type: "svg" });
      const base64Svg = Buffer.from(svg).toString("base64");
      url.qrCode = `data:image/svg+xml;base64,${base64Svg}`;
    } else if (!isQrCode) {
      url.qrCode = null;
    }

    await url.save();

    res.status(200).json({
      message: "URL updated successfully",
      data: url,
    });
  } catch (error) {
    console.error("Error updating URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllLinksAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all URLs for the user
    const urls = await URLScheme.find({ userId: userId });

    // Get total clicks across all links
    const totalClicks = urls.reduce(
      (sum, url) => sum + (url.totalClicks || 0),
      0
    );

    // Get top 5 most clicked links
    const topLinks = urls
      .sort((a, b) => (b.totalClicks || 0) - (a.totalClicks || 0))
      .slice(0, 5)
      .map((url) => ({
        _id: url._id,
        title: url.title || url.redirectURL,
        shortURL: url.shortURL,
        shortId: url.shortId,
        logo: url.logo,
        clicks: url.totalClicks || 0,
      }));

    // Get click data for the last 30 days
    const clicksData = [];
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Initialize date map for quick lookups
    const dateMap = {};

    // Create an array of dates for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      dateMap[dateStr] = 0;
    }

    // Count clicks per day more efficiently
    urls.forEach((url) => {
      if (url.visitHistory && url.visitHistory.length > 0) {
        url.visitHistory.forEach((visit) => {
          const visitDate = new Date(visit.timestamp);
          const dateStr = visitDate.toISOString().split("T")[0];
          if (dateMap[dateStr] !== undefined) {
            dateMap[dateStr]++;
          }
        });
      }
    });

    // Convert to array format for chart data
    for (const [date, clicks] of Object.entries(dateMap)) {
      clicksData.push({
        date,
        clicks,
      });
    }

    // Sort chronologically
    clicksData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get the count of links created this month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const linksThisMonth = urls.filter(
      (url) => new Date(url.createdAt) >= firstDayOfMonth
    ).length;

    // Create clicksPerDay object as well for backward compatibility
    const clicksPerDay = {};
    clicksData.forEach((item) => {
      clicksPerDay[item.date] = item.clicks;
    });

    // Get browser and device statistics
    const browserStats = {};
    const deviceStats = {};
    const locationStats = {};

    urls.forEach((url) => {
      // Process browser stats
      if (url.browserStats && url.browserStats.size > 0) {
        for (const [browser, count] of url.browserStats.entries()) {
          browserStats[browser] = (browserStats[browser] || 0) + count;
        }
      }

      // Process device stats
      if (url.deviceStats && url.deviceStats.size > 0) {
        for (const [device, count] of url.deviceStats.entries()) {
          deviceStats[device] = (deviceStats[device] || 0) + count;
        }
      }

      // Process location stats
      if (url.locationStats && url.locationStats.size > 0) {
        for (const [location, count] of url.locationStats.entries()) {
          locationStats[location] = (locationStats[location] || 0) + count;
        }
      }
    });

    res.status(200).json({
      totalLinks: urls.length,
      totalClicks,
      topLinks,
      clicksData,
      clicksPerDay,
      linksThisMonth,
      browserData: browserStats,
      deviceData: deviceStats,
      locationData: locationStats,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
};

export const getSingleLinkAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find URL by ID and user ID (for security)
    const link = await URLScheme.findOne({ _id: id, userId });

    if (!link) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Daily clicks for the last 30 days
    const clicksPerDay = {};
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // Initialize all days with zero clicks
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      clicksPerDay[dateString] = 0;
    }

    // Count clicks per day from visit history
    link.visitHistory.forEach((visit) => {
      const visitDate = new Date(visit.timestamp);
      if (visitDate >= thirtyDaysAgo) {
        const dateString = visitDate.toISOString().split("T")[0];
        clicksPerDay[dateString] = (clicksPerDay[dateString] || 0) + 1;
      }
    });

    // Create clicksData array for new format
    const clicksData = Object.entries(clicksPerDay).map(([date, clicks]) => ({
      date,
      clicks,
    }));

    // Referrer data
    const refererData = Object.fromEntries(link.refererStats || []);

    res.status(200).json({
      linkId: link._id,
      shortId: link.shortId,
      title: link.title || link.redirectURL,
      totalClicks: link.totalClicks,
      uniqueVisitors: link.uniqueVisitors,
      clicksData,
      clicksPerDay,
      deviceData: Object.fromEntries(link.deviceStats || []),
      browserData: Object.fromEntries(link.browserStats || []),
      locationData: Object.fromEntries(link.locationStats || []),
      refererData,
      logo: link.logo || null,
    });
  } catch (error) {
    console.error("Error fetching link analytics:", error);
    res.status(500).json({ error: "Server error" });
  }
};
