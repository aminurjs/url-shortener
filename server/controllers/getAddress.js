const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.IP_INFO_TOKEN;

async function getLocationFromIP(ip) {
  try {
    const response = await axios.get(`https://ipinfo.io/${ip}?token=${API_KEY}`);
    const data = response.data;

    // Extract the desired information
    const { city, region, country, loc } = data;

    return {
      city,
      region,
      country,
      loc,
    };
  } catch (error) {
    // console.error("Error fetching IP location:", error.message);
    throw error;
  }
}

module.exports = getLocationFromIP;
