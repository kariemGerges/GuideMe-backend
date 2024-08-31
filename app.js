const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./routes/api/v1');
const bookFlightRouter = require('./routes/api/v1/bookFlight');
const findPlacesRouter = require('./routes/api/v1/findPlaces');
const chatBotRouter = require('./routes/api/v1/aiChatBot');
const geminiChatBotRouter = require('./routes/api/v1/geminiChatBot');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', apiRouter);
app.use('/api/v1/bookFlight', bookFlightRouter);
app.use('/api/v1/findPlaces', findPlacesRouter);
app.use('/api/v1/aiChatBot', chatBotRouter);
app.use('/api/v1/geminiChatBot', geminiChatBotRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error as JSON response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
console.log(`Server is running on ${app.listen().address().port}`);

module.exports = app;
