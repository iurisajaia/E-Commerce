const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
// Require Routes
const users = require("./routes/users");
const categories = require("./routes/categories");
const companies = require("./routes/companies");
const products = require("./routes/products");
const subscribes = require("./routes/Subscribers");
// Protect Routes
const auth = require("./middleware/login");

// Public Folder
app.use(express.static("./uploads"));
// app.use(express.static(path.join(__dirname, "/uploads")));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Cors
app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));





// Use Routes
app.use("/", users);
app.use("/", categories);
app.use("/", companies);
app.use("/", products);
app.use("/", subscribes);


app.use(express.static(path.join(__dirname, '/client/build/')))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
