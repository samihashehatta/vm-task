const express = require('express');
const router = express.Router();
const controller = require('../controllers')
const authenticate = require('../controllers/authenticate')
/* GET home page. */
router.get('/signup',controller.home);
router.get('/login',controller.login);

module.exports = router;
