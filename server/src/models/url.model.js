import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(8),
    },
    customAlias: {
      type: String,
      unique: true,
      sparse: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expirationDate: {
      type: Date,
      default: null,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    visitHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        ipAddress: { type: String },
        device: { type: String },
        browser: { type: String },
        os: { type: String },
        referer: { type: String },
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

const URL = mongoose.model("URL", urlSchema);

export default URL;
