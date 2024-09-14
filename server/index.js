const express = require("express");
require("dotenv").config();
const urlRouter = require("./routes/urlRoute");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8000;
app.use(express.json());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongodb connected");
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
