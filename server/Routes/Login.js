const express = require('express')
const router = express.Router();
const authenticate = require('../controllers/AuthController')
router.use(express.json())
router.post('/login',authenticate)
module.exports = router