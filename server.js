const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//app variables
const app = express();
const port = process.env.PORT || 5050;

//middlewares
app.use(cors());
app.use(express.json());

//setting up mongodb connection
const uri = process.env.ATLAS_URI; // paste the mongodb connection string as ATLAS_URI in .env file
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error(`Error connecting to DB ${err} !`);
  });

// homepage route
app.get("/", (req, res) => {
  res.send(`The MERN express API is live now!`);
});

//we have to add the routers here in the server.js file to get the routes access
const blogsRouter = require("./routes/blogs");

app.use("/blogs", blogsRouter);

//listening to the port
app.listen(port, () => {
  console.log(` MERN Express API listening on ${port} !`);
});
