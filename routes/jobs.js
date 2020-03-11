const express = require('express');
const router = express.Router();
const controller = require('../controllers')
const authenticate = require('../controllers/authenticate')
/* GET home page. */
router.get('/',authenticate,controller.getJob);
router.post('/',authenticate,controller.createJob);
router.put('/:id',authenticate,controller.editJob);
router.delete('/:id',authenticate,controller.deleteJob);

module.exports = router;
