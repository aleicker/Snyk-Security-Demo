import { SignJWT } from 'jose';
import { YogaInitialContext } from 'graphql-yoga';
import { GraphQLError } from 'graphql';
import { decodeJwt } from 'jose';

export async function createToken(payload?: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const jwt = await new SignJWT(payload || {})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
}

export async function getUserIdFromToken(ctx: YogaInitialContext) {
  const token = await ctx.request.cookieStore?.get('token');

  if (!token) {
    throw new GraphQLError('No token exists');
  }

  const { userId } = decodeJwt(token.value);

  return userId;
}
