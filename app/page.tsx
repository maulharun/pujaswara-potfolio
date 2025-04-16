import Navbar from "@/components/navbar";
import Header from "@/components/header";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ThemeToggle from "@/components/ThemeToggle";
import CommentSection from '@/components/CommentSection';
import RateMyWork from "@/components/RateMyWork";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <div className="fixed bottom-5 left-5">
        <ThemeToggle />
      </div>
      <CommentSection />
      <RateMyWork /> 
        <Chatbot />
    </>
  );
}
