import { SideBar, AppNavbar } from "@/components";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <SideBar></SideBar>
      <div className="w-full">
        <AppNavbar />
        {children}
      </div>
    </section>
  );
}
