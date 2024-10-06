const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
  const { questionId, content, user } = req.body;
  const newAnswer = new Answer({ questionId, content, user });
  await newAnswer.save();
  res.status(201).json(newAnswer);
};

exports.getAnswersForQuestion = async (req, res) => {
  const answers = await Answer.find({ questionId: req.params.id });
  res.json(answers);
};
