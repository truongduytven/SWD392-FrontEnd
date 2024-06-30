import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import { Input } from '@/components/global/atoms/input'
import { Label } from '@/components/global/atoms/label'
import { RadioGroup, RadioGroupItem } from '@/components/global/atoms/radio-group'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { useInvoice } from '@/contexts/InvoiceContext'
import { infoPaymentData } from '@/types/infoPayment'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import OOPS from '@/assets/oops.jpg'
import { Link, useNavigate } from 'react-router-dom'

function InfoPayment() {
  const navigate = useNavigate()
  const { invoiceData } = useInvoice()
  const [errors, setErrors] = useState({ username: '', phoneNumber: '', email: '' })
  const [infoData, setInfoData] = useState<infoPaymentData>({ username: '', phoneNumber: '', email: '' })
  console.log(invoiceData)
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

  const onSubmit = () => {
    if (validateFields()) {
      console.log(infoData)
    }
  }
  return invoiceData.tickets.length > 0 ? (
    <Container>
      <div className='h-full flex flex-col mt-10 mb-12  '>
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
              <Label htmlFor='name'>Tên người đi</Label>
              <Input
                value={infoData.username}
                onChange={handleChange}
                type='text'
                id='username'
                placeholder='Nhập tên người đi*'
                required
              />
              {errors.username && <span className='text-red-500 text-sm'>{errors.username}</span>}
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='phoneNumber'>Số điện thoại</Label>
              <Input
                value={infoData.phoneNumber}
                onChange={handleChange}
                type='tel'
                id='phoneNumber'
                placeholder='Nhập số điện thoại*'
                required
              />
              {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber}</span>}
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='email'>Tên người đi</Label>
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
              <ShieldCheck className='w-1/6' /> Số điện thoại và email được sử dụng để gửi thông tin đơn hàng và liên hệ
              khi cần thiết.
            </div>
            <div className='font-bold'>Phương thức thanh toán</div>
            <RadioGroup defaultValue='option-one'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-16 space-x-3 w-full items-center rounded-md border px-3 py-2 text-xs'>
                  <RadioGroupItem value='option-one' id='option-one' />
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
  ) : (
    <Container>
      <div className='w-full flex justify-center items-center mb-8'>
        <div className='flex flex-col items-center'>
          <img src={OOPS} className='w-[450px] h-[450px]' />
          <div className='text-2xl font-medium'>Dường như bạn chưa chọn ghế</div>
          <p className='text-lg mt-4'>Vui lòng chọn vé trước khi muốn điền thông tin thanh toán</p>

          <Link to='/selectTicket' className='underline hover:text-primary font-medium text-xl mt-8'>
            Quay lại trang chọn vé
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default InfoPayment
