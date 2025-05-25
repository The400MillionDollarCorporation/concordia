import FrontLayout from '@/layout/frontLayout'
import Nav from '~/component/nav'
import Overview from '~/component/overview'

const HomePage = () => {
  return (
    <FrontLayout page="home">
      <Overview />
      <Nav />
    </FrontLayout>
  )
}

export default HomePage
