import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../atoms/button'
import RatingDetail from './RatingDetail'
import Loader from '@/components/local/TabCardTrip/Loader'
const buttons = [
  { label: 'Tất cả', value: '0' },
  { label: '5 Sao', value: '5' },
  { label: '4 Sao', value: '4' },
  { label: '3 Sao', value: '3' },
  { label: '2 Sao', value: '2' },
  { label: '1 Sao', value: '1' }
] as const



interface Feedback {
  userName: string;
  date: string;
  desciption: string;
  imageUrl: string[];
  rating: number;
  avt: string;
}

interface TripRatingDetails {
  feedbacks: Feedback[];
  totalRating: number;
}

interface RatingTabProps {
  tripID:string,
  tripRatingDetails: TripRatingDetails;
  isLoading: boolean;
  error: any;
  refetchRatingDetails: (options?: { throwOnError: boolean }) => Promise<any>
  setSelectedRatingValue: React.Dispatch<React.SetStateAction<string>>
}
function RatingDetailLayout({tripID, tripRatingDetails, isLoading, error, refetchRatingDetails,
  setSelectedRatingValue }: RatingTabProps) {
  console.log("data ơ rating", tripRatingDetails)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const [selectedValue, setSelectedValue] = useState<string>('0')
  
  console.log("ga trị chon", selectedValue)
  const [averageRatings, setAverageRatings] = useState<number>(5)
  const handleButtonClick = (value: string) => {
    setSelectedRatingValue(value)
    setSelectedValue(value); 
    navigate(`/search?rating/feedback-in-trip/${tripID}/${value}?pageNumber=1&pageSize=5`)
    refetchRatingDetails(); 
  }

  return (
    <div>
    <div className='flex items-center justify-center p-4 mb-4 rounded-sm bg-muted'>
      <div className='mx-10'>
        <span className='mx-1 text-2xl font-medium'>{tripRatingDetails?.totalRating?.toFixed(1) || 0}</span>
        <span className='text-base font-medium'>/ 5</span>
        <div className='flex my-2'>
          <svg viewBox='0 0 1000 200' className='mb-0'>
            <defs>
              <polygon id='star' points='100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66' />
              <clipPath id='stars'>
                <use xlinkHref='#star' />
                <use xlinkHref='#star' x='20%' />
                <use xlinkHref='#star' x='40%' />
                <use xlinkHref='#star' x='60%' />
                <use xlinkHref='#star' x='80%' />
              </clipPath>
            </defs>
            <rect className='w-full h-full fill-slate-300' clipPath='url(#stars)' />
            <rect width={averageRatings * 20 + '%'} className='fill-[#eab308] h-full' clipPath='url(#stars)' />
          </svg>
        </div>
      </div>
      <div className='flex gap-3'>
        {buttons.map((button) => (
          <Button
            key={button.value}
            onClick={() => handleButtonClick(button.value)}
            variant={selectedValue === button.value ? 'default' : 'outline'}
            className='border border-primary'
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <p className='text-center font-semibold mt-8'>Đã xảy ra lỗi trong quá trình tải, vui lòng thử lại sau!</p>
    ) : tripRatingDetails && tripRatingDetails.feedbacks.length > 0 ? (
      <div className='h-[400px] overflow-y-auto'>
        {tripRatingDetails.feedbacks.map((feedback, index) => (
          <RatingDetail feedback={feedback} key={index} />
        ))}
      </div>
    ) : (
      <p className='text-center font-semibold mt-8'>Không có đánh giá cho chuyến xe này</p>
    )}
  </div>
   
  )
}

export default RatingDetailLayout
