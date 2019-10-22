require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const apiResponse = require('./helpers/apiResponse');
const indexRouter = require('./routes/index');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Server started!'); })
  .catch((err) => { console.error('App starting error:', err.message); process.exit(1); });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);

app.all('*', (req, res) => apiResponse.notFoundResponse(res, 'Page not found'));

app.use((err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
  return apiResponse.ErrorResponse(res, err);
});

app.listen(3000);
