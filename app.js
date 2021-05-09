require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    process.env.MONGO_URI,
    // process.env.AWS_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((result) => {
    console.log("MongoDB Connected!");
    const port = 3000;
    app.listen(port, () => {
      console.log(`Connecting on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/articles", require("./routes/articleRoutes"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  res.render("searchForm");
});

app.get("/create", (req, res) => {
  res.render("createForm");
});

app.get("/delete", (req, res) => {
  res.render("deleteForm");
});