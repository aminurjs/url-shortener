import dotenv from "dotenv";

dotenv.config();

export const environment = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  database: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },

  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};
