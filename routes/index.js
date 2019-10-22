const express = require('express');
const { queryValidation } = require('../middlewares/joiValidator');
const { loginSchema } = require('../helpers/joiSchemas');
const { loginHandler } = require('../controllers/userController');

const router = express.Router();

router.post('/:email', queryValidation(loginSchema), loginHandler);

module.exports = router;
