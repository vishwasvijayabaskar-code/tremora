import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import Features from './sections/Features'
import Device from './sections/Device'
import Team from './sections/Team'
import Roadmap from './sections/Roadmap'
import CTA from './sections/CTA'
import Privacy from './sections/Privacy'

function App() {
  useLenis()
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <Features />
      <Device />
      <Team />
      <Roadmap />
      <Privacy />
      <CTA />
    </>
  )
}

export default App
