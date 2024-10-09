import bcrypt from 'bcryptjs';
import { YogaInitialContext } from 'graphql-yoga';
import {
  SecurityQuestion,
  QueryLoginUserArgs,
  QueryGetSecurityQuestionsArgs,
  QueryValidateSecurityQuestionAnswersArgs,
} from '@/graphql/generated/graphql';
import UserModel from '@/database/models/user';
import SecurityQuestionsModel from '@/database/models/securityQuerstions';
import { createToken, getUserIdFromToken } from '@/utils/auth';
import { GraphQLError } from 'graphql';

export async function getSecurityQuestions(
  parent: unknown,
  args: QueryGetSecurityQuestionsArgs,
  ctx: YogaInitialContext,
) {
  const user = await UserModel.findOne({ email: args.email });

  if (!user) {
    throw new GraphQLError(`No user found for email ${args.email}`);
  }

  const securityQuestions = await SecurityQuestionsModel.findOne({
    userId: user._id,
  });

  if (!securityQuestions) {
    throw new GraphQLError(
      `Security questions not found for userId [${user._id}]`,
    );
  }

  return {
    userId: user._id,
    questions: securityQuestions.questions,
  };
}

export async function validateSecurityQuestionAnswers(
  parent: unknown,
  args: QueryValidateSecurityQuestionAnswersArgs,
  ctx: YogaInitialContext,
) {
  let isValid = true;
  const userId = args.userId;
  const formData = JSON.parse(args.formData);

  const securityQuestionsWithAnswers = await SecurityQuestionsModel.findOne({
    userId,
  });

  Object.keys(formData).forEach((key) => {
    const userAnswer = formData[key].toLowerCase();
    const foundQuestion = securityQuestionsWithAnswers.questions.find(
      (question: { answer: string } & SecurityQuestion) => {
        return question._id?.toString() === key;
      },
    );

    if (userAnswer !== foundQuestion.answer.toLowerCase()) {
      isValid = false;
    }
  });

  return isValid;
}

export async function loginUser(
  parent: unknown,
  args: QueryLoginUserArgs,
  ctx: YogaInitialContext,
) {
  const { username, password } = args;
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error();
  }

  const isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    throw new Error();
  }

  const token = await createToken({
    username: user.username,
    userId: user._id,
  });

  const now = new Date();
  const minutes = 60;
  now.setTime(now.getTime() + minutes * 60 * 1000);

  ctx.request.cookieStore?.set({
    name: 'token',
    value: token,
    httpOnly: true,
    domain: 'localhost',
    expires: now,
  });
}

export function logoutUser(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
) {
  ctx.request.cookieStore?.delete('token');
}

export async function getUser(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
) {
  const userId = await getUserIdFromToken(ctx);
  const user = await UserModel.findOne({ _id: userId });

  return user;
}
