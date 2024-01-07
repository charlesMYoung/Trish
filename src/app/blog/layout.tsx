export default function PostLayout({
  footer,
  main,
}: {
  footer: React.ReactNode
  main: React.ReactNode
}) {
  return (
    <section className="flex h-screen flex-col">
      <main className="flex-1">{main}</main>
      {footer}
    </section>
  )
}
