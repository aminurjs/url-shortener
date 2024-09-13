import express from "express";
import handleGenerateNewShortUrl from "../controllers/url";

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

export default router;
