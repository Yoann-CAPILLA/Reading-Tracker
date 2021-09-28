require('dotenv').config();
const express = require("express");
const router = require('./api/router');
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./api/dist'));

const db = require("./api/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

app.use('/v1/articles', router);

app.use((req, res) => {
    res.status(404).json({error: 'Ressource non trouvée'});
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});