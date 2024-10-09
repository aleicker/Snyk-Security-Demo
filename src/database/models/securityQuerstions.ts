import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const SecurityQuestionsSchema = new mongoose.Schema({
  userId: String,
  questions: [QuestionSchema],
});

export default mongoose.models.SecurityQuestions ||
  mongoose.model('SecurityQuestions', SecurityQuestionsSchema);
