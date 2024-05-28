import Banner from '@/assets/banner.jpeg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/global/atoms/carousel'
import { SearchForm } from '@/components/local/Search/SearchForm'
import PopularTrip from '../components/local/Home/PopularTrip'
import { popularTripData } from '@/constants/PopularTrip'
import CriteriaTags from '@/components/local/Home/CriteriaTags'
function HomePage() {
  return (
    <div>
      <div className='h-[600px]'>
        <img className='h-full w-screen' src={Banner} alt='banner' />
      </div>
      <div className='w-full flex justify-center absolute top-[300px]'>
        <SearchForm />
      </div>
      <div className='w-full flex flex-col mt-20 items-center space-y-14'>
        <div className='uppercase text-3xl font-bold text-primary'>Nền tảng kết nối người dùng và nhà xe</div>
        <CriteriaTags />
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-20 mb-10'>
        <div className='uppercase text-3xl font-bold text-primary'>Chuyến đi phổ biến</div>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full max-w-6xl'
        >
          <CarouselContent>
            {popularTripData &&
              popularTripData.map((item, index) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 hover:scale-110'>
                  <div className='p-10'>
                    <PopularTrip data={item} />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default HomePage
