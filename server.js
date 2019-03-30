const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
// const socketIO = require('socket.io');

// const server = express()
//   .use(app)
//   .listen(5555, () => console.log(`Listening Socket on 5555`));

// const io = socketIO(server);

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

app.get("/", auth, (req, res) => {
  res.send("Hello E-Commerce");
});


// Socket 
// const Message = require('./models/Message')
// // io.on('connection', () => {
// //   console.log('a user is connected')
// // })

// app.get('/messages', (req, res) => {
//   Message.find({}, (err, messages) => {
//     res.send(messages);
//   })
// })
// app.post('/messages', (req, res) => {
//   var message = new Message(req.body);
//   message.save((err) => {
//     if (err)
//       sendStatus(500);
//     io.emit('message', req.body);
//     res.sendStatus(200);
//   })
// })









// Use Routes
app.use("/", users);
app.use("/", categories);
app.use("/", companies);
app.use("/", products);
app.use("/", subscribes);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
