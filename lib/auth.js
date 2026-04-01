import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;

          // هنا نرجع بيانات المستخدم التي نريد تخزينها في التوكن
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // أهم سطر لنظام الصلاحيات
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    // 1. تخزين الـ role داخل التوكن (JWT)
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // 2. نقل الـ role من التوكن إلى الجلسة (Session) لتظهر في الـ Client Side
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // استخدام التوكن بدلاً من قاعدة البيانات للجلسات
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // الصفحة التي سنصممها لاحقاً لتسجيل الدخول
  },
};