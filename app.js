require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const gifRouter = require("./routes/gif");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", gifRouter); // makes /api/gif work

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
