const jwt = require('express-jwt');

const authenticate = jwt({ secret: process.env.JWT_SECRET });

module.exports = authenticate;
