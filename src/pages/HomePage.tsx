import { HeroSection } from "../components/home/HeroSection";
import { StatsSection } from "../components/home/StatsSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { ImageStorySection } from "../components/home/ImageStorySection";
import { WhySection } from "../components/home/WhySection";

export function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ImageStorySection />
      <WhySection />
    </main>
  );
}
