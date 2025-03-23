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
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    qrCode: { type: String },
    title: { type: String },
    logo: { type: String },
    archived: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expirationDate: { type: Date, default: null },
    totalClicks: { type: Number, default: 0 },

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

    uniqueVisitors: { type: Number, default: 0 },
    uniqueVisitorIds: [{ type: String }],

    browserStats: { type: Map, of: Number, default: {} },

    deviceStats: { type: Map, of: Number, default: {} },

    locationStats: { type: Map, of: Number, default: {} },

    clickTrends: { type: Map, of: Number, default: {} },

    refererStats: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

export default URL;
