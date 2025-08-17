const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const knowledgeRoutes = require("./routes/knowledge");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/knowledge", knowledgeRoutes);

module.exports = app;
