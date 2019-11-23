const express = require('express');
const { bodyValidation } = require('../middlewares/joiValidator');
const { loginSchema } = require('../helpers/joiSchemas');
const { loginHandler } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     description: User login route.
 *     parameters:
 *     - in: body
 *       name: Login info
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: Success!
 *       400:
 *         description: Error!
 */

router.post('/login', bodyValidation(loginSchema), loginHandler);

module.exports = router;
