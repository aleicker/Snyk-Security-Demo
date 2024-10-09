import mongoose from 'mongoose';

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(
    'mongodb+srv://alaneicker:qawsed44@cluster0.jpxgh.mongodb.net/BudgetBuddy',
    connOptions,
  );
  console.log('mongodb connected!');
} catch (err) {
  console.log('mongodb connection error:', err);
}

const ExpenseSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  dueDate: String,
  isPaid: Boolean,
  note: String,
});

const ExpenseGroupSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

const ExpenseGroup = mongoose.model('ExpenseGroups', ExpenseGroupSchema);

const groups = [
  {
    startDate: '09/01/2023',
    endDate: '09/15/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '09/01/2023',
        isPaid: false,
        note: 'Pay on the 5th of the month.',
      },
      {
        name: 'ComEd',
        balance: 240.56,
        dueDate: '09/15/2023',
        isPaid: false,
        note: null,
      },
      {
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '09/20/2023',
        isPaid: false,
        note: null,
      },
      {
        name: 'Nicor',
        balance: 234.1,
        dueDate: '09/23/2023',
        isPaid: true,
        note: null,
      },
      {
        name: 'Gym',
        balance: 10.0,
        dueDate: '09/27/2023',
        isPaid: false,
        note: null,
      },
    ],
  },
  {
    startDate: '08/15/2023',
    endDate: '08/31/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/16/2023',
        isPaid: true,
        note: null,
      },
      {
        name: 'ComEd',
        balance: 320.99,
        dueDate: '08/21/2023',
        isPaid: false,
        note: null,
      },
      {
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/31/2023',
        isPaid: false,
        note: null,
      },
    ],
  },
];

groups.forEach((group, i) => {
  const newGroup = new ExpenseGroup(group);
  newGroup.save().then(() => {
    if (i === groups.length - 1) {
      console.log('Done. Database updated.');
      process.exit();
    }
  });
});
