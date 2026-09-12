import { TopBar } from "@/components/layout/TopBar";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// The ticker, hero widget and news section read from the news data layer
// (MongoDB when configured). ISR keeps every site route fresh without
// rebuilding; admin mutations additionally call revalidatePath("/","layout").
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
