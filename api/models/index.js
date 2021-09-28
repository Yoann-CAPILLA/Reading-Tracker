const dbConfig = require("../database");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = require("./article")(mongoose);

module.exports = db;