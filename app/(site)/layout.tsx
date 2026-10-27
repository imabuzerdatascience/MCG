import { TopBar } from "@/components/layout/TopBar";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ISR keeps public routes fresh without rebuilding; admin content mutations
// revalidate the affected route after saving.
export const revalidate = 300;

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <TopBar />
      <NewsTicker />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
