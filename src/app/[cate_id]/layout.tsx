import { AppNavbar, Footer } from '@/components'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <AppNavbar />
      {children}
      <Footer />
    </section>
  )
}
