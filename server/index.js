const express = require("express");
require("dotenv").config();
const urlRouter = require("./routes/urlRoute");
const { connectToMongoDB } = require("./connect");
const { handleGetRedirect } = require("./controllers/url");
const device = require("express-device");

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(device.capture());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongodb connected");
});

app.get("/:shortId", handleGetRedirect);

app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
