import './index.css'
import { MotionConfig } from 'framer-motion'
import AgencyNavbar      from './components/AgencyNavbar'
import AgencyFooter      from './components/AgencyFooter'
import AgencyHero        from './sections/AgencyHero'
import AgencyMarquee     from './sections/AgencyMarquee'
import AgencyAbout       from './sections/AgencyAbout'
import AgencyServices    from './sections/AgencyServices'
import AgencyProcess     from './sections/AgencyProcess'
import AgencyWhyUs       from './sections/AgencyWhyUs'
import AgencyPromise     from './sections/AgencyPromise'
import AgencyCTA         from './sections/AgencyCTA'

export default function AgencyApp() {
  return (
    <MotionConfig reducedMotion="user">
      <AgencyNavbar />
      <main>
        <AgencyHero />
        <AgencyMarquee />
        <AgencyAbout />
        <AgencyServices />
        <AgencyProcess />
        <AgencyWhyUs />
        <AgencyPromise />
        <AgencyCTA />
      </main>
      <AgencyFooter />
    </MotionConfig>
  )
}
