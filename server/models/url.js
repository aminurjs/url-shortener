const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Date },
        ipAddress: { type: String },
        location: {
          city: { type: String, default: null },
          region: { type: String, default: null },
          country: { type: String, default: null },
          loc: { type: String, default: null },
        },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
