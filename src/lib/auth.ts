import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Demo users for testing
const demoUsers = [
  { id: 'admin-1', email: 'admin@masjidguard.org', password: 'admin123', name: 'Admin User', role: 'ADMIN' },
  { id: 'vol-1', email: 'volunteer@masjidguard.org', password: 'volunteer123', name: 'Ahmad Khan', role: 'VOLUNTEER' },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Demo: check against hardcoded users
        // In production: use prisma.user.findUnique + bcrypt.compare
        const user = demoUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
