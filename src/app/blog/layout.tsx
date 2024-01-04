export default function PostLayout({
  footer,
  main,
  navbar,
}: {
  navbar: React.ReactNode
  footer: React.ReactNode
  main: React.ReactNode
}) {
  return (
    <section className="flex h-screen flex-col">
      {navbar}
      <main className="flex-1">{main}</main>
      {footer}
    </section>
  )
}
