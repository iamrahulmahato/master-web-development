const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Show all questions
router.get('/', async (req, res) => {
    const questions = await Question.find();
    res.render('index', { questions });
});

// Show form to ask a new question
router.get('/ask', (req, res) => {
    res.render('ask');
});

// Submit a new question
router.post('/ask', async (req, res) => {
    const { title, content } = req.body;
    const newQuestion = new Question({ title, content });
    await newQuestion.save();
    res.redirect('/');
});

// Show a single question
router.get('/question/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.render('question', { question });
});

module.exports = router;
