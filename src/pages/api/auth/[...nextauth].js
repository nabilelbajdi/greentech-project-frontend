import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../server/db/prisma';
import jwt from 'jsonwebtoken';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    session({ session, user }) {

      console.log('hej session');

      if (session.user) {
        session.user.id = user.id;

        let createToken = false;

        if (!session.user.jwtToken) {

          createToken = true;

        } else {

          jwt.verify(session.user.jwtToken, process.env.JWT_SECRET, (err, data) => {

            if (err) {

              createToken = true;

            }

          })

        }

        if (createToken) {

          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 60 });
          session.user.jwtToken = token;

        }
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
