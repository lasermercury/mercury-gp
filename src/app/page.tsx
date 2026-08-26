import { ErrorBoundary } from '@/components/layout/error-boundary';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { SkipToContent } from '@/components/layout/skip-to-content';
import Hero from '@/components/sections/hero';
import Advantages from '@/components/sections/advantages';
import HowItWorks from '@/components/sections/how-it-works';
import ToolsSection from '@/components/sections/tools-section';
import SafetySection from '@/components/sections/safety-section';
import ComparisonSection from '@/components/sections/comparison-section';
import LearnSection from '@/components/sections/learn-section';
import FaqSection from '@/components/sections/faq-section';
import GlossarySection from '@/components/sections/glossary-section';
import FinalCta from '@/components/sections/final-cta';
import { ToolPanelManager } from '@/components/tools/tool-panel-manager';
import ProductDetailModal from '@/components/sections/product-detail-modal';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <SkipToContent />
        <Navigation />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Hero />
          <Advantages />
          <HowItWorks />
          <ToolsSection />
          <SafetySection />
          <ComparisonSection />
          <LearnSection />
          <FaqSection />
          <GlossarySection />
          <FinalCta />
        </main>
        <Footer />
        <ScrollToTop />
        <ToolPanelManager />
        <ProductDetailModal />
      </div>
    </ErrorBoundary>
  );
}
