
const User = require('./models/user');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); 