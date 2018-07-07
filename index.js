const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const config = require("./config");
const Router = require("./router");

const app = express();

mongoose.connect(config.MONGO_URI, {
  user: config.MONGO_USER,
  pass: config.MONGO_PASS
})

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(helmet());

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use(morgan('dev'));

Router(app);

app.use(( error , req, res, next) => {
	return res.status(422).send({ status: {
        code: 422,
        message: error.message,
        succeeded: false
    }});
});

app.listen(config.PORT || 8003, () => {
  console.log(`listen port ${config.PORT || 8003}`)
})