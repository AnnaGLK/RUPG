const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//  Middleware at the top
app.use(cors());
app.use(bodyParser.json());

// Serve static files FIRST
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));
// serve index.html, style.css, etc.


const User = require("./models/user");

//  API route
app.get("/api/user", async (req, res) => {
  const user = await User.getUser();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// Optional fallback for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
