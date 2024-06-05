import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../atoms/button'
import RatingDetail from './RatingDetail'
const buttons = [
  { label: 'Tất cả', value: '' },
  { label: '5 Sao', value: '5' },
  { label: '4 Sao', value: '4' },
  { label: '3 Sao', value: '3' },
  { label: '2 Sao', value: '2' },
  { label: '1 Sao', value: '1' }
] as const
function RatingDetailLayout() {
  const [searchParams] = useSearchParams()

  const selectedValue = Number(searchParams.get('value')) || ''
  const [averageRatings, setAverageRatings] = useState<number>(5)

  return (
    <div className=''>
      <div className='flex items-center justify-center p-4 mb-4 rounded-sm bg-muted'>
        <div className='mx-10'>
          <span className='mx-1 text-2xl font-medium'>{averageRatings?.toFixed(1) || 0}</span>
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
              // onClick={() => handleButtonClick(button.value)}
              variant={selectedValue.toString() === button.value ? 'default' : 'outline'}
              className='border border-primary'
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <RatingDetail/>
      <RatingDetail/>
      <RatingDetail/>
      <RatingDetail/>
      <RatingDetail/>
    </div>
  )
}

export default RatingDetailLayout
