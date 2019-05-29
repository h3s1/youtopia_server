const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const recommendationRouter = require('./routes/recommendations');
const userRouter = require('./routes/users');

const env = process.env.NODE_ENV || 'development';
const config = require('./server-config');

const app = express();

app.use(
  cors({
    origin: config.SERVER_CORS_ORIGIN,
    methods: config.SERVER_CONFIG_METHOD,
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
app.use('/posts/', postRouter);
app.use('/posts/:postId/comments/', commentRouter);
app.use('/posts/:postId/recommendations/', recommendationRouter);
app.use('/users/', userRouter);

app.set('port', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port: ${process.env.SERVER_PORT}`)
);

module.exports = app;
