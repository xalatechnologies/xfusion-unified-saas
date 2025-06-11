import Hero3D from "@/components/ui/hero";
import Header from "@/apps/supplymantix/components/landing/Header";
import FeaturesSection from "@/apps/supplymantix/components/landing/FeaturesSection";
import BenefitsSection from "@/apps/supplymantix/components/landing/BenefitsSection";
import CTASection from "@/apps/supplymantix/components/landing/CTASection";
import Footer from "@/apps/supplymantix/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero3D />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
