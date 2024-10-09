import * as user from './user';
import * as expenseGroups from './expenseGroups';

const Mutation = {
  ...user,
  ...expenseGroups,
};

export default Mutation;
