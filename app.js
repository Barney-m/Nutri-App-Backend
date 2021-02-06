require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.route("/api/user/:id").get((req, res, next) => {
  connection.query(
    "SELECT * FROM `users` WHERE id = ? LIMIT 3",
    req.params.id,
    (error, results, fields) => {
      if (error) throw error;
      else {
        if (results && results.length) res.json(results);
        else res.json({ error: true, msg: "No Result Found." });
      }
    }
  );
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.APP_PORT, process.env.APP_URL.toString, () => {
  console.log(
    `Server running on ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});
