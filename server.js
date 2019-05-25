const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');

const env = process.env.NODE_ENV || 'development';

const app = express();

app.use(
  cors({
    origin: process.env.SERVER_CORS_ORIGIN,
    methods: process.env.SERVER_CORS_METHOD.split(','),
    credentials: true
  })
);

app.use(cookieParser());

app.use(
  bodyParser.json({
    verify(req, res, buf) {
      req.rawBody = buf;
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

if (env === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.set('port', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port: ${process.env.SERVER_PORT}`)
);

module.exports = app;
