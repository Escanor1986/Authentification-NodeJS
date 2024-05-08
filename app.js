const path = require("path");
const express = require("express");
require("./database");
const router = require("./routes");
const app = express();

exports.app = app;

require("./config/session.config");
require("./config/passport.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(3000);
