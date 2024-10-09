import bcrypt from 'bcryptjs';
import {
  MutationCreateUserArgs,
  MutationUpdatePasswordArgs,
} from '@/graphql/generated/graphql';
import UserModel from '@/database/models/user';
import { createGraphQLError } from 'graphql-yoga';

export async function createUser(
  parent: unknown,
  args: MutationCreateUserArgs,
) {
  const existingUser = await UserModel.findOne({
    email: { $regex: new RegExp(args.input.email as string, 'i') },
  });

  const existingUsername = await UserModel.findOne({
    username: { $regex: new RegExp(args.input.username as string, 'i') },
  });

  if (existingUser) {
    throw createGraphQLError(
      `Error: An account with the email address "${args.input.email}" already exists.`,
    );
  }

  if (existingUsername) {
    throw createGraphQLError(
      `Error: Username "${args.input.username}" is already taken.`,
    );
  }

  const password = await bcrypt.hash(args.input.password as string, 10);
  const user = new UserModel({
    ...args.input,
    password,
  });

  await user.save();
}

export async function updatePassword(
  parent: unknown,
  args: MutationUpdatePasswordArgs,
) {
  const password = await bcrypt.hash(args.password as string, 10);

  await UserModel.findOneAndUpdate(
    { _id: args.userId },
    { $set: { password } },
  );
}
