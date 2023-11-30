import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/dashboard'} className="text-primary-500">
        enter the dashboard
      </Link>
    </main>
  )
}
