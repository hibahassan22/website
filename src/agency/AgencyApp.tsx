import './index.css'
import AgencyNavbar      from './components/AgencyNavbar'
import AgencyFooter      from './components/AgencyFooter'
import AgencyHero        from './sections/AgencyHero'
import AgencyAbout       from './sections/AgencyAbout'
import AgencyPromise     from './sections/AgencyPromise'
import AgencyServices    from './sections/AgencyServices'
import AgencyProcess     from './sections/AgencyProcess'
import AgencyWhyUs       from './sections/AgencyWhyUs'
import AgencyCTA         from './sections/AgencyCTA'

export default function AgencyApp() {
  return (
    <>
      <AgencyNavbar />
      <main>
        <AgencyHero />
        <AgencyAbout />
        <AgencyPromise />
        <AgencyServices />
        <AgencyProcess />
        <AgencyWhyUs />
        <AgencyCTA />
      </main>
      <AgencyFooter />
    </>
  )
}
