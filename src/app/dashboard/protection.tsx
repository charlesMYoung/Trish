import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  return <>{children}</>
}
