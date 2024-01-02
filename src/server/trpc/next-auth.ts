import { NextAuthOptions, getServerSession } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
}

export const getServerAuthSession = async () => {
  const session = await getServerSession(authOptions).catch((resp) => {
    console.error('session', resp)
  })
  return session
}
