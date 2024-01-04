'use client'

import { useSession } from 'next-auth/react'

export default function DashboardDefault() {
  const { data: session, status } = useSession()
  console.log('session', session, status)
  return <div className="mb-4">main body children</div>
}
