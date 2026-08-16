import { Navbar } from '@/components/presentation/Navbar';
import { HeroSection } from '@/components/presentation/HeroSection';
import { SoundExperience } from '@/components/presentation/SoundExperience';
import { EngineeringBento } from '@/components/presentation/EngineeringBento';
import { ColorStudio } from '@/components/presentation/ColorStudio';
import { TechnicalSpecs } from '@/components/presentation/TechnicalSpecs';
import { ReviewsSection } from '@/components/presentation/ReviewsSection';
import { FAQSection } from '@/components/presentation/FAQSection';
import { Footer } from '@/components/presentation/Footer';
import { CheckoutDrawer } from '@/components/presentation/CheckoutDrawer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-zinc-900 selection:bg-zinc-950 selection:text-white">
      <Navbar />
      <HeroSection />
      <SoundExperience />
      <EngineeringBento />
      <ColorStudio />
      <TechnicalSpecs />
      <ReviewsSection />
      <FAQSection />
      <Footer />
      <CheckoutDrawer />
    </main>
  );
}
