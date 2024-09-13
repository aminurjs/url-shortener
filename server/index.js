import express from "express";
import urlRouter from "./test/route";

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

app.use("/url", urlRouter);
