import { Router } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const router = Router();

const getMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    let title = $("title").text().trim();
    title = title.replace(/[^a-zA-Z0-9 •\-]/g, "").trim();

    let favicon =
      $('link[rel="icon"], link[rel="shortcut icon"]').attr("href") || "";
    if (favicon && !favicon.startsWith("http")) {
      const baseUrl = new URL(url).origin;
      favicon = baseUrl + (favicon.startsWith("/") ? favicon : "/" + favicon);
    }

    return { title, favicon };
  } catch (error) {
    console.error("Error fetching metadata:", error.message);
    return { title: "", favicon: "" };
  }
};

router.post("/get-metadata", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const metadata = await getMetadata(url);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

export default router;
