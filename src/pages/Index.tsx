
import { Hero } from "@/components/Hero";
import { PackagesSection } from "@/components/PackagesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Hero />
      <PackagesSection />
      <Footer />
    </div>
  );
};

export default Index;
