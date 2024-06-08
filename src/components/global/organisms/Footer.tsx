import { PhoneCall } from 'lucide-react'
import { Mail } from 'lucide-react'
import Container from '@/components/global/atoms/container'
import { Button } from '@/components/global/atoms/button'

function Footer() {
  return (
    <footer className='border-t-2 border-primary'>
      <Container>
        <div className='w-full h-full pt-5'>
          <div className='flex mt-6 gap-14'>
            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold text-primary '>Thông tin nền tảng</div>
              <p className='text-xs sm:text-base'>
                Nền tảng bán vé xe The Bus Journey là dịch vụ giúp người dùng dễ dàng tìm và đặt mua vé xe khách. Với tính
                năng tìm kiếm thông minh và thông tin chi tiết về chuyến đi, nền tảng cho phép thanh toán an toàn và
                nhiều lựa chọn, giúp tiết kiệm thời gian và đảm bảo chỗ ngồi.
              </p>
            </div>

            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold text-primary'>Thông tin liên hệ</div>
              <div className='flex flex-col'>
                <div className='text-xs sm:text-base'>
                  <strong>Địa chỉ:</strong> Trụ sở The Bus Journey 999 Hùng Vương, Phường 11, Quận Tân Phú, TP. Hồ Chí Minh
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Hotline:</strong> 0332333005
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Email:</strong> thebusjourney71@gmail.com
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Website:</strong> <a href='/'>https://the-bus-journey.vercel.app/</a>
                </div>
              </div>
            </div>

            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold text-primary'>Hỗ trợ khách hàng</div>
              <div className='flex mt-5 4'>
                <Button variant='ghost'>
                  <PhoneCall />
                </Button>
                <Button variant='ghost'>
                  <Mail />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className='flex justify-center items-center h-10 mt-10 bg-primary text-sm font-bold text-secondary'>
        © 2024 | Bản quyền thuộc về THE BUS JOURNEY.
      </div>
    </footer>
  )
}

export default Footer
