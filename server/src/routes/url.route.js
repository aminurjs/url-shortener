// Get analytics for all links
router.get("/analytics", authMiddleware, urlController.getAllLinksAnalytics);

// Get analytics for a specific link
router.get(
  "/:id/analytics",
  authMiddleware,
  urlController.getSingleLinkAnalytics
);
