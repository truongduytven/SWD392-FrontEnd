import { useCancelTicket } from '@/apis/userAllTicket'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/global/atoms/alert-dialog'
import { Button } from '@/components/global/atoms/button'
import RatingForm from '@/components/global/organisms/RatingForm'
import { calculateDuration, isWithin12Hours } from '@/lib/utils'
import { MessageCircleHeart, Sprout, SquareX, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ModalDetail from './ModalDetail'
interface TicketProps {
  date: string
  ticketDetailID: string
  tripID: string
  userID: string
  companyName: string
  startTime: string
  endTime: string
  locationTo: string
  locationFrom: string
  seatCode: string
  priceTicket: number
  priceService: number
  status: string
  isRated: boolean
}

function Ticket({
  date,
  ticketDetailID,
  tripID,
  userID,
  companyName,
  startTime,
  endTime,
  locationTo,
  locationFrom,
  seatCode,
  priceTicket,
  priceService,
  status,
  isRated
}: TicketProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [showDetailModal, setDetailModal] = useState(false)
  const [rated, setRated] = useState(isRated)
  const { mutateAsync } = useCancelTicket()
  const handleRatingSuccess = () => {
    setRated(true) // Update local state
  }

  const handleOpenCancel = () => {
    setIsOpenModal(true)
  }

  const handleCancelTicket = async () => {
    if (isWithin12Hours(date, startTime)) {
      toast.error('Vé không thể hủy vì đã quá thời gian hủy vé')
      return
    }
    try {
      const message = await mutateAsync(ticketDetailID)
      setIsOpenModal(false)
      toast.success(message)
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    }
  }

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
            <div className='flex justify-center items-center gap-1 hover:font-bold transition-all duration-100' onClick={()=>setDetailModal(true)}>
              {' '}
              <Sprout />
              Xem chi tiết
            </div>

            {status === 'ĐÃ SỬ DỤNG' &&
              (rated ? (
                <div className='ml-4 flex justify-center items-center gap-1 hover:font-bold transition-all duration-100'>
                  <MessageCircleHeart />
                  Đã đánh giá
                </div>
              ) : (
                <div
                  onClick={() => setShowRatingForm(true)}
                  className='ml-4 flex justify-center items-center gap-1 hover:font-bold transition-all duration-100'
                >
                  <MessageCircleHeart />
                  Đánh giá
                </div>
              ))}
            {status === 'CHƯA SỬ DỤNG' && (
              <div
                onClick={handleOpenCancel}
                className='ml-4 flex justify-center items-center gap-1 hover:font-bold transition-all duration-100'
              >
                <SquareX />
                Hủy vé
              </div>
            )}
          </div>
        )}
      </div>
      {showDetailModal && (
        <div className='flex h-screen items-center justify-center py-40'>
          <div className='fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-black/80 '>
            <div className='w-fit bg-background rounded-md p-6 drop-shadow-lg'>
              <div className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                <X className='h-4 w-4 cursor-pointer' onClick={() => setDetailModal(false)} />
              </div>
              <div>
                <div className='text-lg font-bold'>Thông tin chi tiết vé</div>
                <div>Thông tin chi tiết bao gồm thông tin về vé và dịch vụ (nếu có).</div>
              </div>
              <div className='flex items-start justify-center space-x-2 h-[400px] overflow-y-scroll'>
                <ModalDetail ticketDetailID={ticketDetailID} />
              </div>
              <div className='flex mt-6 justify-end'>
                <Button type='button' variant='outline' onClick={() => setDetailModal(false)}>
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRatingForm && (
        <RatingForm
          userID={userID}
          tripID={tripID}
          setShowRatingForm={setShowRatingForm}
          onRatingSuccess={handleRatingSuccess}
        />
      )}
      {isOpenModal && (
        <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Thông báo</AlertDialogTitle>
              <AlertDialogDescription>Bạn có chắc muốn hủy vé này không? Vé chỉ được hủy trước giờ xuất phát 12 tiếng. Khi hủy vé, bạn sẽ nhận được 70% giá trị của tiền vé.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant='outline'>Hủy</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleCancelTicket}>Đồng ý</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

export default Ticket
