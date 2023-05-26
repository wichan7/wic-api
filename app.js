require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let authRoutes = require('./routes/auth');
let chatbotRoutes = require('./routes/chatbot');
let esdRoutes = require('./routes/esd');
let workspaceRoutes = require('./routes/workspace');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* route 설정 */
app.use('/auth', authRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/esd', esdRoutes);
app.use('/workspace', workspaceRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("404");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// mongodb
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


module.exports = app;