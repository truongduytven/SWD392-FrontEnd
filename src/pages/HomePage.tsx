import Banner from '@/assets/anhdepvietnam.jpg'
import Banner2 from '@/assets/banner2.jpg'
import Banner3 from '@/assets/banner3.webp'
import Banner4 from '@/assets/banner4.jpg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/global/atoms/carousel'
import { Carousel as Car } from 'antd'
import React from 'react'
import { SearchForm } from '@/components/local/Search/SearchForm'
import PopularTrip from '../components/local/Home/PopularTrip'
import CriteriaTags from '@/components/local/Home/CriteriaTags'
import { useNavigate } from 'react-router-dom'
import { useGetPopularTrip } from '@/apis/tripAPI'
import Loading from '@/components/global/molecules/Loading'
function HomePage() {
  const navigate = useNavigate()
  const { data: popularTripData, isLoading } = useGetPopularTrip()
  console.log(popularTripData)
  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }

  return (
    <div>
      <div className='h-[600px]'>
        <Car autoplay autoplaySpeed={2000} className='h-full w-screen'>
          <img style={contentStyle} className='h-[650px] object-cover w-screen' src={Banner} alt='banner' />

          <img style={contentStyle} className='h-[650px] object-cover w-screen' src={Banner2} alt='banner' />

          <img style={contentStyle} className='h-[650px] object-cover w-screen' src={Banner3} alt='banner' />

          <img style={contentStyle} className='h-[650px] object-cover w-screen' src={Banner4} alt='banner' />
        </Car>
      </div>
      <div className='w-full flex justify-center absolute top-[300px]'>
        <SearchForm onsubmitSearch={() => navigate('/search?pageNumber=1')} />
      </div>
      <div className='w-full flex flex-col mt-20 items-center space-y-14'>
        <div className='uppercase text-3xl font-bold text-primary'>Nền tảng kết nối người dùng và nhà xe</div>
        <CriteriaTags />
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-20 mb-10'>
        <div className='uppercase text-3xl font-bold text-primary'>Chuyến đi phổ biến</div>
        {isLoading ? (
          <div className='my-20'>
            <Loading />
          </div>
        ) : (
          popularTripData && popularTripData.length > 0 ? (
            <Carousel
            opts={{
              align: 'start'
            }}
            className='w-full max-w-6xl'
          >
            <CarouselContent>
              {popularTripData &&
                popularTripData.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className='md:basis-1/2 lg:basis-1/3 hover:scale-110 transform scale-100 transition duration-200'
                  >
                    <div className='p-10'>
                      <PopularTrip data={item} />
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          ) : (
            <div className='h-40 flex justify-center items-center text-gray-500 text-center mt-4'>Không có chuyến đi phổ biến nào</div>
          )
        )}
      </div>

    
    </div>
  )
}

export default HomePage
