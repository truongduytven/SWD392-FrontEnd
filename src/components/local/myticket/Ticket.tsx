import { Button } from '@/components/global/atoms/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/global/atoms/dialog'
import { calculateDuration } from '@/lib/utils'
import { Sprout } from 'lucide-react'
import { useState } from 'react'
import ModalDetail from './ModalDetail'
import { MessageCircleHeart } from 'lucide-react'
import RatingForm from '@/components/global/organisms/RatingForm'
interface TicketProps {
  date: string
  ticketDetailID: string
  companyName: string
  startTime: string
  endTime: string
  locationTo: string
  locationFrom: string
  seatCode: string
  priceTicket: number
  priceService: number
  status: string
}

function Ticket({
  date,
  ticketDetailID,
  companyName,
  startTime,
  endTime,
  locationTo,
  locationFrom,
  seatCode,
  priceTicket,
  priceService,
  status
}: TicketProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(false)
  return (
    <div
      className='mx-auto w-fit overflow-hidden flex justify-center items-center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex box relative bg-white shadow-sm w-fit p-5 mx-2 my-4 cursor-pointer transition-transform duration-300 ${
          isHovered ? 'transform scale-105' : ''
        }`}
      >
        <div className='relative flex flex-col justify-center items-center p-2 pr-6  border-r-2 border-dashed  border-gray-300'>
          <h2 className='text-center text-md  '>Giờ xuất bến</h2>
          <p className='text-center  text-lg font-semibold  text-gray-700'>{startTime}</p>
          <p className='text-center  text-md font-bold  '>{date}</p>
          <span className='absolute -top-6 right-0 transform translate-x-1/2 -translate-y-1/2 bg-muted rounded-full p-4'></span>
          <span className='absolute -bottom-6 right-0 transform translate-x-1/2 translate-y-1/2 bg-muted rounded-full p-4'></span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 ml-3 mr-4 '>
          <p className='text-lg font-bold text-primary'>Nhà xe: {companyName}</p>
          <div className='flex justify-between items-center gap-16'>
            <div className='flex '>
              <div className='flex justify-center items-center'>
                <div className=' h-full flex justify-between items-center mr-3 '>
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

                <div className='flex flex-col items-center justify-end gap-1'>
                  <p className='m-0 p-0'>
                    <span className='font-bold mr-2 text-lg'>{startTime}</span>
                  </p>
                  <p className='text-muted-foreground'>{calculateDuration(startTime, endTime)}</p>
                  <p>
                    <span className='font-bold mr-2 text-lg'>{endTime}</span>
                  </p>
                </div>
                <div className='flex flex-col h-full justify-between py-0.5'>
                  <span>• {locationFrom}</span>
                  <span>• {locationTo}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-end justify-end gap-1 h-full py-0.5'>
              <p>
                Số ghế: <span className='font-medium'>{seatCode}</span>{' '}
              </p>
              <p>
                Giá vé: <span className='font-medium'>{priceTicket}</span>
              </p>
              <p>
                Giá dịch vụ: <span className='font-medium'>{priceService}</span>
              </p>
            </div>
          </div>
        </div>
        <div className='ribbon absolute right-[-5px] top-[-5px] z-[1] overflow-hidden w-[75px] h-[75px] text-right'>
          <span>{status}</span>
        </div>

        {isHovered && (
          <div
            className={`absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-opacity-30 text-primary  text-lg transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Dialog>
              <DialogTrigger asChild>
                  <div className='flex justify-center items-center gap-1 hover:font-bold transition-all duration-100'>
                    {' '}
                    <Sprout />
                    Xem chi tiết
                  </div>
              </DialogTrigger>
              {status === 'ĐÃ SỬ DỤNG' && (
                <div
                  onClick={() => setShowRatingForm(true)}
                  className='ml-4 flex justify-center items-center gap-1 hover:font-bold transition-all duration-100'
                >
                  <MessageCircleHeart />
                  Đánh giá
                </div>
              )}
              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Thông tin chi tiết vé</DialogTitle>
                  <DialogDescription>Thông tin chi tiết bao gồm thông tin về vé và dịch vụ (nếu có).</DialogDescription>
                </DialogHeader>
                <div className='flex items-start justify-center space-x-2 h-[400px] overflow-y-scroll'>
                  <ModalDetail ticketDetailID={ticketDetailID} />
                </div>
                <DialogFooter className='sm:justify-end'>
                  <DialogClose asChild>
                    <Button type='button' variant='outline'>
                      Đóng
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      {showRatingForm && <RatingForm setShowRatingForm={setShowRatingForm}/>}
    </div>
  )
}

export default Ticket
