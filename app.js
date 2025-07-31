require('dotenv').config(); // always at the top

const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

app.use(cors()); // <--- This allows cross-origin requests

const gifRouter = require('./routes/gif');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', gifRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

