import { useTheme } from './hooks/useTheme';
import { useHeroEntrance } from './hooks/useHeroEntrance';
import { useScrollReveal } from './hooks/useScrollReveal';

import { SkeletonOverlay } from './components/SkeletonOverlay/SkeletonOverlay';
import { Navbar }          from './components/Navbar/Navbar';
import { HeroGeometric }   from './components/ui/shape-landing-hero';
import { Hero }            from './components/Hero/Hero';
import { TrustBar }        from './components/TrustBar/TrustBar';
import { Problem }         from './components/Problem/Problem';
import { Services }        from './components/Services/Services';
import { Stats }           from './components/Stats/Stats';
import { WhyElite }        from './components/WhyElite/WhyElite';
import { WhoWeServe }      from './components/WhoWeServe/WhoWeServe';
import { ContactForm }     from './components/ContactForm/ContactForm';
import { Footer }          from './components/Footer/Footer';

export default function App() {
  const { theme, toggle } = useTheme();

  useHeroEntrance();
  useScrollReveal();

  return (
    <>
      <SkeletonOverlay />
      <Navbar theme={theme} onThemeToggle={toggle} />
      <main>
        <HeroGeometric
          badge="Elite Compounding Agency"
          title1="Grow Your Practice"
          title2="With Elite Compounding"
        />
        <Hero />
        <TrustBar />
        <Problem />
        <Services />
        <Stats />
        <WhyElite />
        <WhoWeServe />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
