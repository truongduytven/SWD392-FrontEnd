import Banner from '@/assets/banner.jpeg'
import { SearchForm } from '@/components/local/Search/SearchForm'
function HomePage() {
  return (
    <div>
      <img className='h-3/5 w-screen' src={Banner} alt='banner' />
      <div className='w-full flex justify-center absolute top-[300px]'>
        <SearchForm />
      </div>
    </div>
  )
}

export default HomePage
