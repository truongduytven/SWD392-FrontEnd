import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Loader from './Loader'
interface ImageTabProps {
  tripPictureDetails: string[]
  isLoading: boolean
  error: any
}

const ImageTab = ({ tripPictureDetails, isLoading, error }: ImageTabProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < tripPictureDetails.length - 1 ? prevIndex + 1 : 0))
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tripPictureDetails.length - 1))
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className='text-center font-semibold mt-8'>Đã xảy ra lỗi trong quá trình tải, vui lòng thử lại sau!</p>
      ) : tripPictureDetails && tripPictureDetails.length > 0 ? (
        <div className='p-4 flex flex-col justify-center items-center'>
          <div className='relative overflow-hidden mb-4 w-full h-96'>
            <div
              className='flex transition-transform duration-500'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {tripPictureDetails.map((image: string, index: number) => (
                <div key={index} className='flex-none w-full h-96'>
                  <img src={image} alt={`Slide ${index}`} className='w-full h-full rounded-md object-cover' />
                </div>
              ))}
            </div>
            <button
              onClick={handlePrev}
              className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-1 flex justify-center items-center rounded-full shadow hover:bg-opacity-100 transition'
            >
              <ChevronLeft className='text-primary' />
            </button>
            <button
              onClick={handleNext}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-1 rounded-full shadow hover:bg-opacity-100 transition'
            >
              <ChevronRight className='text-primary' />
            </button>
          </div>
          <div className='flex space-x-4 overflow-x-auto'>
            {tripPictureDetails.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer ${currentIndex === index ? 'border-2 border-primary' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className='text-center font-semibold mt-8'>Không có ảnh cho chuyến xe này</p>
      )}
    </div>
  )
}

export default ImageTab
