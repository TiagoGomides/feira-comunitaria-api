const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const routes = require("./routes/index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
