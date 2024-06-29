import { useEffect } from 'react'
import { useGetTripData } from '@/apis/ticketAPI'
import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import Loading from '@/components/global/molecules/Loading'
import ChooseSeatCode from '@/components/local/SelectTicket/ChooseSeatCode'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { useInvoice } from '@/contexts/InvoiceContext'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SelectTicket() {
  const { invoiceData, updateInvoiceData } = useInvoice()
  const { data, isLoading, isSuccess } = useGetTripData({ tripID: invoiceData.tripID })
  const navigate = useNavigate()

  useEffect(() => {
    if (data && isSuccess) {
      if (
        data.startLocation !== invoiceData.startLocation ||
        data.endLocation !== invoiceData.endLocation ||
        data.startDate !== invoiceData.startDate ||
        data.startTime !== invoiceData.startTime ||
        data.companyName !== invoiceData.companyName
      ) {
        updateInvoiceData(data.startLocation, data.endLocation, data.startTime, data.startDate, data.companyName)
      }
    }
  }, [data, isSuccess, updateInvoiceData])
  const handleGoToService = () => {
    navigate('/selectService')
  }

  // if (isLoading) return <Loading />

  return (
    <Container>
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
        <div className='flex justify-center items-center uppercase font-bold text-4xl mb-12 text-primary'>
          chọn mua vé
        </div>
        {isLoading ? (
          <div className='flex justify-center items-center w-full h-fit'>
            <Loading />
          </div>
        ) : (
          <div className='flex justify-evenly'>
            <div className='border w-7/12 rounded-xl shadow-md'>{data && <ChooseSeatCode data={data} />}</div>
            <div className='flex flex-col space-y-10 w-4/12'>
              <InvoiceDetail />
              <div className='flex justify-end'>
                <Button
                  onClick={handleGoToService}
                  className='bg-primary text-secondary hover:scale-110 transform scale-100 transition duration-200'
                  disabled={invoiceData.tickets.length === 0}
                >
                  Tiếp tục
                  <ArrowRight className='ml-1 scale-75' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default SelectTicket
