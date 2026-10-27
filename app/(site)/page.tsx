import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AboutSection } from "@/components/home/AboutSection";
import { VisionMission } from "@/components/home/VisionMission";
import { LeadershipFeature } from "@/components/home/LeadershipFeature";
import { AssociatesFeature } from "@/components/home/AssociatesFeature";
import { ClientsCarousel } from "@/components/home/ClientsCarousel";
import { NewsInsights } from "@/components/home/NewsInsights";
import { CTASection } from "@/components/home/CTASection";
import { HomeHeroCarousel } from "@/components/home/HomeHeroCarousel";
import { getHomeHeroSlides } from "@/lib/home-hero-slide-data";

export default async function Home() {
  const slides = await getHomeHeroSlides();

  return (
    <>
      <HomeHeroCarousel slides={slides} />
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <AboutSection />
      <VisionMission />
      <LeadershipFeature />
      <AssociatesFeature />
      <ClientsCarousel />
      <NewsInsights />
      <CTASection />
    </>
  );
}
