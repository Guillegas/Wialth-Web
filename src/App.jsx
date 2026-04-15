import { useRef } from 'react'
import Nav            from './components/Nav.jsx'
import Hero           from './components/Hero.jsx'
import Benefits       from './components/Benefits.jsx'
import HowItWorks     from './components/HowItWorks.jsx'
import Stats          from './components/Stats.jsx'
import Faq            from './components/Faq.jsx'
import CtaSection     from './components/CtaSection.jsx'
import Footer         from './components/Footer.jsx'
import StickyCta      from './components/StickyCta.jsx'

export default function App() {
  const heroRef = useRef(null)

  return (
    <>
      <Nav heroRef={heroRef} />
      <Hero heroRef={heroRef} />
      <Benefits />
      <HowItWorks />

      <div aria-hidden="true" className="h-[60px] sm:h-[160px]" style={{ background:'linear-gradient(to bottom,#F2F1ED,#F5EFE0)' }} />
      <Stats />
      <div aria-hidden="true" className="h-[60px] sm:h-[160px]" style={{ background:'linear-gradient(to bottom,#F5EFE0,#F2F1ED)' }} />

      {/* Wrapper con gradiente continuo: FAQ → CTA */}
      <div style={{ background: 'linear-gradient(to bottom, #F2F1ED 0%, #e2e6df 10%, #cdd4c9 20%, #b3bcae 30%, #96a691 40%, #7a9376 52%, #607a5b 65%, #4a6244 77%, #3d5239 88%, #2e3f2b 100%)' }}>
        <Faq />
        <CtaSection />
      </div>

      <Footer />
      <StickyCta heroRef={heroRef} />
    </>
  )
}
