import FrontLayout from '@/layout/frontLayout'
import Claude from '~/component/claude'
import Nav from '~/component/nav'
import Overview from '~/component/overview'

const HomePage = () => {
  return (
    <FrontLayout page="home">
      <Nav />
      <Overview />
      <Claude />
    </FrontLayout>
  )
}

export default HomePage
