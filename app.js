let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let authRoutes = require('./routes/auth');
let chatbotRoutes = require('./routes/chatbot');
let dbRoutes = require('./routes/db');
let workspaceRoutes = require('./routes/workspace');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* route 설정 */
app.use('/auth', authRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/db', dbRoutes);
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

module.exports = app;