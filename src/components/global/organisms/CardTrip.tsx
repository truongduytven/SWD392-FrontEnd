import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/global/atoms/accordion'
import { calculateDuration, formatPrice } from '@/lib/utils'
import { ITripData } from '@/types/tripInterface'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs'
import RatingDetailLayout from '../molecules/RatingDetailLayout'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'
import { useGetTripPictureDetails } from '@/apis/tripAPI'
import busAPI from '@/lib/busAPI'
interface ITripDataProps {
  data: ITripData
}
const steps = [{ step: 'Trạm ngã tư hàng xanh' }, { step: 'Vp Bình Chánh' }, { step: 'VP Bến Tre' }]
const images = [
  'https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg',
  'https://wlt-p-001.sitecorecontenthub.cloud/api/public/content/0fdac51ab4f14c059952cb8333c7ee51?v=67d6e3db',
  'https://imageio.forbes.com/specials-images/imageserve/6064b148afc9b47d022718d1/Hennessey-Venom-F5/960x0.jpg?height=473&width=711&fit=bounds',
  'https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp'
]
function CardTrip({ data }: ITripDataProps) {
  const [isDetailsPictureOpen, setIsDetailsPictureOpen] = useState(false);
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }
  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/selectTicket')
  }
  const handleTriggerClick = () => {
    setIsDetailsPictureOpen(!isDetailsPictureOpen);
    if (!isDetailsPictureOpen) {
      queryClient.fetchQuery({
        queryKey: ['tripPictureDetails', data.tripID],
        queryFn: () => busAPI.get(`/trip/trip-picture-detail/${data.tripID}`).then(res => res.data),
      });
    }
  };

  const { data: tripPictureDetails, isLoading, error } = useGetTripPictureDetails(data.tripID);
  console.log("chi tieets nef",tripPictureDetails )
  return (
    <Accordion type='single' collapsible className='mb-3'>
      <AccordionItem value='item-1' className='w-full'>
        <div className='flex bg-white p-3 gap-3 border border-gray-200 rounded-md transition duration-300 ease-in-out w-full hover:shadow-md hover:shadow-orange-400 hover:border-orange-500 hover:transform transform  hover:translate-x-[-5px]'>
          <div className='w-1/5 min-w-48 relative  overflow-hidden bg-cover bg-no-repeat'>
            <img
              className='h-full rounded-sm transition duration-300 ease-in-out hover:scale-110 '
              src={data.imageUrl}
              alt={data.companyName}
            />
          </div>
          <div className=' w-full flex flex-col gap-1'>
            <div className='text-lg font-bold flex justify-between'>
              <p>{data.companyName}</p>
              <p className='text-tertiary text-xl'>Từ {formatPrice(data.price)}</p>
            </div>
            {/* <p className='text-muted-foreground'>Limousine 24 phòng đôi</p> */}
            <p className='flex item-center justify-start gap-1'>
              {data.averageRating}/5
              <Star className='w-5 text-yellow-500' fill='orange' />({data.quantityRating} đánh giá)
            </p>
            <div className='flex justify-between items-end '>
              <div className='flex gap-3 justify-center items-center'>
                <div className=' h-full flex justify-between items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='74' viewBox='0 0 14 74'>
                    <path
                      fill='none'
                      stroke='#484848'
                      strokeLinecap='round'
                      strokeWidth='2'
                      strokeDasharray='0 7'
                      d='M7 13.5v46'
                    ></path>
                    <g fill='none' stroke='#DC2910' strokeWidth='3'>
                      <circle cx='7' cy='7' r='7' stroke='none'></circle>
                      <circle cx='7' cy='7' r='5.5'></circle>
                    </g>
                    <path
                      d='M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z'
                      fill='#188B05'
                    ></path>
                  </svg>
                </div>

                <div className='flex flex-col items-start justify-between gap-1 '>
                  <p className='m-0 p-0 '>
                    <span className='font-bold mr-2 text-lg'>{data.startTime}</span>• {data.startLocation}
                  </p>
                  <p className='text-muted-foreground'>{calculateDuration(data.startTime, data.endTime)}</p>
                  <p>
                    <span className='font-bold mr-2 text-lg'>{data.endTime}</span>• {data.endLocation}
                  </p>
                </div>
              </div>
              <div className=''>
                <AccordionTrigger onClick={handleTriggerClick}  className='text-tertiary transition font-medium hover:underline -mb-3 mx-1'>
                  Thông tin chi tiết
                </AccordionTrigger>
              </div>
              <div className='flex flex-col justify-end items-center gap-3'>
                <p>Còn trống {data.emptySeat} chỗ</p>
                <Button onClick={handleSubmit}>Chọn chuyến</Button>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[1px] bg-stone-300 mx-3'></div>
        <AccordionContent className='bg-white rounded-md h-fit'>
          <Tabs defaultValue='hinhanh' className='px-2 py-2'>
            <TabsList className='z-10 px-4 flex gap-4 sticky top-0 shadow-md '>
              <TabsTrigger className='' value='hinhanh'>
                Hình ảnh
              </TabsTrigger>
              <TabsTrigger value='tienich'>Tiện ích</TabsTrigger>
              <TabsTrigger value='lotrinh'>Lộ trình</TabsTrigger>
              <TabsTrigger value='danhgia'>Đánh giá</TabsTrigger>
            </TabsList>
            <TabsContent value='hinhanh'>
              <div className='p-4 flex flex-col justify-center items-center'>
                <div className='relative overflow-hidden mb-4 w-full h-96'>
                  <div
                    className='flex transition-transform duration-500'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {tripPictureDetails.map((image:string, index:any) => (
                      <div key={index} className='flex-none w-full h-96 '>
                        <img src={image} alt={`Slide ${index}`} className='w-full h-full rounded-md  object-cover' />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePrev}
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-1 flex justify-center items-center rounded-full shadow hover:bg-opacity-100 transition'
                  >
                    <ChevronLeft className='text-primary'/>
                  </button>
                  <button
                    onClick={handleNext}
                    className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-1 rounded-full shadow hover:bg-opacity-100 transition'
                  >
                    <ChevronRight className='text-primary' />
                  </button>
                </div>
                <div className='flex space-x-4 overflow-x-auto'>
                  {tripPictureDetails.map((image:string, index:any) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer ${currentIndex === index ? 'border-2  border-primary' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value='tienich'>Tiện ích đâu.</TabsContent>
            <TabsContent value='lotrinh'>
              <div className='ml-10 mt-4 text-base'>
                <ol className='relative border-l border-orange-400 border-dashed'>
                  {steps.map((item, index) => (
                    <li key={index} className='mb-10 ml-6'>
                      <span
                        className={
                          'flex absolute text-white -left-3 bg-primary justify-center items-center w-6 h-6  rounded-full ring-8 ring-white '
                        }
                      >
                        {index + 1}
                      </span>
                      <h3 className={'flex items-center mb-1'}>{item.step}</h3>
                      {/* <p className='text-base font-normal text-gray-500'>{item.description}</p> */}
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>
            <TabsContent value='danhgia'>
              <RatingDetailLayout />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardTrip
