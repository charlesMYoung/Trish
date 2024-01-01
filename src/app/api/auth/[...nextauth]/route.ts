import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
