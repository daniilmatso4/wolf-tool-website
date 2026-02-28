import Hero from '@/components/landing/Hero';
import AgentShowcase from '@/components/landing/AgentShowcase';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PipelineDemo from '@/components/landing/PipelineDemo';
import GamificationSection from '@/components/landing/GamificationSection';
import CTA from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgentShowcase />
      <FeatureGrid />
      <PipelineDemo />
      <GamificationSection />
      <CTA />
    </>
  );
}
