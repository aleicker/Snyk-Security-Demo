import * as auth from './user';
import * as expenseGroups from './expenseGroups';

const Query = {
  ...auth,
  ...expenseGroups,
};

export default Query;
