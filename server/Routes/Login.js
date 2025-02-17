const express = require('express')
const router = express.Router();
const {login , verify} = require('../controllers/AuthController');
const token_authorization = require('../middlewares/AuthMiddleware');
router.post('/login',login)
router.get('/verify',token_authorization,verify)
module.exports = router;