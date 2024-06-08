import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import ChooseSeatCode from '@/components/local/SelectTicket/ChooseSeatCode'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { useInvoice } from '@/contexts/InvoiceContext'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SelectTicket() {
  const { invoiceData } = useInvoice()
  const navigate = useNavigate()
  const handleGoToService = () => {
    navigate('/selectService')
  }
  return (
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
        <div className='flex justify-center items-center uppercase font-bold text-4xl mb-12 text-primary'>chọn mua vé</div>
        <div className='flex justify-evenly'>
          <div className='border w-7/12 rounded-xl shadow-md'>
            <ChooseSeatCode />
          </div>
          <div className='flex flex-col space-y-10 w-4/12'>
            <InvoiceDetail />
            <div className='flex justify-end'>
                <Button onClick={handleGoToService} className='bg-primary text-secondary hover:scale-110 transform scale-100 transition duration-200' disabled={invoiceData.tickets.length === 0}>
                  Tiếp tục
                  <ArrowRight className='ml-1 scale-75' />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SelectTicket
