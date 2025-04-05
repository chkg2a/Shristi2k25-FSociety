import NavBar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import FeaturesSection from "../components/FeatureSection.jsx";
import PricingSection from "../components/PricingSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import CTABanner from "../components/CTABanner.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <NavBar />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Home;
