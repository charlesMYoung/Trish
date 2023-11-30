import { SideBar, AppNavbar, Breadcrumb } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <SideBar/>
      <div className="w-full">
        <AppNavbar />
        <div className="box-border p-4 ">
          <Breadcrumb />
          <main className="mt-4">{children}</main>
        </div>
      </div>
    </section>
  );
}
