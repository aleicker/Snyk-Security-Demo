import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  dueDate: String,
  isPaid: Boolean,
  note: String,
});

const ExpenseGroupSchema = new mongoose.Schema({
  userId: String,
  startDate: String,
  endDate: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

export default mongoose.models.ExpenseGroups ||
  mongoose.model('ExpenseGroups', ExpenseGroupSchema);
