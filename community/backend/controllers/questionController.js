const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  const { title, content, user } = req.body;
  const newQuestion = new Question({ title, content, user });
  await newQuestion.save();
  res.status(201).json(newQuestion);
};

exports.getQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
};
