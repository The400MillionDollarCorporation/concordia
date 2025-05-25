import FrontLayout from '@/layout/frontLayout'
import Claude from '~/component/claude'
import Contributions from '~/component/contributions'
import Nav from '~/component/nav'
import Overview from '~/component/overview'

const HomePage = () => {
  return (
    <FrontLayout page="home">
      <Nav />
      <Overview />
      <Claude />
      <Contributions />
    </FrontLayout>
  )
}

export default HomePage
