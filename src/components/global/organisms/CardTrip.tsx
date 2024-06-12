import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/global/atoms/accordion'
import ImageTab from '@/components/local/TabCardTrip/ImageTab'
import busAPI from '@/lib/busAPI'
import { calculateDuration, formatPrice } from '@/lib/utils'
import { ITripData } from '@/types/tripInterface'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs'
import RatingDetailLayout from '../molecules/RatingDetailLayout'
import UtilitiesTab from '@/components/local/TabCardTrip/UtilitiesTab'
import RouteTrip from '@/components/local/TabCardTrip/RouteTrip'
interface ITripDataProps {
  data: ITripData
}

function CardTrip({ data }: ITripDataProps) {
  const [isDetailsPictureOpen, setIsDetailsPictureOpen] = useState(false)
  const [isDetailsUtility, setIsDetailsUtility] = useState(false)
  const [isDetailsRoute, setIsDetailsRoute] = useState(false)
  const [isDetailsRating, setIsDetailsRating] = useState(false)
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/selectTicket')
  }

  const fetchTripPictureDetails = async (tripId: string) => {
    const { data } = await busAPI.get(`/trip/trip-picture-detail/${tripId}`)
    return data
  }
  const fetchTripUtilitDetails = async (tripId: string) => {
    const { data } = await busAPI.get(`/utility/trip/${tripId}`)
    return data
  }
  const fetchTripRouteDetails = async (tripId: string) => {
    const { data } = await busAPI.get(`/station/stations-from-trip/${tripId}`)
    return data
  }
  const fetchTripRatingDetails = async (tripId: string) => {
    const { data } = await busAPI.get(`/rating/feedback-in-trip/${tripId}/0?pageNumber=1&pageSize=5`)
    return data
  }
  const {
    data: tripPictureDetails,
    isLoading: pictureDetailsLoading,
    error: pictureDetailsError,
    refetch: refetchPictureDetails
  } = useQuery({
    queryKey: ['tripPictureDetails', data.tripID],
    queryFn: () => fetchTripPictureDetails(data.tripID),
    enabled: false
  })
  const {
    data: tripUtilityDetails,
    isLoading: utilityDetailsLoading,
    error: utilityDetailsError,
    refetch: refetchUtilityDetails
  } = useQuery({
    queryKey: ['tripUtilityDetails', data.tripID],
    queryFn: () => fetchTripUtilitDetails(data.tripID),
    enabled: false
  })
  const {
    data: tripRouteDetails,
    isLoading: routeDetailsLoading,
    error: routeDetailsError,
    refetch: refetchRouteDetails
  } = useQuery({
    queryKey: ['tripRouteDetails', data.tripID],
    queryFn: () => fetchTripRouteDetails(data.tripID),
    enabled: false
  })
  const {
    data: tripRatingDetails,
    isLoading: ratingDetailsLoading,
    error: ratingDetailsError,
    refetch: refetchRatingDetails
  } = useQuery({
    queryKey: ['tripRatingDetails', data.tripID],
    queryFn: () => fetchTripRatingDetails(data.tripID),
    enabled: false
  })

  const handleTriggerPictureClick = () => {
    setIsDetailsPictureOpen(!isDetailsPictureOpen)
    if (!isDetailsPictureOpen) {
      refetchPictureDetails()
    }
  }
  const handleTriggerUtilitiClick = () => {
    setIsDetailsUtility(!isDetailsUtility)
    if (!isDetailsUtility) {
      refetchUtilityDetails()
    }
  }
  const handleTriggerRouteClick = () => {
    setIsDetailsRoute(!isDetailsRoute)
    if (!isDetailsRoute) {
      refetchRouteDetails()
    }
  }
  const handleTriggerRatingClick = () => {
    setIsDetailsRating(!isDetailsRating)
    if (!isDetailsRating) {
      refetchRatingDetails()
    }
  }
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
                <AccordionTrigger
                  onClick={handleTriggerPictureClick}
                  className='text-tertiary transition font-medium hover:underline -mb-3 mx-1'
                >
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
              <TabsTrigger value='tienich' onClick={handleTriggerUtilitiClick}>
                Tiện ích
              </TabsTrigger>
              <TabsTrigger value='lotrinh' onClick={handleTriggerRouteClick}>
                Lộ trình
              </TabsTrigger>
              <TabsTrigger
                value='danhgia'
                onClick={() => {
                  navigate('/search?value=0')
                  handleTriggerRatingClick()
                }}
              >
                Đánh giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value='hinhanh'>
              <ImageTab
                tripPictureDetails={tripPictureDetails}
                error={pictureDetailsError}
                isLoading={pictureDetailsLoading}
              />
            </TabsContent>

            <TabsContent value='tienich'>
              <UtilitiesTab
                tripUtilityDetails={tripUtilityDetails}
                error={utilityDetailsError}
                isLoading={utilityDetailsLoading}
              />
            </TabsContent>

            <TabsContent value='lotrinh'>
              <RouteTrip
                tripRouteDetails={tripRouteDetails}
                error={routeDetailsError}
                isLoading={routeDetailsLoading}
              />
            </TabsContent>

            <TabsContent value='danhgia'>
              <RatingDetailLayout   tripRatingDetails={tripRatingDetails}
                error={ratingDetailsError}
                isLoading={ratingDetailsLoading}/>
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardTrip
