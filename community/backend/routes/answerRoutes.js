const express = require('express');
const { createAnswer, getAnswersForQuestion } = require('../controllers/answerController');

const router = express.Router();

router.post('/', createAnswer);
router.get('/:id', getAnswersForQuestion);

module.exports = router;
