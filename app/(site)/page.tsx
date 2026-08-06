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

export default function Home() {
  return (
    <>
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
