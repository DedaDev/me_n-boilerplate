const apiResponse = require('../helpers/apiResponse');

exports.loginHandler = (req, res) => {
  apiResponse.successResponse(res, 'Hello');
};
