import { Router } from "express";
import {
  createUrl,
  getMetadata,
  getUrls,
} from "../controllers/url.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = Router();

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

router.post("/create", protect, createUrl);
router.get("/all", protect, getUrls);

export default router;
