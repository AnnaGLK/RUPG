const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/gif", async (req, res) => {
  const apiKey = process.env.GIFKEY;
  const query = req.query.q || "cats";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=1`;

  try {
    const response = await axios.get(url);
    const gif = response.data.data[0];
    if (!gif) {
      return res.status(404).json({ error: "No gif found" });
    }

    res.json({ embedUrl: gif.embed_url });
  } catch (err) {
    console.error("GIF fetch error:", err.message);
    res.status(500).json({ error: "Could not fetch gif" });
  }
});

module.exports = router;
