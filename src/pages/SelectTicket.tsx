import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import ChooseSeatCode from '@/components/local/SelectTicket/ChooseSeatCode'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function SelectTicket() {
  const navigate = useNavigate()
  return (
    <Container>
      <div className='h-full flex flex-col my-5 space-y-8 mb-16'>
        <div className='flex justify-start items-center'>
          <Button
            onClick={() => navigate(-1)}
            className='text-black bg-transparent hover:bg-transparent hover:underline hover:text-primary hover:font-bold'
          >
            <ArrowLeft className='scale-75' />
            Quay lại
          </Button>
        </div>
        <div className='flex justify-center uppercase font-bold text-4xl'>chọn mua vé</div>
        <div className='flex justify-evenly'>
          <div className='border w-7/12 rounded-xl shadow-md'>
            <ChooseSeatCode />
          </div>
          <div className='flex flex-col space-y-10 w-4/12'>
            <InvoiceDetail />
            <div className='flex justify-end'>
              <Link to='/selectService'>
                <Button className='bg-primary text-secondary hover:translate-x-2 hover:scale-105'>
                  Tiếp tục
                  <ArrowRight className='ml-1 scale-75' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SelectTicket
