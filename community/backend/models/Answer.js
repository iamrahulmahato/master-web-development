const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  user: { type: String, required: true }, // Or a reference to a User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', AnswerSchema);
