import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import ChooseSeatCode from '@/components/local/ChooseSeatCode'
import InvoiceDetail from '@/components/local/InvoiceDetail'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SelectTicket() {
    const navigate = useNavigate()
  return (
    <Container>
      <div className='h-full flex flex-col my-5 space-y-8'>
        <div className='flex justify-start items-center'>
          <Button onClick={() => navigate(-1)} className='text-base bg-transparent hover:bg-transparent hover:underline hover:text-primary hover:font-bold'>
            <ArrowLeft className='scale-75' />
            Quay lại
          </Button>
        </div>
        <div className='flex justify-center uppercase font-bold text-4xl'>
            chọn mua vé
        </div>
        <div className='flex justify-evenly'>
            <div className='border w-7/12 rounded-xl shadow-md'>
                <ChooseSeatCode />
            </div>
            <div className='flex flex-col space-y-10 w-4/12'>
                <InvoiceDetail />
                <div className='flex justify-end'>
                  <Button className='bg-tertiary text-secondary hover:bg-tertiary hover:translate-x-2 hover:scale-105'>Tiếp tục chọn dịch vụ <ArrowRight className='ml-1 scale-75'/></Button>
                </div>
            </div>
        </div>
      </div>
    </Container>
  )
}

export default SelectTicket
