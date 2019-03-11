const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello E-Commerce");
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
