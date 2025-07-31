router.get("/api/catgif", async (req, res) => {
  const user = process.env.GIFKEY;
  const query = req.query.q || "cats"; // Get query from frontend input
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${user}&q=${encodeURIComponent(query)}&limit=50`;

  console.log("Fetching GIPHY from:", url);

  try {
    const response = await axios.get(url);
    const embedUrl = response.data.data[0]?.embed_url;
    res.json({ embedUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Could not fetch gif" });
  }
});
