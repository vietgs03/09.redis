const express=require('express');
const {get} = require('../middlewares/test')
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler');
const testController = require('../controllers/test.controller');


router.get('/get/:id',asyncHandler(testController.testCache));
router.get('/get',asyncHandler(testController.getSeat));

module.exports = router;