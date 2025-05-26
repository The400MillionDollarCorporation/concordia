import FrontLayout from '@/layout/frontLayout'
import Claude from '~/component/claude'
import Contact from '~/component/contact'
import { Contributions } from '~/component/contributions'
import { Features } from '~/component/features'
import { Nav } from '~/component/nav'
import { Overview } from '~/component/overview'
import { GetStartedMain } from '~/component/get-started'
import { SupportedProtocols } from '~/component/supported-protocols'

const HomePage = () => {
  return (
    <FrontLayout page="home">
      <Nav />
      <Overview />
      <Features />
      <SupportedProtocols />
      <GetStartedMain />
      <Claude />
      <Contributions />
      <Contact />
    </FrontLayout>
  )
}

export default HomePage
