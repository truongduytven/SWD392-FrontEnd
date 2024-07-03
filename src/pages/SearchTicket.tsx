import { useSearchTicket } from '@/apis/searchTicketAPI'
import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { Input } from '@/components/global/atoms/input'
import Ticket from '@/components/global/organisms/Ticket'
import Loading from '@/components/local/login/Loading'
import { searchTicket } from '@/lib/schemas/searchTicket'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, TriangleAlert, UserRoundSearch } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
function SearchTicket() {
  const searchTicketForm = useForm<z.infer<typeof searchTicket>>({
    resolver: zodResolver(searchTicket),
    defaultValues: {
      email: '',
      qrCode: ''
    }
  })
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [randomValue, setRandomValue] = useState<number | null>(null)
  const [data, setData] = useState<any>(null)
  const { isLoading, isError, refetch } = useSearchTicket(searchTicketForm.getValues())

  // function onSubmitLogin(values: z.infer<typeof searchTicket>) {
  //   refetch()
  //   console.log(values)
  // }
  function onSubmit(values: z.infer<typeof searchTicket>) {
    refetch().then((result) => {
      if (!result.error) {
        setData(result.data)
        setShowModal(true)
      }
    })
    console.log(values)
  }

  console.log('data', data)

  return (
    <Container>
      <div className='my-10 hover:font-bold hover:underline hover:text-primary'>
        <Link to='/' className='flex space-x-2'>
          <ArrowLeft className='scale-75' />
          Về trang chủ
        </Link>
      </div>
      <div className='relative flex gap-8 justify-start flex-col items-center h-fit w-full my-16'>
        <h1 className='font-bold text-3xl'>Tra cứu thông tin vé</h1>
        <Form {...searchTicketForm}>
          <form
            onSubmit={searchTicketForm.handleSubmit(onSubmit)}
            className='flex w-1/2 items-center justify-center gap-5 flex-col text-center'
          >
            <FormField
              control={searchTicketForm.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-2/3 flex flex-col justify-center items-start'>
                  <FormLabel>Email</FormLabel>
                  <FormControl className=''>
                    <Input placeholder='Nhập email của bạn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={searchTicketForm.control}
              name='qrCode'
              render={({ field }) => (
                <FormItem className='w-2/3 flex flex-col justify-center '>
                  <FormLabel className='text-left'>Mã Code</FormLabel>
                  <FormControl className=''>
                    <Input placeholder='Nhập mã code của bạn' {...field} />
                  </FormControl>
                  <FormMessage className='text-left' />
                </FormItem>
              )}
            />
            {isError && (
              <div className='flex flex-col justify-center items-center gap-4'>
                Đã xảy ra lỗi trong quá trình tra cứu
              </div>
            )}

            <Button type='submit' disabled={isLoading}>
              {isLoading && <Loading />}
              <UserRoundSearch className='w-5 mr-2' />
              Tra cứu
            </Button>
          </form>
        </Form>
        {showModal && (
          <div>
            <div className='fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'></div>
            <div className='fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
              {data.Price ? (
                <Ticket
                  Price={data.Price}
                  Trip={data.Trip}
                  TotalBill={data.TotalBill}
                  QrCode={data.QrCode}
                  QrCodeImage={data.QrCodeImage}
                />
              ) : (
                <div className='flex flex-col justify-center items-center gap-4'>
                  <h1 className='text-lg font-bold'>Tra cứu thất bại</h1>
                  <p className='flex'>
                    <TriangleAlert className='text-red-600 mr-1' />
                    Vé của bạn không được tìm thấy trên hệ thống, vui lòng kiểm tra lại{' '}
                    <span className='font-semibold text-red-600 mx-1'> số điện thoại </span> và
                    <span className='font-semibold text-red-600 mx-1'> mã số vé </span>
                  </p>
                </div>
              )}
              <div className='flex justify-center mt-4'>
                <Button className='w-fit' onClick={() => setShowModal(false)}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* {showModal && (
          <div>
            <div className='fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'></div>
            <div className='fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
              {randomValue !== null && randomValue > 0.5 ? (
                <Ticket />
              ) : (
                <div className='flex flex-col justify-center items-center gap-4'>
                  <h1 className='text-lg font-bold'>Tra cứu thất bại</h1>
                  <p className='flex'>
                    <TriangleAlert className='text-red-600 mr-1' />
                    Vé của bạn không được tìm thấy trên hệ thống, vui lòng kiểm tra lại{' '}
                    <span className='font-semibold text-red-600 mx-1'> số điện thoại </span> và
                    <span className='font-semibold text-red-600 mx-1'> mã số vé </span>
                  </p>
                </div>
              )}
              <div className='flex justify-center mt-4'>
                <Button className='w-fit' onClick={() => setShowModal(false)}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        )} */}
        {/* {data?.price ? (
          <div>
            <h2 className='text-xl font-bold'>Thông tin vé</h2>
            <p>Giá: {data.price.price}</p>
            <p>Trạm:</p>
            <ul>
              {data.price.services.map((service) => (
                <li key={service.serviceName}>
                  {service.serviceName}: {service.price}
                </li>
              ))}
            </ul>
            <p>Người dùng: {data.trip.userName}</p>
            <p>Tuyến đường: {data.trip.route}</p>
            <p>Công ty: {data.trip.company}</p>
            <p>Ngày: {data.trip.date}</p>
            <p>Thời gian: {data.trip.time}</p>
            <p>Vị trí: {data.trip.position}</p>
            <p>Tổng hóa đơn: {data.totalBill}</p>
            <img src={data.qrCodeImage} alt='QR Code' />
            <p>Mã Code: {data.qrCode}</p>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-lg font-bold'>Tra cứu thất bại</h1>
            <p className='flex'>
              <TriangleAlert className='text-red-600 mr-1' />
              Vé của bạn không được tìm thấy trên hệ thống, vui lòng kiểm tra lại{' '}
              <span className='font-semibold text-red-600 mx-1'> số điện thoại </span> và
              <span className='font-semibold text-red-600 mx-1'> mã số vé </span>
            </p>
          </div>
        )} */}
      </div>
    </Container>
  )
}

export default SearchTicket
