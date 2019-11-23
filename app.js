require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const swaggerCss = fs.readFileSync('./swagger.css', 'utf-8'); // docs styling

const apiResponse = require('./helpers/apiResponse');
const indexRouter = require('./routes/index');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Server started!'); })
  .catch((err) => { console.error('App starting error:', err.message); process.exit(1); });

const app = express();

const swaggerSpec = swaggerJSDoc({
  definition: {
    info: {
      title: 'ME*N Bolerplate',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: swaggerCss }));

app.all('*', (req, res) => apiResponse.notFoundResponse(res, 'Page not found'));

app.use((err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
  return apiResponse.ErrorResponse(res, err);
});

app.listen(3000);
