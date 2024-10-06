const express = require('express');
const { createQuestion, getQuestions } = require('../controllers/questionController');

const router = express.Router();

router.post('/', createQuestion);
router.get('/', getQuestions);

module.exports = router;
