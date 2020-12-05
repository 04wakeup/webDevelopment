//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// DB Setting , useNewUrlParser for local connection to db
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);

//// Requests Targeting all Articles //////////
// GET all
app
  .route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("Success");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Delete OK");
      } else {
        res.send(err);
      }
    });
  });
// GET one with chain
////// Requests Targetting A Specific Article /////

app
  .route("/articles/:articleTitle")

  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }, function (err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send("No matched data.");
      }
    });
  })

  .put(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Update Ok");
        } else {
          res.send("Update Failed");
        }
      }
    );
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }, function (err) {
      if (!err) {
        res.send("Ok delete one");
      } else {
        res.send("Fail delete one");
      }
    });
  })
  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }, // all info sent dynamically
      function (err) {
        if (!err) {
          res.send("Ok update article!");
        } else {
          res.send("Fail Update One");
        }
      }
    );
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
