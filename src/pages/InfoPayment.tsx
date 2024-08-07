import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import { Input } from '@/components/global/atoms/input'
import { Label } from '@/components/global/atoms/label'
import { RadioGroup, RadioGroupItem } from '@/components/global/atoms/radio-group'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { useInvoice } from '@/contexts/InvoiceContext'
import { infoPaymentData } from '@/types/infoPayment'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import OOPS from '@/assets/oops.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'
import wallet from '@/assets/wallet.png'
import busAPI from '@/lib/busAPI'
import { formatPrice } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/global/atoms/dialog'
import Loading from '@/components/global/molecules/Loading'
import { toast } from 'sonner'
function InfoPayment() {
  const navigate = useNavigate()
  const { invoiceData, setInvoiceData } = useInvoice()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ username: '', phoneNumber: '', email: '' })
  const [infoData, setInfoData] = useState<infoPaymentData>({ username: '', phoneNumber: '', email: '' })
  const [paymentMethod, setPaymentMethod] = useState('VNPay')
  const { user } = useAuth()

  console.log(invoiceData)
  useEffect(() => {
    if (user) {
      setInfoData({
        username: user.FullName,
        phoneNumber: user.PhoneNumber,
        email: user.Email
      })
    }
  }, [user])

  useEffect(() => {
    const savedInvoiceData = localStorage.getItem('invoiceData');
    if (savedInvoiceData) {
      setInvoiceData(JSON.parse(savedInvoiceData));
      localStorage.removeItem('invoiceData');
    }
  }, [setInvoiceData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setInfoData((prevData) => ({
      ...prevData,
      [id]: value
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }))
  }

  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value)
  }

  const validateFields = () => {
    let valid = true
    const newErrors = { username: '', phoneNumber: '', email: '' }

    if (!infoData.username.trim()) {
      newErrors.username = 'Tên người đi là bắt buộc.'
      valid = false
    }

    if (!infoData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc.'
      valid = false
    } else if (!/^\d+$/.test(infoData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại chỉ chứa các ký tự số.'
      valid = false
    } else if (!/^0\d{9}$/.test(infoData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng 0.'
      valid = false
    }

    if (!infoData.email?.trim()) {
      newErrors.email = 'Email là bắt buộc.'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(infoData.email)) {
      newErrors.email = 'Email không hợp lệ.'
      valid = false
    }
    setErrors(newErrors)
    return valid
  }

  const onSubmit = async () => {
    setIsLoading(true)
    if (validateFields()) {
      if (paymentMethod === 'VNPay' && user!.Balance > 0 && user!.Balance < invoiceData.totalPrice) {
        setIsLoading(false)
        setIsOpenModal(true)
        return
      } else if (paymentMethod === 'VNPay') {
        const DataBooking = {
          addOrUpdateBookingModel: {
            userID: user?.UserID,
            tripID: invoiceData.tripID,
            isBalance: paymentMethod === 'VNPay' ? false : true,
            fullName: infoData.username,
            phoneNumber: infoData.phoneNumber,
            email: infoData.email,
            quantity: invoiceData.tickets.length,
            totalBill: invoiceData.totalPrice
          },
          addOrUpdateTicketModels: [
            ...invoiceData.tickets.map((ticket) => ({
              ticketType_TripID: ticket.ticketType_TripID,
              seatCode: ticket.seatCode,
              price: ticket.price,
              addOrUpdateServiceModels: ticket.services.map((service) => ({
                serviceID: service.ServiceID,
                stationID: service.station,
                quantity: service.quantity,
                price: service.Price
              }))
            }))
          ]
        }
        try {
          const response = await busAPI.post('/booking-management/managed-bookings/vnpay-payment', DataBooking)
          const link = response.data.Result
          localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
          window.location.href = link
        } catch (error) {
          console.log(error)
        }
      } else {
        if(user!.Balance < invoiceData.totalPrice) {
          setIsLoading(false)
          toast.error('Số dư không đủ để thanh toán')
          return
        } else {
          const DataBooking = {
            addOrUpdateBookingModel: {
              userID: user?.UserID,
              tripID: invoiceData.tripID,
              isBalance: paymentMethod === 'VNPay' ? false : true,
              fullName: infoData.username,
              phoneNumber: infoData.phoneNumber,
              email: infoData.email,
              quantity: invoiceData.tickets.length,
              totalBill: invoiceData.totalPrice
            },
            addOrUpdateTicketModels: [
              ...invoiceData.tickets.map((ticket) => ({
                ticketType_TripID: ticket.ticketType_TripID,
                seatCode: ticket.seatCode,
                price: ticket.price,
                addOrUpdateServiceModels: ticket.services.map((service) => ({
                  serviceID: service.ServiceID,
                  stationID: service.station,
                  quantity: service.quantity,
                  price: service.Price
                }))
              }))
            ]
          }
          try {
            const response = await busAPI.post('/booking-management/managed-bookings/balance-payment', DataBooking)
            if (response.data.IsSuccess) {
              navigate('/payment-success')
            } else {
              navigate('/payment-fail')
            }
          } catch (error) {
            navigate('/payment-fail')
          }
        }
      }
    }
    setIsLoading(false)
  }

  const handleConfirmPayment = async (isConfirm: boolean) => {
    if (isConfirm) {
      setIsLoading(false)
      const DataBooking = {
        addOrUpdateBookingModel: {
          userID: user?.UserID,
          tripID: invoiceData.tripID,
          isBalance: true,
          fullName: infoData.username,
          phoneNumber: infoData.phoneNumber,
          email: infoData.email,
          quantity: invoiceData.tickets.length,
          totalBill: invoiceData.totalPrice
        },
        addOrUpdateTicketModels: [
          ...invoiceData.tickets.map((ticket) => ({
            ticketType_TripID: ticket.ticketType_TripID,
            seatCode: ticket.seatCode,
            price: ticket.price,
            addOrUpdateServiceModels: ticket.services.map((service) => ({
              serviceID: service.ServiceID,
              stationID: service.station,
              quantity: service.quantity,
              price: service.Price
            }))
          }))
        ]
      }
      console.log(DataBooking)
      try {
        const response = await busAPI.post('/booking-management/managed-bookings/vnpay-payment', DataBooking)
        const link = response.data.Result
        localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
        window.location.href = link
      } catch (error) {
        console.log(error)
      }
    } else {
      const DataBooking = {
        addOrUpdateBookingModel: {
          userID: user?.UserID,
          tripID: invoiceData.tripID,
          isBalance: false,
          fullName: infoData.username,
          phoneNumber: infoData.phoneNumber,
          email: infoData.email,
          quantity: invoiceData.tickets.length,
          totalBill: invoiceData.totalPrice
        },
        addOrUpdateTicketModels: [
          ...invoiceData.tickets.map((ticket) => ({
            ticketType_TripID: ticket.ticketType_TripID,
            seatCode: ticket.seatCode,
            price: ticket.price,
            addOrUpdateServiceModels:
              ticket.services.length > 0
                ? ticket.services.map((service) => ({
                    serviceID: service.ServiceID,
                    stationID: service.station,
                    quantity: service.quantity,
                    price: service.Price
                  }))
                : []
          }))
        ]
      }
      console.log(DataBooking)
      try {
        const response = await busAPI.post('/booking-management/managed-bookings/vnpay-payment', DataBooking)
        setIsLoading(false)
        const link = response.data.Result
        localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
        window.location.href = link
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handClickModals = () => {
    setIsLoading(false)
    setIsOpenModal(!isOpenModal)
  }

  return invoiceData.tickets.length > 0 ? (
    isLoading && user ? (
      <div className='flex h-screen w-screen justify-center items-center'>
        <div className='flex flex-col space-y-3 items-center'>
          <Loading />
          <span className='text-lg font-medium'>Đang thanh toán.....</span>
        </div>
      </div>
    ) : (
      <Container>
        <Dialog open={isOpenModal} onOpenChange={handClickModals}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có muốn thanh toán với số dư còn lại?</DialogTitle>
              <DialogDescription>
                Bạn có muốn sử dụng số dư để thanh toán không ? Phần còn lại bạn sẽ thanh toán bằng VNPay. Số tiền bạn
                sẽ thanh toán nếu như sử dụng số dư là {formatPrice(invoiceData.totalPrice)} - {formatPrice((user ? user.Balance : 0) || 0)} ={' '}
                {formatPrice(invoiceData.totalPrice - (user ? user.Balance : 0))}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant='outline' onClick={() => handleConfirmPayment(false)}>Hủy</Button>
              <Button onClick={() => handleConfirmPayment(true)}>Đồng ý</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className='h-full flex flex-col mt-10 mb-12'>
          <div className='flex justify-start items-center'>
            <Button
              onClick={() => navigate(-1)}
              className='text-black bg-transparent hover:bg-transparent hover:underline hover:text-primary hover:font-bold'
            >
              <ArrowLeft className='scale-75' />
              Quay lại
            </Button>
          </div>
          <div className='flex justify-center items-center uppercase text-primary font-bold text-4xl mb-12'>
            thông tin thanh toán
          </div>
          <div className='flex justify-center space-x-10'>
            <div className='border w-4/12 h-fit rounded-xl shadow-md p-5 flex flex-col space-y-4'>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='name'>Tên người đi<span className='text-red-500'>*</span></Label>
                <Input
                  value={infoData.username}
                  onChange={handleChange}
                  type='text'
                  id='username'
                  placeholder='Nhập tên người đi'
                  required
                />
                {errors.username && <span className='text-red-500 text-sm'>{errors.username}</span>}
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='phoneNumber'>Số điện thoại<span className='text-red-500'>*</span></Label>
                <Input
                  value={infoData.phoneNumber}
                  onChange={handleChange}
                  type='tel'
                  id='phoneNumber'
                  placeholder='Nhập số điện thoại'
                  required
                />
                {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber}</span>}
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Email<span className='text-red-500'>*</span></Label>
                <Input
                  value={infoData.email}
                  onChange={handleChange}
                  type='email'
                  id='email'
                  placeholder='Nhập email nhận thông tin vé*'
                  required
                />
                {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
              </div>
              <div className='flex h-fit w-full items-center rounded-md border-2 border-tertiary bg-green-200 text-tertiary py-2 text-xs font-semibold'>
                <ShieldCheck className='w-1/6' /> Số điện thoại và email được sử dụng để gửi thông tin đơn hàng và liên
                hệ khi cần thiết.
              </div>
              <div className='font-bold'>Phương thức thanh toán</div>
              <RadioGroup value={paymentMethod} defaultValue={paymentMethod}>
                <div className='flex items-center space-x-2' onClick={() => handlePaymentChange('VNPay')}>
                  <div className='flex h-20 space-x-3 w-full items-center rounded-md border px-3 py-2 text-xs'>
                    <RadioGroupItem value='VNPay' id='option-one' />
                    <img
                      src='https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg'
                      alt='ảnh logo thanh toan'
                      className='max-h-14 max-w-14'
                    />
                    <Label className='text-lg' htmlFor='option-one'>
                      VNPay
                    </Label>
                  </div>
                </div>
                <div className='flex items-center space-x-2' onClick={() => handlePaymentChange('wallet')}>
                  <div className='flex h-20 space-x-3 w-full items-center rounded-md border px-3 py-2 text-xs'>
                    <RadioGroupItem value='wallet' id='option-two' />
                    <img src={wallet} alt='ảnh logo thanh toan bang vi' className='max-h-14 max-w-14' />
                    <div className='flex flex-col'>
                      <Label className='text-lg' htmlFor='option-two'>
                        Thanh toán bằng ví
                      </Label>
                      <Label className='text-md' htmlFor='option-two'>
                        Số dư hiện tại: {formatPrice(user?.Balance || 0)}
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className='flex flex-col space-y-10 w-4/12'>
              <InvoiceDetail />
              <div className='flex justify-end'>
                <Button
                  onClick={onSubmit}
                  className='bg-primary text-secondary hover:scale-110 transform scale-100 transition duration-200'
                >
                  Tiếp tục
                  <ArrowRight className='ml-1 scale-75' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  ) : (
    <Container>
      <div className='w-full flex justify-center items-center mb-8'>
        <div className='flex flex-col items-center'>
          <img src={OOPS} className='w-[450px] h-[450px]' />
          <div className='text-2xl font-medium'>Có vẻ như bạn chưa chọn ghế</div>
          <p className='text-lg mt-4'>Vui lòng chọn chuyến trước khi muốn điền thông tin thanh toán</p>

          <Link to='/search' className='underline hover:text-primary font-medium text-xl mt-8'>
            Quay lại trang chọn chuyến
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default InfoPayment
