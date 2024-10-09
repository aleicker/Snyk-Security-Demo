import { YogaInitialContext } from 'graphql-yoga';
import {
  ExpenseGroup,
  QueryGetExpenseGroupByIdArgs,
} from '@/graphql/generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';
import { getUserIdFromToken } from '@/utils/auth';

export async function getAllExpenseGroups(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
): Promise<ExpenseGroup[]> {
  const userId = await getUserIdFromToken(ctx);
  const expenseGroups = await ExpenseGroupModel.find({ userId });

  expenseGroups.sort(
    (a: ExpenseGroup, b: ExpenseGroup) =>
      new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf(),
  );
  return expenseGroups;
}

export async function getExpenseGroupById(
  _: any,
  args: QueryGetExpenseGroupByIdArgs,
): Promise<ExpenseGroup | null> {
  return await ExpenseGroupModel.findById(args._id);
}
