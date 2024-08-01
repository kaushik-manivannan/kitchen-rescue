import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          }
          return null;
        } catch (error: any) {
          console.error('Error during authentication:', error);
          // Throw specific errors based on Firebase error codes
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              throw new Error('Invalid Credentials');
            case 'auth/too-many-requests':
              throw new Error('Too Many Attempts');
            default:
              throw new Error('Server Error');
          }
        }
      }
    }),
  ],
  adapter: FirestoreAdapter(auth),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;  // Use the subject claim as the user ID
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };