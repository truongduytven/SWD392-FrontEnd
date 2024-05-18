import Banner from '@/assets/banner.jpeg'
import { SearchForm } from '@/components/local/Search/SearchForm'

function HomePage() {
  return (
    <div >
      <img className='h-3/5 w-screen' src={Banner} alt='banner' />
      <SearchForm top="300px"/>
    </div>
  )
}

export default HomePage
