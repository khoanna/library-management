const express = require('express')
const cookieParser = require("cookie-parser");

const port = 3000;
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:2101",
    credentials: true,
  }));


const route = require('./src/routes')
// [APP]

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})