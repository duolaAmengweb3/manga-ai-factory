import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile header */}
      <header className="sticky top-0 z-20 flex h-14 items-center border-b border-border bg-background/80 backdrop-blur-sm px-4 md:hidden">
        <MobileNav />
      </header>

      {/* Main content area */}
      <main className="md:pl-60">
        <div className="w-full max-w-6xl mx-auto px-6 py-6 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
